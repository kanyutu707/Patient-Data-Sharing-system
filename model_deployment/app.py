"""from fastapi import FastAPI, File, UploadFile, HTTPException, Query
import numpy as np
import cv2
import os
import tensorflow as tf
import requests
import shutil
# initialize application
app = FastAPI()

# Load the model
model = tf.keras.models.load_model('face_detection_model.h5')

# Image preprocess
def preprocess(image_path):
    spec_img = tf.io.read_file(image_path)
    decoded_image = tf.io.decode_jpeg(spec_img)
    resized_image = tf.image.resize(decoded_image, (100, 100))
    scaled_image = resized_image / 255.0
    return scaled_image

# Model verification function
def model_verification_function(model, detection_measure, verification_measure):
    closest_image = None
    closest_similarity = 0.0
    
    stored_images_path = os.path.join('image_storage', 'stored_images')
    
    for file in os.listdir(stored_images_path):
        comparison_img = preprocess(os.path.join('image_storage', 'comparison_images', 'comparison_image.jpg'))
        stored_img = preprocess(os.path.join(stored_images_path, file))
        similarity = model.predict(list(np.expand_dims([comparison_img, stored_img], axis=1)))[0][0]
        if similarity > closest_similarity:
            closest_similarity = similarity
            closest_image = file
    
    closest_image_name = os.path.splitext(os.path.basename(closest_image))[0] if closest_image else None
    return closest_image_name, closest_similarity

# Endpoint to receive image from frontend
@app.post("/receive-image/")
async def receive_image(file: UploadFile = File(...)):
    try:
        frame = await file.read()
  
        img_array = np.frombuffer(frame, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        
        frame_size = img[150:400, 200:450, :] 
     
        cv2.imwrite(os.path.join('image_storage', 'comparison_images', 'comparison_image.jpg'), img)
       
        closest_image, closest_similarity = model_verification_function(model, 0.9, 0.7)
        print("Closest Image:", closest_image)
        print("Similarity:", closest_similarity)
        
       
        closest_similarity = float(closest_similarity)

        return closest_image
    
     
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/upload_image/")
async def upload_image(email: str = Query(...), uploaded_file: UploadFile = File(...)):
    try:
        if not email:
            raise HTTPException(status_code=422, detail="Email is required")

        folder_path = "image_storage/stored_images"
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)
        
        file_location = f"{folder_path}/{email}.jpg"  # Assuming the image is a JPG file

        
        contents = await uploaded_file.read()

        with open(file_location, "wb") as file_object:
            file_object.write(contents)
        
        return {"info": f"File '{uploaded_file.filename}' saved at '{file_location}'"}
    
    except Exception as e:
        error_detail = str(e)
        print("Error:", error_detail)
        raise HTTPException(status_code=500, detail=error_detail)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9030)"""

from fastapi import FastAPI, File, UploadFile, HTTPException, Query
import numpy as np
import cv2
import os
import tensorflow as tf

# Initialize application
app = FastAPI()

# Load the model
model = tf.keras.models.load_model('face_detection_model.h5')

# Image preprocess
def preprocess(image_path):
    spec_img = tf.io.read_file(image_path)
    decoded_image = tf.io.decode_jpeg(spec_img)
    resized_image = tf.image.resize(decoded_image, (100, 100))
    scaled_image = resized_image / 255.0
    return scaled_image

# Model verification function
def model_verification_function(model, detection_threshold, verification_threshold):
    closest_image = None
    closest_similarity = 0.0
    
    stored_images_path = os.path.join('image_storage', 'stored_images')
    
    for file in os.listdir(stored_images_path):
        comparison_img = preprocess(os.path.join('image_storage', 'comparison_images', 'comparison_image.jpg'))
        stored_img = preprocess(os.path.join(stored_images_path, file))
        
        # Calculate detection measure
        detection_score = 0.9  # Placeholder value
        if detection_score < detection_threshold:
            continue  # Skip if detection score is below threshold
        
        # Calculate verification measure
        verification_score = 0.7  # Placeholder value
        if verification_score < verification_threshold:
            continue  # Skip if verification score is below threshold
        
        similarity = model.predict(list(np.expand_dims([comparison_img, stored_img], axis=1)))[0][0]
        if similarity > closest_similarity:
            closest_similarity = similarity
            closest_image = file
    
    closest_image_name = os.path.splitext(os.path.basename(closest_image))[0] if closest_image else None
    return closest_image_name, closest_similarity

# Endpoint to receive image from frontend
@app.post("/receive-image/")
async def receive_image(file: UploadFile = File(...)):
    try:
        frame = await file.read()
  
        img_array = np.frombuffer(frame, np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
        
        frame_size = img[150:400, 200:450, :] 
     
        cv2.imwrite(os.path.join('image_storage', 'comparison_images', 'comparison_image.jpg'), img)
       
        closest_image, closest_similarity = model_verification_function(model, 0.9, 0.7)
        print("Closest Image:", closest_image)
        print("Similarity:", closest_similarity)
        
        return closest_image
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to upload image
@app.post("/upload_image/")
async def upload_image(email: str = Query(...), uploaded_file: UploadFile = File(...)):
    try:
        if not email:
            raise HTTPException(status_code=422, detail="Email is required")

        folder_path = "image_storage/stored_images"
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)
        
        file_location = f"{folder_path}/{email}.jpg"  # Assuming the image is a JPG file

        contents = await uploaded_file.read()

        with open(file_location, "wb") as file_object:
            file_object.write(contents)
        
        return {"info": f"File '{uploaded_file.filename}' saved at '{file_location}'"}
    
    except Exception as e:
        error_detail = str(e)
        print("Error:", error_detail)
        raise HTTPException(status_code=500, detail=error_detail)

# Run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9020)
