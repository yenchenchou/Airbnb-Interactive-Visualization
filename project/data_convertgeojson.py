import pandas as pd
import numpy as np
import csv
import json

#df = pd.read_csv('./project/data/dataset/df.csv') # 77904
df_wechat = pd.read_csv('/Users/weifanchen/Downloads/df.csv')
final_df = df_wechat[[
    'host_id', 
    'name', 
    'latitude',
    'longitude',
    'room_type',
    'price',
    'number_of_reviews',
    'description',
    'availability_365',
    'instant_bookable',
    'city'
]]
df = df.drop(['Unnamed: 0'],axis=1)
json_str=df.to_json(orient='records')
json_dict=json.loads(json_str)
feat = [{"type": "Feature","geometry": {"type": "Point","coordinates":[j['longitude'],j['latitude']]},"properties":j} for j in json_dict]
test_geo = {
  "type": "FeatureCollection",
  "features": feat
}
with open('test_geo.json', 'w') as json_file:
  json.dump(test_geo, json_file)


'''
cal_map = pd.read_json('./project/data/dataset/california-counties.geojson')
df['city'] = df.city.apply(lambda x:x.strip())

# 
neighborhood = df.neighbourhood_cleansed.unique() #len 541
city = df.city.unique() # len 542

neighborhood_count=df.groupby(['neighbourhood_cleansed']).size() 
city_count=df.groupby(['city']).size() 

df['city'] = df.city.apply(lambda x:x.strip()) #461
df['city'] = df.city.apply(lambda x:x.replace(',','')) #456


df['neighbor'] = df.neighbourhood_cleansed
df.loc[df['neighbor'] =='Unincorporated Areas', 'neighbor'] = df.city

len(neighborhood_count[neighborhood_count<5]) = 60
len(city_count[city_count<5]) = 348 -> 278
Neighborhood_clensed is obviously cleaner than city
but the city /county name is more specific than city
There are 1243 of Neighborhood_clensed is Unincorporated Areas

# df[df.neighbourhood_cleansed == city] # 2XXXX


differenc = df[df.neighbourhood_cleansed != df.city][['neighbourhood_cleansed','city']].drop_duplicates()

'''