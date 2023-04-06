import csv
import json
from collections import Counter, defaultdict
import numpy as np
import matplotlib.pyplot as plt
import glob
import pandas as pd
import os
from anyio import Path
from datetime import datetime
import requests
import json


idx_name_dict = {
    0: 'values',
}

pathFolder = "D:/Download/BinaryFile/"


def restGetData(id):

    url = "https://api.wecheer.me/staging-fraud-detection/api/accelerometer-data/spectrogram"

    payload = json.dumps({
        "id": id
    })
    headers = {
        'authority': 'api.wecheer.me',
        'accept': 'application/json',
        'accept-language': 'en-US,en;q=0.9,vi-VN;q=0.8,vi;q=0.7,fr-FR;q=0.6,fr;q=0.5',
        'authorization': 'Bearer eyJraWQiOiJlUE93ZW1lMlVLS2lHdG1IMW93WGtmMGZXMHFnNk9uNDR3M3FuOFFHTUQ0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwOTIwMThkZC03M2FlLTQ2YzMtYWFkMi1jMmU1OGQ1NzMzZGIiLCJjb2duaXRvOmdyb3VwcyI6WyJJbWFnZUNsYXNzaWZpY2F0aW9uLlJlYWQiLCJDb25zdW1wdGlvbi5CcmFuZFJlY2xhc3NpZnkiLCJDb25zdW1wdGlvbi5Xcml0ZSIsIkZyYXVkRGV0ZWN0aW9uLlJlYWQiLCJGcmF1ZERldGVjdGlvbi5Xcml0ZSIsIkRldmljZU1hbmFnZW1lbnQuUmVhZCIsIkNvbnN1bXB0aW9uLlJlYWQiLCJEZXZpY2VNYW5hZ2VtZW50LkZpcm13YXJlVXBsb2FkIiwiSW1hZ2VDbGFzc2lmaWNhdGlvbi5Xcml0ZSIsIkRldmljZU1hbmFnZW1lbnQuV3JpdGUiLCJDb25zdW1wdGlvbi5GcmF1ZFJlY2xhc3NpZnkiXSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX3FDVmJiOFZwbiIsInZlcnNpb24iOjIsImNsaWVudF9pZCI6IjJndHU5bDR2ODdwOG1xcmZmZWs4MGJ1OWRzIiwiZXZlbnRfaWQiOiI1MTA4ODY2ZC1iMTY2LTQzNDgtODk0MC1mYzFlNjE3OTRkYTUiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBEZWZhdWx0XC9EZWZhdWx0IHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2ODA1NzM4MDcsImV4cCI6MTY4MDU4MjUwNywiaWF0IjoxNjgwNTc4OTA3LCJqdGkiOiJmMzM0ZTRjYi1jMGY2LTRkZDQtODE5ZS01N2Q3Njk2NzlkNGQiLCJ1c2VybmFtZSI6IjA5MjAxOGRkLTczYWUtNDZjMy1hYWQyLWMyZTU4ZDU3MzNkYiJ9.hhMjoGKEXpe-uzLHdHMqjRh33rfh46VRdi-J57yJmKHMczHylBE1b6nVqYKWzwOr0xY3pItG7EwKqhp5e1sZha-xpfMt5dohkDHBthJzVRxSUia4ndiMdZG9PZWHeK1dU4yfXmREBY5yH1RWh6FTtKwsYBvLeniawU7MGcz6gjYfpGJ0H5MVebWevUspYYJwmJCex1Hu-6TbgJDUsQsjJ1RZzvMxQ74pkM91yQYfNGkJVhx8Pp5tK4XEeNZWVfWRgzDsAFSFAE1WrxuTfcdHpdzwwCaA9aTcFJre8V7peeAq548qQ4UMytCJxEGyt_0h8xhPHUE-jiMcTQJnrV0q-w',
        'content-type': 'application/json',
        'origin': 'https://staging.wecheer.me',
        'referer': 'https://staging.wecheer.me/',
        'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    return response
    # print(response.text)


def extract_data(path):
    with open(path, "rb") as f:
        data = f.read()

    data_points = []
    for i in range(0, len(data), 2):
        point = {}
        for j in range(0, 2, 2):
            idx_start = i + j
            idx_end = idx_start+2
            v = int.from_bytes(data[idx_start:idx_end], "little", signed=True)
            break
        # data_points.append(v)
        if v != 0:
            data_points.append(v)
    return data_points


def mean_filter(data, n=3):
    result = []
    for i in range(len(data)):
        result.append(np.mean(data[i:i+n]))

    return np.array(result)


def median_filter(data, n=3):
    result = []
    for i in range(len(data)):
        result.append(np.median(data[i:i+n]))

    return np.array(result)


def predict(path):
    data_points = extract_data(path)
    data_median = median_filter(data_points, n=11)
    data_median_mean = mean_filter(data_median, n=3)
    # data_smooth_deri = data_median_mean[1:] - data_median_mean[:-1]
    try:
        print(datetime.now())
        return {"min": min(data_median_mean), "max": max(data_median_mean)}
    except:
        return {"min": 0, "max": 0}
    # return 'normal' if min(data_smooth_deri) < -900 else 'fraud'


# def extract_data1(path):
#     with open(path, "rb") as f:
#         data = f.read()
#     data_points = []
#     for i in range(0, len(data), 2):
#         point = {}
#         for j in range(0, 2, 2):
#             idx_start = i + j
#             idx_end = idx_start+2
#             v = int.from_bytes(data[idx_start:idx_end], "little", signed=True)
#             point[idx_name_dict[j]] = v
#         if point['values'] != 0:
#             data_points.append(point)

#     return data_points

def predictAPI(url):
    dataAPI = restGetData(url)
    jsonData = json.loads(dataAPI.text)

    arr = []
    for i in jsonData['accSamples']:
        if i['gyroX'] != 0:
            arr.append(i['gyroX'])
        else:
            continue               

    data_points = arr
    data_median = median_filter(data_points, n=11)
    data_median_mean = mean_filter(data_median, n=3)
    data_smooth_deri = data_median_mean[1:] - data_median_mean[:-1]
    try:
        print(datetime.now())
        return {"min": min(data_smooth_deri), "max": max(data_smooth_deri)}
    except:
        return {"min": 0, "max": 0}


def convertLstFile():
    lstConverted = []
    lstFile = get_files_in_folder(pathFolder)
    for file_name in lstFile:
        # url = file_name.replace("_", ":")
        # predictAPI(url)

        file_path = os.path.join(pathFolder, file_name)
        res = predict(file_path)
        lstConverted.append(
            {"filename": file_path, "min": res["min"], "max": res["max"]})
    ress = saveCsvToStored(lstConverted, pathFolder + "Response.csv")
    print(ress)


def get_files_in_folder(folder_path):
    file_list = []
    for filename in os.listdir(folder_path):
        if os.path.isfile(os.path.join(folder_path, filename)):
            file_list.append(filename)
    return file_list


def saveCsvToStored(json_data, pathFile):
    with open(pathFile, "w", newline="") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["filename", "min", "max"])
        for item in json_data:
            writer.writerow([item["filename"], item["min"], item["max"]])
    print("File saved:", pathFile)


if __name__ == "__main__":
    convertLstFile()
