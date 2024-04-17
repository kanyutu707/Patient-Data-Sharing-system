import os
from PIL import Image
from io import BytesIO
import numpy as np
import tensorflow as tf
import cv2

input_shape = (224, 224)

def read_image(image_encoded):
    pil_image = Image.open(BytesIO(image_encoded))
    return pil_image

def preprocess(image: Image.Image):
    image = image.resize(input_shape)
    image = np.asarray(image)
    image = image / 127.5 - 1.0
    image = np.expand_dims(image, 0)
    return image

def load_model():
    model = tf.keras.models.load_model('face_detection_model.h5', compile=False)
    return model

model = load_model()

def model_verification_function(model, detection_measure, verification_measure):
    closest_image = None
    closest_similarity = 0.0
    stored_images_path = os.path.join('image_storage', 'stored_images')
    
    for file in os.listdir(stored_images_path):
        comparison_img = preprocess(os.path.join('image_storage', 'comparison_images', 'comparison_image.jpg'))
        stored_img = preprocess(os.path.join(stored_images_path, file))
        similarity = model.predict([comparison_img, stored_img])[0][0]
        if similarity > closest_similarity:
            closest_similarity = similarity
            closest_image = file
    
    closest_image_name = os.path.splitext(os.path.basename(closest_image))[0] if closest_image else None
    return closest_image_name, closest_similarity

def predict(img):
    cv2.imwrite(os.path.join('image_storage', 'comparison_images', 'comparison_image.jpg'), img)
    closest_image, closest_similarity = model_verification_function(model, 0.9, 0.7)
    print("Closest Image:", closest_image)
    print("Similarity:", closest_similarity)
    return closest_image, closest_similarity

