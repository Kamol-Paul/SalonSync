from flask import Flask, request, jsonify
from flask_cors import CORS
from inference_sdk import InferenceHTTPClient
import base64
import os
from io import BytesIO
from PIL import Image
import tempfile

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Initialize the Roboflow client
CLIENT = InferenceHTTPClient(
    api_url="https://classify.roboflow.com",
    api_key="6ihZt6lj0HEjI3AqIjXO",  # Replace with your actual API key
)


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # Check if 'image' is present in the request
    if "image" not in data:
        return jsonify({"error": "No image provided"}), 400

    # Get the base64 image string
    base64_image = data["image"]

    # Remove the data URL prefix if present
    if base64_image.startswith("data:image"):
        base64_image = base64_image.split(",")[1]

    # Decode the base64 string to bytes
    try:
        image_data = base64.b64decode(base64_image)
    except Exception as e:
        return jsonify({"error": f"Failed to decode image: {str(e)}"}), 400

    # Convert the bytes data to a PIL image
    try:
        image = Image.open(BytesIO(image_data))
    except Exception as e:
        return jsonify({"error": f"Failed to create image: {str(e)}"}), 400

    # Save the image to a temporary file
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
            image.save(temp_file, format="JPEG")
            temp_file_path = temp_file.name
    except Exception as e:
        return jsonify({"error": f"Failed to save image: {str(e)}"}), 500

    # Perform inference using Roboflow API
    try:
        result = CLIENT.infer(
            temp_file_path, model_id="face-shape-classification-fmivb/1"
        )

        face_shape_hairstyle_map = {
            "Round": ["Side-Sweep Edge", "Casual Fringe"],
            "Oblong": ["Sleek Quiff", "Layered Swoop"],
            "Oval": ["Spiky Flair"],
            "Round": ["Feathered Pom.", "Wild Cascade"],
            "Square": ["Wind-Swept Wave"],
        }

        return jsonify(face_shape_hairstyle_map[result.get("top")])
    finally:
        # Clean up: remove the temporary file
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5888)
