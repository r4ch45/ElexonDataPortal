# AUTOGENERATED! DO NOT EDIT! File to edit: nbs/01-utils.ipynb (unless otherwise specified).

__all__ = ['RequestError', 'check_status', 'check_capping', 'expand_cols', 'parse_xml_response', 'dt_rng_to_SPs',
           'parse_local_datetime', 'update_version', 'add_init', 'update_version', 'prepare_nbdev_module',
           'notebook2script', 'add_mod_extra_indices', 'add_mod_extra_modules', 'add_extra_code_desc_to_mod']

# Cell
import pandas as pd
import yaml
import xmltodict
from collections import OrderedDict
from warnings import warn
from fastcore.foundation import Config, Path
from nbdev import export
import re
import os

# Cell
class RequestError(Exception):
    def __init__(self, http_code, error_type, description):
        self.message = f'{http_code} - {error_type}\n{description}'

    def __str__(self):
        return self.message

# Cell
def check_status(r):
    r_metadata = xmltodict.parse(r.text)['response']['responseMetadata']

    if r_metadata['httpCode'] == '204':
        warn(f'Data request was succesful but no content was returned')
        return pd.DataFrame()

    elif r_metadata['httpCode'] != '200':
        raise RequestError(r_metadata['httpCode'], r_metadata['errorType'], r_metadata['description'])

    return None

def check_capping(r):
    r_metadata = xmltodict.parse(r.text)['response']['responseMetadata']

    if 'cappingApplied' in r_metadata.keys():
        if r_metadata['cappingApplied'] == 'Yes':
            capping_applied = True
        else:
            capping_applied = False
    else:
        capping_applied = 'Could not be determined'

    return capping_applied

# Cell
def expand_cols(df, cols_2_expand=[]):
    if df.size == 0:
        return df

    for col in cols_2_expand:
        new_df_cols = df[col].apply(pd.Series)

        df[new_df_cols.columns] = new_df_cols
        df = df.drop(columns=col)

    s_cols_2_expand = df.iloc[0].apply(type).isin([OrderedDict, dict, list, tuple])

    if s_cols_2_expand.sum() > 0:
        cols_2_expand = s_cols_2_expand[s_cols_2_expand].index
        df = expand_cols(df, cols_2_expand)

    return df

def parse_xml_response(r):
    r_dict = xmltodict.parse(r.text)

    status_check_response = check_status(r)
    if status_check_response is not None:
        return status_check_response

    capping_applied = check_capping(r)

    data_content = r_dict['response']['responseBody']['responseList']['item']

    if isinstance(data_content, list):
        df = expand_cols(pd.DataFrame(data_content))
    elif isinstance(data_content, OrderedDict):
        df = pd.DataFrame(pd.Series(data_content)).T
    else:
        raise ValueError('The returned `data_content` must be one of: `list` or `OrderedDict`')

    return df

# Cell
def dt_rng_to_SPs(
    start_date: pd.Timestamp,
    end_date: pd.Timestamp,
    freq: str='30T',
    tz: str='Europe/London'
):
    dt_rng = pd.date_range(start_date, end_date, freq=freq, tz=tz)

    SPs = (2*(dt_rng.hour + dt_rng.minute/60) + 1).astype(int)
    dt_strs = dt_rng.strftime('%Y-%m-%d')

    df_dates_SPs = pd.DataFrame({'date':dt_strs, 'SP':SPs}, index=dt_rng)

    return df_dates_SPs

def parse_local_datetime(
    df: pd.DataFrame,
    dt_col: str='settlementDate',
    SP_col: str='settlementPeriod',
    freq: str='30T',
    tz: str='Europe/London'
) -> pd.DataFrame:
    start_date = pd.to_datetime(df[dt_col].min()) - pd.Timedelta(days=2)
    end_date = pd.to_datetime(df[dt_col].max()) + pd.Timedelta(days=2)

    df_dates_SPs = dt_rng_to_SPs(start_date, end_date, freq=freq, tz=tz)
    date_SP_to_ts = {v: k for k, v in df_dates_SPs.apply(tuple, axis=1).to_dict().items()}

    df['local_datetime'] = df[[dt_col, SP_col]].apply(tuple, axis=1).map(date_SP_to_ts)

    return df

# Cell
from fastcore.foundation import Config
import nbdev
import re

_re_version = re.compile('^__version__\s*=.*$', re.MULTILINE)

def update_version():
    "Add or update `__version__` in the main `__init__.py` of the library"
    fname = Config().path("lib_path")/'__init__.py'
    if not fname.exists(): fname.touch()
    version = f'__version__ = "{Config().version}"'
    with open(fname, 'r') as f: code = f.read()
    if _re_version.search(code) is None: code = version + "\n" + code
    else: code = _re_version.sub(version, code)
    with open(fname, 'w') as f: f.write(code)

# Cell
def add_init(path, contents=''):
    "Add `__init__.py` in all subdirs of `path` containing python files if it's not there already"
    for p,d,f in os.walk(path):
        for f_ in f:
            if f_.endswith('.py'):
                if not (Path(p)/'__init__.py').exists(): (Path(p)/'__init__.py').write_text('\n'+contents)
                break

def update_version(init_dir=None, extra_init_contents=''):
    "Add or update `__version__` in the main `__init__.py` of the library"
    version = Config().version
    version_str = f'__version__ = "{version}"'

    if init_dir is None: path = Config().path("lib_path")
    else: path = Path(init_dir)
    fname = path/'__init__.py'

    if not fname.exists(): add_init(path, contents=extra_init_contents)

    code = f'{version_str}\n{extra_init_contents}'
    with open(fname, 'w') as f: f.write(code)

export.add_init = add_init
export.update_version = update_version

# Cell
def prepare_nbdev_module(extra_init_contents=''):
    export.reset_nbdev_module()
    export.update_version(extra_init_contents=extra_init_contents)
    export.update_baseurl()

# Cell
def notebook2script(fname=None, silent=False, to_dict=False, bare=False, extra_init_contents=''):
    "Convert notebooks matching `fname` to modules"
    # initial checks
    if os.environ.get('IN_TEST',0): return  # don't export if running tests
    if fname is None: prepare_nbdev_module(extra_init_contents=extra_init_contents)

    files = export.nbglob(fname=fname)
    d = collections.defaultdict(list) if to_dict else None
    modules = export.create_mod_files(files, to_dict, bare=bare)

    for f in sorted(files): d = export._notebook2script(f, modules, silent=silent, to_dict=d, bare=bare)
    if to_dict: return d
    else: add_init(Config().path("lib_path"))

    return

# Cell
def add_mod_extra_indices(mod, extra_modules_to_source):
    for extra_module, module_source in extra_modules_to_source.items():
        extra_module_fp = export.Config().path("lib_path")/extra_module

        with open(extra_module_fp, 'r') as text_file:
             extra_module_code = text_file.read()

        names = export.export_names(extra_module_code)
        mod.index.update({name: module_source for name in names})

    return mod

def add_mod_extra_modules(mod, extra_modules):
    extra_modules = [e for e in extra_modules if e not in mod.modules]
    mod.modules = sorted(mod.modules + extra_modules)

    return mod

def add_extra_code_desc_to_mod(
    extra_modules_to_source = {
        'api.py': '06-client-gen.ipynb',
        'dev/raw.py': '03-raw-methods.ipynb'
    }
):
    mod = export.get_nbdev_module()

    mod = add_mod_extra_indices(mod, extra_modules_to_source)
    mod = add_mod_extra_modules(mod, extra_modules_to_source.keys())

    export.save_nbdev_module(mod)

    return