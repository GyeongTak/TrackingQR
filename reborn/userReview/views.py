from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from client_commission.models import *

from django.core.exceptions import ImproperlyConfigured

from users.models import DesignerReview, Designer, Message

from .serializers import ReviewSerializer

from .models import customerReview
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from PIL import Image
import numpy as np
import argparse
import imutils
from imutils import paths
import cv2
import math
import os

from reborn import settings

MEDIA_ROOT = settings.MEDIA_ROOT
#from .serializer import BriefReviewSerializer


# @api_view(['GET'])
# @permission_classes([AllowAny, ])

    
@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def create_review(self, request):
    tmpcommission = Commission.objects.get(id = request.data['commission_id'])
    tmpdesigner = Designer.objects.get(id = tmpcommission.designer.id)
    user = Designer.objects.get(id = tmpcommission.designer.id)

    if request.user.is_client == True and tmpcommission.status == 2:
        if request.data['is_panorama'] == 'true' :
            image = request.data.getlist('images')[0]
            # print(image)
        else :
            images = []
            images = request.data.getlist('images')
            os.mkdir(MEDIA_ROOT +'/temp'+str(request.user.id))
            for i in images :
                filename_and_path= MEDIA_ROOT +'/temp'+str(request.user.id)+'/'+ str(i)
                path = default_storage.save(filename_and_path, ContentFile(i.read()))   

            
            print("[INFO] loading images...")
            imagePaths = sorted(list(paths.list_images(MEDIA_ROOT +'/temp'+str(request.user.id))))
            raw_images = []

            for imagePath in imagePaths :
                img= cv2.imread(imagePath)
                img = cv2.resize(img, dsize=(1000, 1000))
                raw_images.append(img)
                
            print("[INFO] switching images...")
            stitcher = cv2.createStitcher() if imutils.is_cv3() else cv2.Stitcher_create()
            (tmpstatus, stitched) = stitcher.stitch(raw_images)
            if tmpstatus == 0:
                # write the output stitched image to disk

                # display the output stitched image to our screen
                cv2.imshow("Stitched", stitched)
                cv2.waitKey(0)
            else:
                if tmpstatus == cv2.STITCHER_ERR_NEED_MORE_IMGS:
                    print("[INFO] image stitching failed (1: STITCHER_ERR_NEED_MORE_IMGS)")
                    raise Exception("[INFO] image stitching failed (1: STITCHER_ERR_NEED_MORE_IMGS)")
                elif tmpstatus == cv2.STITCHER_ERR_HOMOGRAPHY_EST_FAIL:
                    print("[INFO] image stitching failed (2: STITCHER_ERR_HOMOGRAPHY_EST_FAIL)")
                    raise Exception("[INFO] image stitching failed (2: STITCHER_ERR_HOMOGRAPHY_EST_FAIL)")        
                else:
                    print("[INFO] image stitching failed (3: STITCHER_ERR_CAMERA_PARAMETERS_ADJUSTMENT_FAIL)")
                    raise Exception("[INFO] image stitching failed (3: STITCHER_ERR_CAMERA_PARAMETERS_ADJUSTMENT_FAIL)")

        image = ContentFile(stitched)
        
        newReview = customerReview(
            client = request.user,
            small_image = request.data['small_image'],
            panorama_image = image,
            designer = tmpcommission.designer,
            Commission = tmpcommission,
            score = request.data['score'],
            title = tmpcommission.title,
            description=request.data['description'],
        )
        
        newDesignerReview = DesignerReview(
            designer = tmpdesigner,
            review_text = request.data['designer_review'],
            score = request.data['designer_score']
        )
        

        newMessage = Message(
            user = user,
            message = "'" + str(newReview.title) +"'" + '의뢰에 대한 후기가 작성되었습니다.', 
        )

        newReview.save()
        newDesignerReview.save()
        newMessage.save()
        return Response(status=status.HTTP_200_OK)
            
        
        