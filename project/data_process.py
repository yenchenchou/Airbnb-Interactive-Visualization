import csv, json
from geojson import Feature, FeatureCollection, Point
import pandas

df = pandas.read_csv('./project/my-app/public/df.csv')

json_result_string = df.to_json(
    orient='records', 
)
json_result = json.loads(json_result_string)


#save json file
with open('test.json', 'w') as outfile:
    json.dump(json_result, outfile)



geojson = {
    'type': 'FeatureCollection',
    'features': []
}

for record in json_result:
    geojson['features'].append({
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [record['longitude'], record['latitude']],
        },
        'properties': record,

    })

with open('test_geo.json', 'w') as outfile:
    json.dump(geojson, outfile)


# features = []
# with open('./my-app/public/df(2).csv', newline='') as csvfile:
#     reader = csv.reader(csvfile, delimiter=',')
#     for latitude, longitude, weather, temp in reader:
#         latitude, longitude = map(float, (latitude, longitude))
#         features.append(
#             Feature(
#                 geometry = Point((longitude, latitude)),
#                 properties = {
#                     'host_id':
#                     'weather': weather,
#                     'temp': temp
#                 }
#             )
#         )

# collection = FeatureCollection(features)
# with open("GeoObs.json", "w") as f:
#     f.write('%s' % collection)


# import csv
# import json
# from collections import OrderedDict

# li = []
# with open('CurrentObs.csv', 'r') as csvfile:
#     reader = csv.reader(csvfile, delimiter=',')
#     for latitude, longitude, weather, temp in reader:
#         d = OrderedDict()
#         d['type'] = 'Feature'
#         d['geometry'] = {
#             'type': 'Point',
#             'coordinates': [float(latitude), float(longitude)]
#         }
#         d['properties'] = {
#             'weather': weather,
#             'temp': temp
#         }
#         li.append(d)

# d = OrderedDict()
# d['type'] = 'FeatureCollection'
# d['features'] = li
# with open('GeoObs.json', 'w') as f:
#     f.write(json.dumps(d, sort_keys=False, indent=4))


# rawData = csv.reader(open('./project/my-app/public/df(2).csv', 'rb'))