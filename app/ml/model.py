import joblib
import os

MODEL_PATH = os.environ.get('MODEL_PATH', 'backend/app/ml/model.pkl')

def load_model():
    if os.path.exists(MODEL_PATH):
        return joblib.load(MODEL_PATH)
    return None

def predict_from_features(model, features: dict):
    # fallback simple rule if model not present
    if model is None:
        score = features['focus_score'] * 0.6 + (features['sleep_hours'] / 8.0) * 0.4 - features['breaks'] * 0.05
        label = 'Sehat' if score >= 0.5 else 'Berpotensi Toksik'
        prob = min(max(score, 0.0), 1.0)
        return label, prob
    X = [
        features['duration_minutes'],
        features['breaks'],
        features['focus_score'],
        features['sleep_hours'],
        features['mood']
    ]
    proba = model.predict_proba([X])[0]
    # assume classes_ contains 'Sehat' or similar
    if 'Sehat' in model.classes_:
        idx = model.classes_.tolist().index('Sehat')
    else:
        idx = 0
    return (model.predict([X])[0], float(proba[idx]))
