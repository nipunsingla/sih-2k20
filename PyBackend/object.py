from imageai.Detection import ObjectDetection
import os
import cv2

execution_path = os.getcwd()

detector = ObjectDetection()
detector.setModelTypeAsRetinaNet()
detector.setModelPath( os.path.join(execution_path , "resnet50_coco_best_v2.0.1.h5"))
detector.loadModel()
cap = cv2.VideoCapture('video1.mp4')
while True:
    # reads frames from a video
    ret, frames = cap.read()
    if ret is None:
        break
    cv2.imwrite("imgg.jpg",frames)

    detections = detector.detectObjectsFromImage(input_image=os.path.join(execution_path, "imgg.jpg"), output_image_path=os.path.join(execution_path, "imagenew.jpg"))
    for eachObject in detections:
        print(eachObject["name"], " : ", eachObject["percentage_probability"])