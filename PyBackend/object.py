from imageai.Detection import ObjectDetection
import warnings
warnings.filterwarnings('ignore')
import cv2
import numpy as np
import os
from scipy import ndimage,misc
import DetectChars
import DetectPlates
import PossiblePlate
from PIL import Image


numbers = {}

# module level variables ##########################################################################
SCALAR_BLACK = (0.0, 0.0, 0.0)
SCALAR_WHITE = (255.0, 255.0, 255.0)
SCALAR_YELLOW = (0.0, 255.0, 255.0)
SCALAR_GREEN = (0.0, 255.0, 0.0)
SCALAR_RED = (0.0, 0.0, 255.0)

showSteps = False

###################################################################################################
def number_plate(imgOriginalScene):
    # imgOriginalScene = Image.fromarray(imgOriginalScene, 'RGB')
    blnKNNTrainingSuccessful = DetectChars.loadKNNDataAndTrainKNN()
    if blnKNNTrainingSuccessful == False:
        print("\nerror: KNN traning was not successful\n")
        return
    # imgOriginalScene  = cv2.imread("1.png")
    if imgOriginalScene is None:
        print("\nerror: image not read from file \n\n")
        # os.system("pause")
        return

    listOfPossiblePlates = DetectPlates.detectPlatesInScene(imgOriginalScene)

    listOfPossiblePlates = DetectChars.detectCharsInPlates(listOfPossiblePlates)

    # cv2.imshow("imgOriginalScene", imgOriginalScene)

    if len(listOfPossiblePlates) == 0:
        print("\nno license plates were detected\n")
    else:
        listOfPossiblePlates.sort(key = lambda possiblePlate: len(possiblePlate.strChars), reverse = True)

                # suppose the plate with the most recognized chars (the first plate in sorted by string length descending order) is the actual plate
        licPlate = listOfPossiblePlates[0]

        # cv2.imshow("imgPlate", licPlate.imgPlate)
        # cv2.imshow("imgThresh", licPlate.imgThresh)

        if len(licPlate.strChars) == 0:
            print("\nno characters were detected\n\n")
            return

        drawRedRectangleAroundPlate(imgOriginalScene, licPlate)

        if len(licPlate.strChars)>1:
            print("\nlicense plate read from image = " + licPlate.strChars + "\n")
            print("----------------------------------------")
            #print(licPlate.strChars)

        writeLicensePlateCharsOnImage(imgOriginalScene, licPlate)

        # cv2.imshow("imgOriginalScene", imgOriginalScene)

        # cv2.imwrite("imgOriginalScene.png", imgOriginalScene)
    return
###################################################################################################
def drawRedRectangleAroundPlate(imgOriginalScene, licPlate):

    p2fRectPoints = cv2.boxPoints(licPlate.rrLocationOfPlateInScene)

    cv2.line(imgOriginalScene, tuple(p2fRectPoints[0]), tuple(p2fRectPoints[1]), SCALAR_RED, 2)
    cv2.line(imgOriginalScene, tuple(p2fRectPoints[1]), tuple(p2fRectPoints[2]), SCALAR_RED, 2)
    cv2.line(imgOriginalScene, tuple(p2fRectPoints[2]), tuple(p2fRectPoints[3]), SCALAR_RED, 2)
    cv2.line(imgOriginalScene, tuple(p2fRectPoints[3]), tuple(p2fRectPoints[0]), SCALAR_RED, 2)

###################################################################################################
def writeLicensePlateCharsOnImage(imgOriginalScene, licPlate):
    ptCenterOfTextAreaX = 0
    ptCenterOfTextAreaY = 0
    ptLowerLeftTextOriginX = 0
    ptLowerLeftTextOriginY = 0

    sceneHeight, sceneWidth, sceneNumChannels = imgOriginalScene.shape
    plateHeight, plateWidth, plateNumChannels = licPlate.imgPlate.shape

    intFontFace = cv2.FONT_HERSHEY_SIMPLEX
    fltFontScale = float(plateHeight) / 30.0
    intFontThickness = int(round(fltFontScale * 1.5))

    textSize, baseline = cv2.getTextSize(licPlate.strChars, intFontFace, fltFontScale, intFontThickness)
    ( (intPlateCenterX, intPlateCenterY), (intPlateWidth, intPlateHeight), fltCorrectionAngleInDeg ) = licPlate.rrLocationOfPlateInScene

    intPlateCenterX = int(intPlateCenterX)
    intPlateCenterY = int(intPlateCenterY)

    ptCenterOfTextAreaX = int(intPlateCenterX)

    if intPlateCenterY < (sceneHeight * 0.75):
        ptCenterOfTextAreaY = int(round(intPlateCenterY)) + int(round(plateHeight * 1.6))
    else:
        ptCenterOfTextAreaY = int(round(intPlateCenterY)) - int(round(plateHeight * 1.6))

    textSizeWidth, textSizeHeight = textSize

    ptLowerLeftTextOriginX = int(ptCenterOfTextAreaX - (textSizeWidth / 2))
    ptLowerLeftTextOriginY = int(ptCenterOfTextAreaY + (textSizeHeight / 2))
    cv2.putText(imgOriginalScene, licPlate.strChars, (ptLowerLeftTextOriginX, ptLowerLeftTextOriginY), intFontFace, fltFontScale, SCALAR_YELLOW, intFontThickness)



execution_path = os.getcwd()

detector = ObjectDetection()
detector.setModelTypeAsRetinaNet()
detector.setModelPath( os.path.join(execution_path , "resnet50_coco_best_v2.0.1.h5"))
detector.loadModel()
# cv2.imwrite("imgg.jpg", frames)
# cv2.imwrite("imgg.jpg",frames)
detections = detector.detectObjectsFromImage(input_image=os.path.join(execution_path, "shah.jpg"), output_image_path=os.path.join(execution_path, "imagenew.jpg"))
for eachObject in detections:
    if eachObject["name"] == "car":
        # cv2.imshow("Image",eachObject["box_image"])
        number_plate(eachObject["box_image"])
                # print(eachObject["color"])
            # save_image = Image.fromarray(eachObject["box_image"],'RGB')
            # save_image.save('my.png')
            # break
            # cv2.imwrite()
        #     save_image = misc.imread(eachObject["box_image"])

    # counter += 1