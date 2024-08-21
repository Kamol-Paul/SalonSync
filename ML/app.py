from flask import Flask, request, jsonify
from inference_sdk import InferenceHTTPClient
import base64

app = Flask(__name__)

# Initialize the Roboflow client
CLIENT = InferenceHTTPClient(
    api_url="https://classify.roboflow.com",
    api_key="6ihZt6lj0HEjI3AqIjXO"  # Replace with your actual API key
)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    # Check if 'image' is present in the request
    if 'image' not in data:
        return jsonify({'error': 'No image provided'}), 400
    
    # Get the base64 image string
    base64_image = data['image']
    
    # Remove the data URL prefix if present
    if base64_image.startswith("data:image"):
        base64_image = base64_image.split(",")[1]
    
    # Decode the base64 string to bytes
    try:
        image_data = base64.b64decode(base64_image)
    except Exception as e:
        return jsonify({'error': f'Failed to decode image: {str(e)}'}), 400
    
    # Perform inference using Roboflow API
    try:
        result = CLIENT.infer(image_data, model_id="face-shape-classification-fmivb/1")
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': f'Failed to perform inference: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)

