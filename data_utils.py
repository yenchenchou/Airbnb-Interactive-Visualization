#%%
from IPython import get_ipython

import glob
import os
import re
import sys

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns

pd.set_option("display.max_columns", 500)

all_file_list = glob.glob('/Users/yc/Desktop/Airbnb' + "/*.csv")
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
    with open(path + 'describe_word.txt', 'r') as f:
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
    # first time column drop by number of not null
    filter_column_name = list(df.isnull().sum().sort_values(ascending = True).index[:50])
    filter_column_name.append('amenities')
    df = df[filter_column_name]
    
    # second time column drop
    df.drop(['calculated_host_listings_count', 
             'minimum_nights',
             'neighbourhood',
             'last_review'],
           axis = 1,
           inplace = True)

    numeric_list = ['accommodates', 'number_of_reviews', 'reviews_per_month']
    cat_list = ['room_type', 'room_type', 'name', 'instant_bookable']
    cat1, cat2 = 'extra pillows and blankets', 'carbon monoxide detector'
 
    df.dropna(subset = ['longitude', 'latitude', 'price'], inplace = True)    
    df[numeric_list] = df[numeric_list].fillna(0)
    df.loc[:,cat1:cat2] = df.loc[:,cat1:cat2].fillna('Unknown')
    df[cat_list] = df[cat_list].fillna('Unknown')
    df['description'] = get_keyword(df)
    df['description'] = df['description'].fillna('<None>')
    df['amenities'] = df['amenities'].fillna('Unknown')
    df['price'] = [float(re.sub(r"[^0-9]", "", row)) for row in df['price']]
    
    return df

if __name__ == '__main__':
    print("preparing data...")
    df = get_data(all_file_list)
    describe_word = hotel_describe_words(path)
    df_new = data_cleaning(df)
    save_path = '/Users/yc/Desktop/OneDrive/USC/課程syllabus+resource/INF554/a5-undefined/project/data/dataset'
    df_new.to_csv(os.path.join(save_path ,"df_california_filtered_cleaned_2.csv"), index = False)
    print('complete!')