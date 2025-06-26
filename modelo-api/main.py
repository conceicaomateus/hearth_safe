import os
import joblib
import numpy as np

from flask import Flask, request, jsonify
from flask_cors import CORS

ALLOWED_ORIGINS = ["http://localhost:8080", "http://localhost:8080"]

app = Flask(__name__)
CORS(app, origins=ALLOWED_ORIGINS)

model = joblib.load('artefatos/hearth_safe.joblib')

class_names = ['HeartDisease']

sex_map = {'M': 1, 'F': 0}
chest_pain_map = {'ATA': 0, 'NAP': 1, 'ASY': 2, 'TA': 3}
resting_ecg_map = {'Normal': 0, 'ST': 1, 'LVH': 2}
exercise_angina_map = {'N': 0, 'Y': 1}
st_slope_map = {'Up': 0, 'Flat': 1, 'Down': 2}

@app.before_request
def check_origin():
    origin = request.headers.get('Origin')
    if origin not in ALLOWED_ORIGINS:
        return jsonify({'error': 'Origin not allowed'}), 403

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    print(f"Received data: {data}")

    required_features = ['Age', 'Sex', 'ChestPainType', 'RestingBP', 'Cholesterol',
                         'FastingBS', 'RestingECG', 'MaxHR', 'ExerciseAngina',
                         'Oldpeak', 'ST_Slope']
    
    if not data:
        return jsonify({'error': 'Nenhum dado enviado'}), 400
    
    try:
        features = [data.get(f) for f in required_features]
        if None in features:
            return jsonify({'error': f'Todas as features devem ser fornecidas: {required_features}'}), 400

        features_processed = [
            int(data['Age']),
            sex_map[data['Sex']],
            chest_pain_map[data['ChestPainType']],
            int(data['RestingBP']),
            int(data['Cholesterol']),
            int(data['FastingBS']),
            resting_ecg_map[data['RestingECG']],
            int(data['MaxHR']),
            exercise_angina_map[data['ExerciseAngina']],
            float(data['Oldpeak']),
            st_slope_map[data['ST_Slope']]
        ]

        print(f"Processed features: {features_processed}")

        features_np = np.array([features_processed])

        prediction = int(model.predict(features_np)[0])

        message = ''

        if prediction != 1:                         
            message = 'Você não tem doença cardíaca.'
        else:
            message = 'Você tem doença cardíaca.'

        return jsonify({'prediction': prediction, 'message': message}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Endpoint para verificar a saúde da aplicação
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK'}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host="0.0.0.0", port=port)