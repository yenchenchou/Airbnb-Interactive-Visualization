# -*- coding: utf-8 -*-
#%%
import glob
import os
import re
import sys

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns

pd.set_option("display.max_columns", 500)

all_file_list = glob.glob('/Users/yc/Desktop/Airbnb/raw_data' + "/*.csv")
path = '/Users/yc/Desktop/OneDrive/USC/課程syllabus+resource/INF554/a5-undefined/project/data/dataset/'

def get_data(all_file_list):
    
    df = pd.DataFrame()
    row_check = 0

    for filename in all_file_list:
        sub_df = pd.read_csv(filename, index_col=None, header=0)
        row_check += sub_df.shape[0]
        df = pd.concat([df, sub_df], axis=0, ignore_index=True)
    
    assert row_check == df.shape[0], 'Concating Error'
    
    return df


def hotel_describe_words(path):
    with open(path + 'describe.txt', 'r') as f:
        describe_word = f.read().split(',')
        describe_word = [word.strip() for word in describe_word]
    return describe_word


def get_keyword(df):
    ls = []
    for row in df.description:
        tmp = ''
        for word in describe_word:
            if word in str(row).lower():
                if word not in tmp:
                    tmp += word + ', '
        ls.append(tmp[:-2])
    return pd.Series(ls)


def data_cleaning(df):
    filter_column_name = ['host_id', 'name', 'latitude', 'longitude', 'room_type', 'price',
                            'minimum_nights', 'reviews_per_month', 'number_of_reviews',
                            'description', 'amenities', 'property_type', 'accommodates',
                            'availability_365', 'instant_bookable', 'city']
    df = df[filter_column_name]
    df.dropna(subset = ['longitude', 'latitude', 'price'], inplace = True) 
    df['price'] = [float(re.sub(r"[^0-9]", "", row))/100 for row in df['price']]
    df['description'] = get_keyword(df)
    df['description'].fillna('<None>', inplace = True)
    df['amenities'] = [re.sub(r"[\"\{\}]", "", row) for row in df['amenities']]
    df['amenities'].fillna('Unknown', inplace = True)
    df.fillna(0, inplace = True)

    return df

if __name__ == '__main__':
    print("preparing data...")
    df = get_data(all_file_list)
    describe_word = hotel_describe_words(path)
    df_new = data_cleaning(df)
    save_path = '/Users/yc/Desktop/OneDrive/USC/課程syllabus+resource/INF554/a5-undefined/project/data/dataset'
    df_new.to_csv(os.path.join(save_path ,"df.csv"), index = False)
    print('complete!')


# %%
