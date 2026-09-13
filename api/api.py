from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import uuid


app = Flask(__name__)

CORS(app)



# Model path

MODEL_PATH = r"C:\Users\atunc\OneDrive\Masaüstü\eyeaimobil\model\cnn_model.h5"


model = load_model(MODEL_PATH)



classes = [
    "Cataract",
    "Glaucoma",
    "Diabetic Retinopathy",
    "Normal"
]



IMG_SIZE = 224



UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)





def prepare_image(img_path):

    img = image.load_img(
        img_path,
        target_size=(
            IMG_SIZE,
            IMG_SIZE
        )
    )


    img_array = image.img_to_array(
        img
    )


    img_array = np.expand_dims(
        img_array,
        axis=0
    )


    img_array = img_array / 255.0


    return img_array







@app.route("/predict", methods=["POST"])
def predict():



    if "image" not in request.files:

        return jsonify({
            "error": "No image uploaded"
        }), 400





    img_file = request.files["image"]




    filename = (
        str(uuid.uuid4())
        +
        ".jpg"
    )



    img_path = os.path.join(
        UPLOAD_FOLDER,
        filename
    )



    img_file.save(
        img_path
    )







    # Image preparation

    img_array = prepare_image(
        img_path
    )







    # AI Prediction

    prediction = model.predict(
        img_array
    )




    predicted_index = np.argmax(
        prediction[0]
    )



    predicted_class = classes[
        predicted_index
    ]



    confidence = float(
        np.max(
            prediction[0]
        )
    )







    # Terminal output

    print("\n==============================")

    print("AI Prediction Result")

    print("==============================")


    print("Class Probabilities:")



    for i, prob in enumerate(prediction[0]):

        print(
            classes[i],
            ":",
            round(
                float(prob),
                4
            )
        )



    print("------------------------------")


    print(
        "Predicted Disease:",
        predicted_class
    )


    print(
        "Confidence:",
        round(
            confidence,
            4
        )
    )


    print("==============================\n")







    # Delete uploaded image

    if os.path.exists(img_path):

        os.remove(
            img_path
        )








    return jsonify({

        "prediction":
            predicted_class,


        "confidence":
            round(
                confidence,
                4
            )

    })







if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )