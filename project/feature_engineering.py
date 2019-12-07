#%%
import os
import re
import sys
import json

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns

from collections import defaultdict
df_test = pd.read_csv('project/data/dataset/df.csv')
df_test.amenities.fillna('Unknown', inplace = True)
# %%
# room_type_price = df_test[['room_type', 'price']].groupby(['room_type']).mean()
# room_type_price.reset_index(level=0, inplace=True)
# room_type_price.to_json('project/data/dataset/room_type_price.json', orient = 'records')

# %%
def word_counter(column_name):
    word_cnt = defaultdict(int)
    for row in df_test[column_name]:
        word_list = [word.strip() for word in row.split(',')]
        for word in word_list:
            word_cnt[word] += 1
    return word_cnt


def avg_price_per_word(cat_col_name, num_col_name):
    categorical_list, numeric_list = [], []
    for i in range(len(df_test[cat_col_name])):
        row = df_test[cat_col_name][i]
        word_list = [word.strip() for word in row.split(',')]
        for word in word_list:
            p = df_test[num_col_name][i]
            categorical_list.append(word)
            numeric_list.append(p)

    assert len(categorical_list) == len(numeric_list)

    cat_num_df = pd.DataFrame.from_dict(
        {cat_col_name : categorical_list, num_col_name : numeric_list})
    cat_num_df = cat_num_df.groupby(by = cat_col_name).mean()
    cat_num_df = cat_num_df.sort_values(by = num_col_name)
    cat_num_df = cat_num_df.reset_index(drop = False)

    return cat_num_df


def combine_cnt_avg(name1, name2, cnt_dic, avg_df):
    cnt_df = pd.DataFrame.from_dict({
        name1 : list(cnt_dic.keys()),
        name2 : list(cnt_dic.values())
    })

    cnt_avg_df = avg_df.merge(cnt_df, 
                              left_on = name1, 
                              right_on = name1,
                              how = 'inner')
    return cnt_avg_df
# %%
description_word_cnt = word_counter('description')
amenity_word_cnt = word_counter('amenities')
# %%
desc_price_df = avg_price_per_word('description', 'price')
amenity_price_df = avg_price_per_word('amenities', 'price')
#%%
description_cnt_avg_df = combine_cnt_avg(
    'description', 'price', description_word_cnt, desc_price_df)
description_cnt_avg_df.rename(columns = 
    {'price_x':'price','price_y':'countword'}, inplace = True)

amenity_cnt_avg_df = combine_cnt_avg(
    'amenities', 'price', amenity_word_cnt, amenity_price_df)
amenity_cnt_avg_df.rename(columns = 
    {'price_x':'price','price_y':'countword'}, inplace = True)

# %%
sns.scatterplot(x="price", y="countword", data=description_cnt_avg_df)

# %%
sns.scatterplot(x="price", y="countword", data=amenity_cnt_avg_df)
#%%
description_cnt_avg_df.to_json('project/data/dataset/description_cnt_avg_df.json', orient = 'records')
amenity_cnt_avg_df.to_json('project/data/dataset/amenity_cnt_avg_df.json', orient = 'records')

# %%
# get city count house
city_house_cnt = df_test[['host_id', 'city']].groupby(by='city').count().reset_index()
city_house_cnt.to_csv('project/data/dataset/city_house_cnt.csv')


# %%
final_df = df_test[[
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
final_df.to_csv('project/data/dataset/df.csv')

# %%
