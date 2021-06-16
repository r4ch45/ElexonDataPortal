# AUTOGENERATED! DO NOT EDIT! File to edit: nbs/09-map-gen.ipynb (unless otherwise specified).

__all__ = ['construct_df_PN_pivot_dt_rng', 'construct_PN_pivot_df', 'get_latest_PN_df', 'construct_osuked_id_mappings',
           'construct_map_df', 'df_to_gdf', 'generate_map_js', 'generate_map_md', 'app', 'generate_map']

# Cell
import json
import numpy as np
import pandas as pd
import geopandas as gpd

import os
import typer
from tqdm import tqdm
from jinja2 import Template

from . import utils, raw

# Cell
def construct_df_PN_pivot_dt_rng(df_PN):
    no_seconds = (((df_PN['timeFrom'].str.split(':').str[-1]=='00').mean()==1) &
                  ((df_PN['timeTo'].str.split(':').str[-1]=='00').mean()==1))

    if no_seconds == True:
        dt_rng = pd.date_range(df_PN['timeFrom'].min(), df_PN['timeTo'].max(), freq='min')
    else:
        dt_rng = pd.date_range(df_PN['timeFrom'].min(), df_PN['timeTo'].max(), freq='s')

    return dt_rng

def construct_PN_pivot_df(df_PN):
    bmu_ids = sorted(list(df_PN['bmUnitID'].unique()))
    df_PN_pivot = pd.DataFrame(index=construct_df_PN_pivot_dt_rng(df_PN), columns=bmu_ids, dtype=float)

    for bmu_id in tqdm(bmu_ids):
        for idx, row in df_PN.query('bmUnitID==@bmu_id').iterrows():
            df_PN_pivot.loc[pd.to_datetime(row['timeFrom']), bmu_id] = float(row['pnLevelFrom'])
            df_PN_pivot.loc[pd.to_datetime(row['timeTo']), bmu_id] = float(row['pnLevelTo'])

        df_PN_pivot[bmu_id] = df_PN_pivot[bmu_id].interpolate()

    return df_PN_pivot

def get_latest_PN_df(api_key):
    start_date = pd.Timestamp.now().round('30min') - pd.Timedelta(hours=1)
    end_date = pd.Timestamp.now().round('30min') + pd.Timedelta(hours=1)

    df = pd.DataFrame()

    for idx, (date, SP) in tqdm(utils.dt_rng_to_SPs(start_date, end_date).iterrows()):
        df_SP = utils.parse_xml_response(raw.get_PHYBMDATA(api_key, SettlementDate=date, SettlementPeriod=SP, ServiceType='xml'))
        df = df.append(df_SP)

    df = (df
          .query('recordType=="PN"')
          .dropna(how='all', axis=1)
          .pipe(construct_PN_pivot_df)
         )

    return df

# Cell
def construct_osuked_id_mappings(df_powerdict):
    osuked_id_mappings = dict()

    osuked_id_mappings['bmu_ids'] = (df_powerdict
                                     .set_index('osuked_id')
                                     ['sett_bmu_id']
                                     .str.split(', ')
                                     .dropna()
                                     .to_dict()
                                    )

    osuked_id_mappings['fuel_type'] = (df_powerdict
                                       .set_index('osuked_id')
                                       ['fuel_type']
                                       .dropna()
                                       .to_dict()
                                      )

    osuked_id_mappings['name'] = (df_powerdict
                                  .set_index('osuked_id')
                                  ['name']
                                  .dropna()
                                  .to_dict()
                                 )

    osuked_id_mappings['lat_lon'] = (df_powerdict
                                     .set_index('osuked_id')
                                     [['latitude', 'longitude']]
                                     .dropna()
                                     .apply(dict, axis=1)
                                     .to_dict()
                                    )

    return osuked_id_mappings

# Cell
def construct_map_df(
    s_PN,
    most_recent_available_dt,
    osuked_id_to_bmu_ids,
    osuked_id_to_lat_lon,
    osuked_id_to_fuel_type,
    osuked_id_to_name
):
    sites_data = list()

    for osuked_id, bmu_ids in osuked_id_to_bmu_ids.items():
        lat_lon_match = osuked_id in osuked_id_to_lat_lon.keys()

        matching_output_bmu_ids = s_PN.index.intersection(bmu_ids)
        output_match = matching_output_bmu_ids.size > 0

        if lat_lon_match and output_match:
            site_data = osuked_id_to_lat_lon[osuked_id]
            site_data.update({'osuked_id': osuked_id})
            site_data.update({'name': osuked_id_to_name[osuked_id]})
            site_data.update({'fuel_type': osuked_id_to_fuel_type[osuked_id]})
            site_data.update({'output': s_PN[matching_output_bmu_ids].sum()})
            site_data.update({'output_time': most_recent_available_dt.strftime('%Y-%m-%d %H:%M')})

            sites_data += [site_data]

    df_map = pd.DataFrame(sites_data).set_index('osuked_id').query('output>0')

    return df_map

# Cell
def df_to_gdf(df, lat_col='latitude', lon_col='longitude'):
    geometry = gpd.points_from_xy(df[lon_col], df[lat_col])
    gdf = gpd.GeoDataFrame(df, geometry=geometry)

    return gdf

# Cell
def generate_map_js(gdf, js_template_fp='templates/map.js', js_docs_fp='docs/js/map.js'):
    geojson = json.loads(gdf.to_json())

    rendered_map_js = Template(open(js_template_fp).read()).render(
        zoom=5,
        center=[53.96, -3.22],
        geojson_features=str(geojson).replace('None', 'null')
    )

    with open(js_docs_fp, 'w', encoding='utf8') as fp:
        fp.write(rendered_map_js)

    return

# Cell
def generate_map_md(most_recent_available_dt, md_template_fp='templates/map.md', md_docs_fp='docs/map.md'):
    update_date = pd.to_datetime(most_recent_available_dt).strftime('%Y-%m-%d %H:%M')
    rendered_map_md = Template(open(md_template_fp).read()).render({'update_date': update_date})

    with open(md_docs_fp, 'w', encoding='utf8') as fp:
        fp.write(rendered_map_md)

    return

# Cell
app = typer.Typer()

# Cell
@app.command()
def generate_map(
    api_key: str=None,
    powerdict_url: str='https://raw.githubusercontent.com/OSUKED/Power-Station-Dictionary/main/data/output/power_stations.csv',
    js_template_fp: str='templates/map.js',
    js_docs_fp: str='docs/js/map.js',
    md_template_fp: str='templates/map.md',
    md_docs_fp: str='docs/map.md'
):
    if api_key is None:
        assert 'BMRS_API_KEY' in os.environ.keys(), 'If the `api_key` is not specified during client initialisation then it must be set to as the environment variable `BMRS_API_KEY`'
        api_key = os.environ['BMRS_API_KEY']

    df_PN = get_latest_PN_df(api_key)

    nearest_half_hour = (pd.Timestamp.now().tz_localize('Europe/London')+pd.Timedelta(minutes=30)).round('30min')
    most_recent_available_dt = max(df_PN.index[pd.to_datetime(df_PN.index).tz_localize('Europe/London')<=nearest_half_hour])
    s_PN = df_PN.loc[most_recent_available_dt]

    df_powerdict = pd.read_csv(powerdict_url)

    osuked_id_mappings = construct_osuked_id_mappings(df_powerdict)
    osuked_id_to_bmu_ids, osuked_id_to_fuel_type, osuked_id_to_name, osuked_id_to_lat_lon = osuked_id_mappings.values()

    df_map = construct_map_df(s_PN, most_recent_available_dt, osuked_id_to_bmu_ids, osuked_id_to_lat_lon, osuked_id_to_fuel_type, osuked_id_to_name)
    gdf_map = df_to_gdf(df_map)

    generate_map_js(gdf_map, js_template_fp=js_template_fp, js_docs_fp=js_docs_fp)
    generate_map_md(most_recent_available_dt, md_template_fp=md_template_fp, md_docs_fp=md_docs_fp)

    return

# Cell
if __name__ == '__main__' and '__file__' in globals():
    app()