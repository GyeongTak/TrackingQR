from PIL import Image
import numpy as np
import argparse
import imutils
from imutils import paths
import cv2
import math
import os

from google.colab.patches import cv2_imshow

"""
파일 이미지 1MB 아래로 맞추는 resize 함수
"""
# def resize(filename) :
#     img =cv2.imread(filename)
#     width, height = img.shape[:2]
#     if height * width *3 <=2**25:
#         return img
#     i =2
#     t_height,t_width = height, width

#     while t_height * t_width * 3 >2**25 :
#         t_height = int(t_height / math.sqrt(i))
#         t_width = int(t_width / math.sqrt(i))  
#         i += 1
    
#     height,width = t_height, t_width
#     image = Image.open(filename)
#     resize_image = image.resize((height,width))
#     filename = filename[:-1 * (len(filename.split(".")[-1])+1)] + "_resized." + filename.split(".")[-1]
#     resize_image.save(filename)
#     img = cv2.imread(filename)
#     os.system("del " + filename.replace("/","\\"))

ap = argparse.ArgumentParser()
ap.add_argument("-i","--images", type = str, required= True, help = "path to input directory of images to switch")
ap.add_argument("-o","--output",type = str, required =True, help = "path to the output image")

args = vars(ap.parse_args())


print("[INFO] loading images...")
imagePaths = sorted(list(paths.list_images(args["images"])))
images = []

for imagePath in imagePaths :
    image = cv2.imread(imagePath)
    image = cv2.resize(image, dsize=(300, 300))
    print(image.shape)
    # cv2.imshow('dd',image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    images.append(image)


print("[INFO] switching images...")
stitcher = cv2.createStitcher() if imutils.is_cv3() else cv2.Stitcher_create()
(status, stitched) = stitcher.stitch(images)

if status == 0:
    # write the output stitched image to disk
    # cv2.imwrite(args["output"], stitched)

    # display the output stitched image to our screen
    cv2_imshow(stitched)
    cv2.waitKey(0)
else:
    if status == cv2.STITCHER_ERR_NEED_MORE_IMGS:
        print("[INFO] image stitching failed (1: STITCHER_ERR_NEED_MORE_IMGS)")
    elif status == cv2.STITCHER_ERR_HOMOGRAPHY_EST_FAIL:
        print("[INFO] image stitching failed (2: STITCHER_ERR_HOMOGRAPHY_EST_FAIL)")
    else:
        print("[INFO] image stitching failed (3: STITCHER_ERR_CAMERA_PARAMETERS_ADJUSTMENT_FAIL)")
