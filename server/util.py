import json
import pickle
import numpy as np
from sklearn.preprocessing import MinMaxScaler

__sex = None
__exang = None
__ca = None
__chestpain = None
__slp = None
# __data_columns = None
__model = None


def load_saved_stuff():
    print("loading saved stuff...start")
    global __data_columns
    global __model
    global __sex
    global __exang
    global __ca
    global __chestpain
    global __slp

    with open("./stuff/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __sex = __data_columns[5:7]
        __exang = __data_columns[7:9]
        __ca = __data_columns[9:14]
        __chestpain = __data_columns[14:18]
        __slp = __data_columns[18:21]

    if __model is None:
        with open('./stuff/heart_disease_model.pickle', 'rb') as f:
            __model = pickle.load(f)
    print("loading saved stuff...done")


def get_gender():
    return __sex


def get_exang():
    return __exang


def get_ca():
    return __ca


def get_chestpain():
    return __chestpain


def get_slp():
    return __slp


def get_data_columns():
    return __data_columns


def get_prediction(age, trtbps, chol, thalachh, oldpeak, sex, exang, ca, chestpain, slp):
    try:
        sex_index = __data_columns.index(sex.upper())
    except:
        sex_index = -1

    try:
        exang_index = __data_columns.index(exang.upper())
    except:
        exang_index = -1

    try:
        ca_index = __data_columns.index(ca.upper())
    except:
        ca_index = -1

    try:
        chestpain_index = __data_columns.index(chestpain.upper())
    except:
        chestpain_index = -1

    try:
        slp_index = __data_columns.index(slp.upper())
    except:
        slp_index = -1

    x = np.zeros(len(__data_columns))

    # Normalize continuous features only
    continuous_features = [0, 1, 2, 3, 4]
    scaler = MinMaxScaler()
    scaler.fit([[29.0, 94.0, 126.0, 71.0, 0.0], [77.0, 200.0, 564.0, 202.0, 6.2]])  # range of continuous features in dataset
    x[continuous_features] = scaler.transform([[age, trtbps, chol, thalachh, oldpeak]])[0]

    if sex_index >= 0:  # as we are using dummy one hot encoding, we are trying to find appropriate cols
        x[sex_index] = 1
    if exang_index >= 0:
        x[exang_index] = 1
    if ca_index >= 0:
        x[ca_index] = 1
    if chestpain_index >= 0:
        x[chestpain_index] = 1
    if slp_index >= 0:
        x[slp_index] = 1

    print(x[continuous_features])
    print(x)

    result = (__model.predict([x])[0])
    if result == 0:
        return "Heart Disease Detected"
    else:
        return "Heart Disease Not Detected"


if __name__ == '__main__':
    load_saved_stuff()
    print(get_gender())
    print(get_exang())
    print(get_ca())
    print(get_chestpain())
    print(get_slp())
    print(get_data_columns())
    # print(get_prediction(0.583, 0.433, 0.262, 0.396, 0.032, "SEX_0", "EXNG_1", "CAA_0", "CP_0", "SLP_1"))
    # print(get_prediction(0.227, 0.786, 0.964, 0.681, 0.669, "SEX_1", "EXNG_1", "CAA_4", "CP_3", "SLP_1"))
    print(get_prediction(57, 140, 241, 123, 0.2, "SEX_0", "EXNG_1", "CAA_0", "CP_0", "SLP_1"))
    print(get_prediction(63, 145, 233, 150, 2.3, "SEX_1", "EXNG_0", "CAA_1", "CP_3", "SLP_0"))
    print(get_prediction(43, 110, 211, 161, 0.0, "SEX_1", "EXNG_0", "CAA_0", "CP_0", "SLP_2"))
