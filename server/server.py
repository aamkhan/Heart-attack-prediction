from flask import Flask, request, jsonify
import util

app = Flask(__name__)


@app.route('/get_gender', methods=['GET'])
def get_gender():
    response = jsonify({
        'sex': util.get_gender()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/get_exang', methods=['GET'])
def get_exang():
    response = jsonify({
        'exang': util.get_exang()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/get_ca', methods=['GET'])
def get_ca():
    response = jsonify({
        'ca': util.get_ca()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/get_chestpain', methods=['GET'])
def get_chestpain():
    response = jsonify({
        'chestpain': util.get_chestpain()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/get_slp', methods=['GET'])
def get_slp():
    response = jsonify({
        'slp': util.get_slp()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/predict_heart_attack', methods=['GET', 'POST'])
def predict_heart_attack():
    age = float(request.form['age'])
    bp = float(request.form['bp'])
    chol = float(request.form['chol'])
    thalachh = float(request.form['thalachh'])
    oldpeak = float(request.form['oldpeak'])
    sex = request.form['sex']
    exang = request.form['exang']
    ca = request.form['ca']
    chestpain = request.form['chestpain']
    slp = request.form['slp']

    response = jsonify({
        'Prediction': (util.get_prediction(age, bp, chol, thalachh, oldpeak, sex, exang, ca, chestpain, slp))
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    print("Start python flask server")
    util.load_saved_stuff()
    app.debug= True
    app.run()
