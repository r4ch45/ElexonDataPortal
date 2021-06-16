function getColor(d) {
    return d === 'wind' ? "#14A7E5" :
           d === 'solar' ? "#F8C52A" :
           d === 'gas' ? "#C23596" :
           d === 'other' ? "#1C0B2A" :
           d === 'hydro' ? "#3069B1" :
           d === 'oil' ? "#1C0B2A" :
           d === 'coal' ? "#B2B2B2" :
           d === 'nuclear' ? "#4CAE37" :
           d === 'biomass' ? "#FE9B32" :
           d === 'gas, oil' ? "#C23596" :
           d === 'coal, biomass' ? "#FE9B32" :
                        "#1C0B2A";
}

function capitalise(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

document.addEventListener("DOMContentLoaded", function() {
    var mymap = L.map('map').setView([53.96, -3.22], 5);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZW5lcmd5dmlzIiwiYSI6ImNrbjR2aWo4azBsaHEycHM5dHByZzFnZW8ifQ.MyLCIQqHnNHQFWJQqs-j4w'
    }).addTo(mymap);

    var geojsonFeature = {'type': 'FeatureCollection', 'features': [{'id': '10000', 'type': 'Feature', 'properties': {'fuel_type': 'biomass', 'latitude': 57.480403, 'longitude': -3.603516, 'name': 'Rothes Bio-Plant CHP', 'output': 55.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.603516, 57.480403]}}, {'id': '10004', 'type': 'Feature', 'properties': {'fuel_type': 'coal, biomass', 'latitude': 53.748711, 'longitude': -0.626221, 'name': 'Drax', 'output': 1950.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-0.626221, 53.748711]}}, {'id': '10010', 'type': 'Feature', 'properties': {'fuel_type': 'coal', 'latitude': 55.20417, 'longitude': -1.52083, 'name': 'Lynemouth Generator', 'output': 405.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-1.52083, 55.20417]}}, {'id': '10027', 'type': 'Feature', 'properties': {'fuel_type': 'gas', 'latitude': 53.455349, 'longitude': -2.504883, 'name': 'Carrington', 'output': 837.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-2.504883, 53.455349]}}, {'id': '10029', 'type': 'Feature', 'properties': {'fuel_type': 'gas', 'latitude': 53.231871, 'longitude': -3.080651, 'name': 'Connahs Quay', 'output': 663.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.080651, 53.231871]}}, {'id': '10035', 'type': 'Feature', 'properties': {'fuel_type': 'gas', 'latitude': 51.62363, 'longitude': -1.26757, 'name': 'Didcot B', 'output': 222.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-1.26757, 51.62363]}}, {'id': '10036', 'type': 'Feature', 'properties': {'fuel_type': 'gas', 'latitude': 51.662337, 'longitude': -0.022763, 'name': 'Enfield Energy', 'output': 400.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-0.022763, 51.662337]}}, {'id': '10038', 'type': 'Feature', 'properties': {'fuel_type': 'gas', 'latitude': 52.596375, 'longitude': 1.625977, 'name': 'Great Yarmouth', 'output': 220.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [1.625977, 52.596375]}}, {'id': '10043', 'type': 'Feature', 'properties': {'fuel_type': 'gas', 'latitude': 50.492463, 'longitude': -3.966064, 'name': 'Langage', 'output': 810.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.966064, 50.492463]}}, {'id': '10045', 'type': 'Feature', 'properties': {'fuel_type': 'gas', 'latitude': 50.903033, 'longitude': -1.351318, 'name': 'Marchwood', 'output': 827.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-1.351318, 50.903033]}}, {'id': '10047', 'type': 'Feature', 'properties': {'fuel_type': 'gas', 'latitude': 51.684368, 'longitude': -4.996378, 'name': 'Pembroke Power Station -', 'output': 1486.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.996378, 51.684368]}}, {'id': '10052', 'type': 'Feature', 'properties': {'fuel_type': 'gas', 'latitude': 53.83308100000001, 'longitude': -0.1318359999999999, 'name': 'Saltend South', 'output': 710.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-0.1318359999999999, 53.83308100000001]}}, {'id': '10056', 'type': 'Feature', 'properties': {'fuel_type': 'gas', 'latitude': 53.618579, 'longitude': -0.1318359999999999, 'name': 'South Humber Bank', 'output': 748.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-0.1318359999999999, 53.618579]}}, {'id': '10057', 'type': 'Feature', 'properties': {'fuel_type': 'gas', 'latitude': 52.81604300000001, 'longitude': -0.252686, 'name': 'Spalding', 'output': 170.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-0.252686, 52.81604300000001]}}, {'id': '10058', 'type': 'Feature', 'properties': {'fuel_type': 'gas', 'latitude': 53.041213, 'longitude': -0.98877, 'name': 'Staythorpe', 'output': 195.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-0.98877, 53.041213]}}, {'id': '10067', 'type': 'Feature', 'properties': {'fuel_type': 'gas, oil', 'latitude': 51.474540000000005, 'longitude': 0.703125, 'name': 'Grain CHP', 'output': 410.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [0.703125, 51.474540000000005]}}, {'id': '10068', 'type': 'Feature', 'properties': {'fuel_type': 'gas', 'latitude': 55.930741000000005, 'longitude': -3.032227, 'name': 'Grangemouth CHP Ltd', 'output': 140.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.032227, 55.930741000000005]}}, {'id': '10070', 'type': 'Feature', 'properties': {'fuel_type': 'gas', 'latitude': 53.690201, 'longitude': 0.0, 'name': 'Immingham CHP', 'output': 463.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [0.0, 53.690201]}}, {'id': '10101', 'type': 'Feature', 'properties': {'fuel_type': 'oil', 'latitude': 57.527622, 'longitude': -1.867676, 'name': 'Peterhead', 'output': 1015.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-1.867676, 57.527622]}}, {'id': '10107', 'type': 'Feature', 'properties': {'fuel_type': 'hydro', 'latitude': 57.444705000000006, 'longitude': -4.552586, 'name': 'Beauly Cascade', 'output': 12.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.552586, 57.444705000000006]}}, {'id': '10109', 'type': 'Feature', 'properties': {'fuel_type': 'hydro', 'latitude': 56.716948, 'longitude': -3.778355, 'name': 'Clunie Cascade', 'output': 2.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.778355, 56.716948]}}, {'id': '10110', 'type': 'Feature', 'properties': {'fuel_type': 'hydro', 'latitude': 57.619203000000006, 'longitude': -4.830066, 'name': 'Conon Cascade', 'output': 1.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.830066, 57.619203000000006]}}, {'id': '10116', 'type': 'Feature', 'properties': {'fuel_type': 'hydro', 'latitude': 57.325887, 'longitude': -4.793703, 'name': 'Fasnakyle G', 'output': 7.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.793703, 57.325887]}}, {'id': '10122', 'type': 'Feature', 'properties': {'fuel_type': 'hydro', 'latitude': 57.144936, 'longitude': -4.962463, 'name': 'Moriston Cascade', 'output': 3.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.962463, 57.144936]}}, {'id': '10130', 'type': 'Feature', 'properties': {'fuel_type': 'nuclear', 'latitude': 54.686534, 'longitude': -1.098633, 'name': 'Hartlepool', 'output': 1155.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-1.098633, 54.686534]}}, {'id': '10131', 'type': 'Feature', 'properties': {'fuel_type': 'nuclear', 'latitude': 54.02888889, 'longitude': -2.916111111, 'name': 'Heysham 1', 'output': 983.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-2.916111111, 54.02888889]}}, {'id': '10132', 'type': 'Feature', 'properties': {'fuel_type': 'nuclear', 'latitude': 54.02888889, 'longitude': -2.916111111, 'name': 'Heysham 2', 'output': 633.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-2.916111111, 54.02888889]}}, {'id': '10133', 'type': 'Feature', 'properties': {'fuel_type': 'nuclear', 'latitude': 51.138001, 'longitude': -3.317871, 'name': 'Hinkley Point B', 'output': 979.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.317871, 51.138001]}}, {'id': '10134', 'type': 'Feature', 'properties': {'fuel_type': 'nuclear', 'latitude': 55.646599, 'longitude': -4.822998, 'name': 'Hunterston Generator', 'output': 995.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.822998, 55.646599]}}, {'id': '10138', 'type': 'Feature', 'properties': {'fuel_type': 'nuclear', 'latitude': 55.813629000000006, 'longitude': -2.054443, 'name': 'Torness Generator', 'output': 1275.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-2.054443, 55.813629000000006]}}, {'id': '10148', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.923317, 'longitude': -2.492993, 'name': 'Aikengall 2 Wind Farm Generation', 'output': 4.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-2.492993, 55.923317]}}, {'id': '10149', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 54.970896, 'longitude': -4.713441, 'name': 'Airies Windfarm', 'output': 9.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.713441, 54.970896]}}, {'id': '10150', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.51487, 'longitude': -3.814161, 'name': 'Andershaw Wind Farm', 'output': 8.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.814161, 55.51487]}}, {'id': '10151', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 56.065903000000006, 'longitude': -5.449219, 'name': 'An Suidhe Windfarm', 'output': 5.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-5.449219, 56.065903000000006]}}, {'id': '10152', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.14121, 'longitude': -4.63623, 'name': 'Arecleoch Windfarm', 'output': 10.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.63623, 55.14121]}}, {'id': '10153', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.222814, 'longitude': -4.825652, 'name': 'Assel Valley Wind Farm', 'output': 10.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.825652, 55.222814]}}, {'id': '10154', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.621764, 'longitude': -3.988675, 'name': 'Auchrobert Wind Farm', 'output': 8.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.988675, 55.621764]}}, {'id': '10155', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 58.430482, 'longitude': -4.372559, 'name': 'Baillie Wind Farm', 'output': 7.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.372559, 58.430482]}}, {'id': '10158', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 57.17555556, 'longitude': -4.789059, 'name': 'Beinneun Wind Farm', 'output': 15.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.789059, 57.17555556]}}, {'id': '10159', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 58.077876, 'longitude': -4.42749, 'name': 'Beinn Tharsuinn', 'output': 5.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.42749, 58.077876]}}, {'id': '10160', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 57.36209, 'longitude': -3.966064, 'name': 'Berry Burn Windfarm', 'output': 6.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.966064, 57.36209]}}, {'id': '10161', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 57.22303, 'longitude': -4.668919, 'name': 'Bhlaraidh Windfarm 1', 'output': 14.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.668919, 57.22303]}}, {'id': '10162', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.117955, 'longitude': -4.033976, 'name': 'Blackcraig Windfarm', 'output': 6.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.033976, 55.117955]}}, {'id': '10163', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.590763, 'longitude': -3.4826660000000005, 'name': 'Black Law Wind Farm', 'output': 4.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.4826660000000005, 55.590763]}}, {'id': '10164', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.590763, 'longitude': -3.4826660000000005, 'name': 'Black Law Windfarm Extension', 'output': 1.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.4826660000000005, 55.590763]}}, {'id': '10167', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.25515600000001, 'longitude': -4.141234, 'name': 'Brockloch Rig 2 Windfarm', 'output': 23.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.141234, 55.25515600000001]}}, {'id': '10169', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 53.487739000000005, 'longitude': -3.19582, 'name': 'Burbo Bank Offshore Windfarm', 'output': 1.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.19582, 53.487739000000005]}}, {'id': '10170', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 53.484, 'longitude': -3.273, 'name': 'Burbo Bank Wind Farm Extension', 'output': 4.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.273, 53.484]}}, {'id': '10171', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 58.351973, 'longitude': -3.21433, 'name': 'Burn of Whilk Windfarm', 'output': 4.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.21433, 58.351973]}}, {'id': '10172', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 57.504968000000005, 'longitude': -3.063895, 'name': 'Cairn Uish / Rothes Windfarm Extension', 'output': 14.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.063895, 57.504968000000005]}}, {'id': '10173', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 58.406935, 'longitude': -3.2701290000000003, 'name': 'Camster Wind Farm', 'output': 12.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.2701290000000003, 58.406935]}}, {'id': '10177', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.310391, 'longitude': -3.35083, 'name': 'Clyde Central Windfarm, Clyde North Windfarm, Clyde South Windfarm', 'output': 27.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.35083, 55.310391]}}, {'id': '10178', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 57.190085, 'longitude': -4.359638, 'name': 'Corriegarth Wind Farm', 'output': 13.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.359638, 57.190085]}}, {'id': '10180', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.680679000000005, 'longitude': -5.484929, 'name': 'Cour Wind Farm', 'output': 1.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-5.484929, 55.680679000000005]}}, {'id': '10182', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.893796, 'longitude': -2.39502, 'name': 'Crystal Rig Wind Farm - Phase 2', 'output': 2.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-2.39502, 55.893796]}}, {'id': '10183', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.183662, 'longitude': -3.662819, 'name': 'Dalswinton Wind Farm', 'output': 1.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.662819, 55.183662]}}, {'id': '10184', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.311291, 'longitude': -4.484173, 'name': 'Dersalloch Windfarm', 'output': 3.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.484173, 55.311291]}}, {'id': '10185', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 53.249, 'longitude': 1.39, 'name': 'Dudgeon Offshore Wind Farm Generator', 'output': 26.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [1.39, 53.249]}}, {'id': '10187', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 57.25148000000001, 'longitude': -4.255802, 'name': 'Dunmglass Wind Farm', 'output': 21.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.255802, 57.25148000000001]}}, {'id': '10188', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 57.27904300000001, 'longitude': -6.229248, 'name': 'Edinbane Windfarm', 'output': 9.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-6.229248, 57.27904300000001]}}, {'id': '10190', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.93689499999999, 'longitude': -2.768555, 'name': 'Fallago Rig Wind Farm', 'output': 13.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-2.768555, 55.93689499999999]}}, {'id': '10191', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 57.325, 'longitude': -4.094167, 'name': 'Farr Wind Farm', 'output': 24.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.094167, 57.325]}}, {'id': '10192', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.780803000000006, 'longitude': -5.479858999999999, 'name': 'Freasdail Wind Farm', 'output': 1.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-5.479858999999999, 55.780803000000006]}}, {'id': '10193', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.534273, 'longitude': -3.921928, 'name': 'Galawhistle Wind Farm', 'output': 13.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.921928, 55.534273]}}, {'id': '10194', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 51.893, 'longitude': 2.035, 'name': 'Galloper Offshore Windfarm 1', 'output': 105.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [2.035, 51.893]}}, {'id': '10196', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 54.96341999999999, 'longitude': -4.754334, 'name': 'Glenchamber Wind Farm', 'output': 1.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.754334, 54.96341999999999]}}, {'id': '10198', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 53.668356, 'longitude': -0.8724209999999999, 'name': 'Goole Fields 1 Windfarm', 'output': 2.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-0.8724209999999999, 53.668356]}}, {'id': '10201', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 52.066, 'longitude': 1.7138669999999998, 'name': 'Greater Gabbard Offshore Windfarm', 'output': 28.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [1.7138669999999998, 52.066]}}, {'id': '10202', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 56.529199, 'longitude': -3.394775, 'name': 'Griffin Wind Farm', 'output': 2.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.394775, 56.529199]}}, {'id': '10204', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 51.739444, 'longitude': 1.174444, 'name': 'Gunfleet Sands Windfarm  1', 'output': 6.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [1.174444, 51.739444]}}, {'id': '10205', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 51.739444, 'longitude': 1.174444, 'name': 'Gunfleet Sands Windfarm  2', 'output': 4.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [1.174444, 51.739444]}}, {'id': '10207', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 53.376775, 'longitude': -3.944092, 'name': 'Gwynt y Mor Wind Farm East 1', 'output': 10.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.944092, 53.376775]}}, {'id': '10208', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.247815, 'longitude': -4.702148, 'name': 'Hadyard Hill Wind Farm', 'output': 12.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.702148, 55.247815]}}, {'id': '10209', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.815259, 'longitude': -3.547456, 'name': 'Harburnhead Wind Farm', 'output': 5.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.547456, 55.815259]}}, {'id': '10210', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.405691, 'longitude': -4.054104, 'name': 'Hare Hill Extension Wind Farm', 'output': 2.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.054104, 55.405691]}}, {'id': '10212', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 57.51051999999999, 'longitude': -3.615587, 'name': 'Hill of Glaschyle Windfarm', 'output': 4.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.615587, 57.51051999999999]}}, {'id': '10213', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 57.486309, 'longitude': -2.406006, 'name': 'Hill of Towie Windfarm ', 'output': 1.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-2.406006, 57.486309]}}, {'id': '10214', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 53.644, 'longitude': 0.293, 'name': 'Humber Offshore Wind Farm', 'output': 3.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [0.293, 53.644]}}, {'id': '10215', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 57.483, 'longitude': -1.35, 'name': 'Hywind Generator 1', 'output': 16.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-1.35, 57.483]}}, {'id': '10218', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.05, 'longitude': -4.765280000000001, 'name': 'Kilgallioch Wind Farm', 'output': 8.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.765280000000001, 55.05]}}, {'id': '10219', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 53.265213, 'longitude': 0.5273439999999999, 'name': 'Lincs Offshore Wind Farm', 'output': 25.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [0.5273439999999999, 53.265213]}}, {'id': '10220', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 57.73935, 'longitude': -4.559326, 'name': 'Lochluichart Windfarm', 'output': 12.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.559326, 57.73935]}}, {'id': '10221', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 51.645294, 'longitude': 1.362305, 'name': 'London Array Windfarm', 'output': 52.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [1.362305, 51.645294]}}, {'id': '10222', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.160043, 'longitude': -4.822998, 'name': 'Mark Hill Windfarm', 'output': 4.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.822998, 55.160043]}}, {'id': '10224', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 57.219608, 'longitude': -4.866943, 'name': 'Millennium Wind Farm', 'output': 2.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.866943, 57.219608]}}, {'id': '10226', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.040614, 'longitude': -3.47168, 'name': 'Minsca Wind Farm', 'output': 2.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.47168, 55.040614]}}, {'id': '10228', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 57.39099399999999, 'longitude': -4.052356, 'name': 'Moy Windfarm', 'output': 1.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.052356, 57.39099399999999]}}, {'id': '10232', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 51.710658, 'longitude': -3.561358, 'name': 'Pen y Cymoedd Wind Farm', 'output': 15.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.561358, 51.710658]}}, {'id': '10233', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 53.276, 'longitude': 0.841, 'name': 'Race Bank Offshore Wind Farm', 'output': 133.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [0.841, 53.276]}}, {'id': '10234', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 50.67, 'longitude': -0.27, 'name': 'Rampion Offshore Windfarm', 'output': 32.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-0.27, 50.67]}}, {'id': '10235', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 54.75, 'longitude': -3.716667, 'name': 'Robin Rigg East', 'output': 1.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.716667, 54.75]}}, {'id': '10236', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 54.75, 'longitude': -3.716667, 'name': 'Robin Rigg West', 'output': 2.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.716667, 54.75]}}, {'id': '10238', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.322673, 'longitude': -4.023363, 'name': 'Sanquhar Community Wind Farm Generation', 'output': 9.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.023363, 55.322673]}}, {'id': '10239', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 53.135, 'longitude': 1.147, 'name': 'Sheringham Shoals Windfarm  1', 'output': 88.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [1.147, 53.135]}}, {'id': '10240', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 58.385271, 'longitude': -3.89086, 'name': 'Strathy North Wind Farm 1', 'output': 8.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.89086, 58.385271]}}, {'id': '10242', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 51.385495, 'longitude': 1.461182, 'name': 'Thanet Offshore Windfarm', 'output': 34.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [1.461182, 51.385495]}}, {'id': '10243', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.77, 'longitude': -2.81, 'name': 'Toddleburn Wind Farm', 'output': 1.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-2.81, 55.77]}}, {'id': '10244', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 56.662265000000005, 'longitude': -2.581787, 'name': 'Tullo', 'output': 2.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-2.581787, 56.662265000000005]}}, {'id': '10245', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 53.981935, 'longitude': -3.603516, 'name': 'Walney Offshore Windfarm (Extension)', 'output': 3.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.603516, 53.981935]}}, {'id': '10248', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 53.943155, 'longitude': 0.6811520000000001, 'name': 'Westermost Rough Windfarm', 'output': 23.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [0.6811520000000001, 53.943155]}}, {'id': '10250', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 53.923751, 'longitude': -3.768311, 'name': 'West of Duddon Sands', 'output': 2.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-3.768311, 53.923751]}}, {'id': '10252', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.702355, 'longitude': -4.042969, 'name': 'Whitelee Wind Farm', 'output': 15.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.042969, 55.702355]}}, {'id': '10253', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 55.702355, 'longitude': -4.042969, 'name': 'Whitelee Windfarm Extension', 'output': 7.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.042969, 55.702355]}}, {'id': '10284', 'type': 'Feature', 'properties': {'fuel_type': 'wind', 'latitude': 57.09986899999999, 'longitude': -4.461346, 'name': 'Stronelairg Windfarm', 'output': 12.0, 'output_time': '2021-06-17 00:00'}, 'geometry': {'type': 'Point', 'coordinates': [-4.461346, 57.09986899999999]}}]}

    var geoJson = new L.geoJSON(geojsonFeature, {
        pointToLayer: (feature, latlng) => {
            return new L.Circle(
                [feature.properties.latitude, feature.properties.longitude], 
                Math.sqrt(feature.properties.output)*1000, {
                    fillOpacity: .75,
                    weight: 2,
                    color: getColor(feature.properties.fuel_type)
                }
            );
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup('<p>Name: '+feature.properties.name);
        }
    }).addTo(mymap);

    var legend = L.control({position: 'bottomleft'});
        legend.onAdd = function (mymap) {
            var div = L.DomUtil.create('div', 'info legend');
            labels = ['<p style="font-size: 20px"><strong>Fuel Types</strong>'],
            categories = ['wind', 'solar', 'gas', 'hydro', 'coal', 'nuclear', 'biomass', 'oil'];

            for (var i = 0; i < categories.length; i++) {

                    div.innerHTML += 
                    labels.push(
                        '<span id="dot" style="background-color:' + getColor(categories[i]) + '"></span> ' +
                    (categories[i] ? capitalise(categories[i]) : '+'));
            }
            labels.push('</p>')
            div.innerHTML = labels.join('<br>');
        return div;
        };
    legend.addTo(mymap);
});