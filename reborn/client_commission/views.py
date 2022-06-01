from tkinter import EW
from django.contrib.auth import get_user_model
from rest_framework import viewsets,status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.core.exceptions import ImproperlyConfigured

from client_commission.models import Commission
from client_commission.models import RequestedDesigner
from portfolio.models import DesignerPopol
from users.models import Designer,Client
from .serializers import EmptySerializer,CommissionSerializer,CommissionViewDetailSerializer,CommissionViewSerializer

from datetime import datetime
from rest_framework.decorators import api_view, permission_classes
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
import shutil
from reborn import settings

MEDIA_ROOT = settings.MEDIA_ROOT

datetime_format = "%Y-%m-%d"
User = get_user_model()

@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def create_commission(request):
    # for obj in request.data.getlist('images') :  
    # print(request.FILES)python
    if request.user.is_client == True:
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
            (tmpstatus, image) = stitcher.stitch(raw_images)
            shutil.rmtree(MEDIA_ROOT +'/temp'+str(request.user.id))
            if tmpstatus == 0:
                # write the output stitched image to disk

                # display the output stitched image to our screen
                cv2.imshow("Stitched", image)
                cv2.waitKey(0)
            else:
                if tmpstatus == cv2.STITCHER_ERR_NEED_MORE_IMGS:
                    print("[INFO] image stitching failed (1: STITCHER_ERR_NEED_MORE_IMGS)")
                    raise Exception("[INFO] image stitching failed (1: STITCHER_ERR_NEED_MORE_IMGS)")
                elif status == cv2.STITCHER_ERR_HOMOGRAPHY_EST_FAIL:
                    print("[INFO] image stitching failed (2: STITCHER_ERR_HOMOGRAPHY_EST_FAIL)")
                    raise Exception("[INFO] image stitching failed (2: STITCHER_ERR_HOMOGRAPHY_EST_FAIL)")        
                else:
                    print("[INFO] image stitching failed (3: STITCHER_ERR_CAMERA_PARAMETERS_ADJUSTMENT_FAIL)")
                    raise Exception("[INFO] image stitching failed (3: STITCHER_ERR_CAMERA_PARAMETERS_ADJUSTMENT_FAIL)")
        obj =request.data
        print(obj)
        serializer = CommissionSerializer(data=request.data, many=False)
        serializer.is_valid(raise_exception=True)
        
        tmpClient = Client.objects.get(id = request.user.id)

        # newCommission = Commission(
        #     client = tmpClient,
        #     title=serializer.validated_data['title'],
        #     small_image = request.data['small_image'],
        #     budget = request.data['budget'],
        #     commission_image = image,
        #     finish_date = int(request.data['finish_date']) ,
        #     deadline = request.data['deadline'],
        #     description=request.data['description'],
        # )
        # newCommission.save()

        return Response({'message' : "Success"}, status = status.HTTP_200_OK)
    else :
        Response({'message' : "Cannot create commission"}, status= status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([AllowAny, ])
def commission_view(request):
    ListCommision = Commission.objects.filter(current_status = 0).order_by('-created') #아직 의뢰가 수락되지 않은 상태의 모든 의뢰 조회
    serializer = CommissionViewSerializer(ListCommision, many=True)
    for i in range(0,len(serializer.data)) :
        serializer.data[i]['request_count'] = RequestedDesigner.objects.filter(commission = ListCommision[i]).count()
        #= RequestedDesigner.objects.filter(commission = ListCommision[i])
    return Response(serializer.data, status = status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def commission_select_for_designer(request,pk) :
    if request.user.is_client == False :
        commission = Commission.objects.get(id = pk)
        designer = Designer.objects.get(id = request.user.id)
        portfolio = DesignerPopol.objects.get(designer = designer)
        newRequestedDesigner = RequestedDesigner(
            commission = commission,
            designer = designer,
            message = request.data['message'],
            portfolio= portfolio
        )
        newRequestedDesigner.save()


@api_view(['GET'])
@permission_classes([AllowAny, ])
def commission_view_detail(request,pk) :
    commission = Commission.objects.get(id = pk)
    serializer = CommissionViewDetailSerializer(commission, many=False)
    request_count = RequestedDesigner.objects.filter(commission=commission).count()
    return Response({
        'commission' : serializer.data ,
        'request_count':request_count
        }, status= status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def commission_designer_selected_by_client(request) :
    if request.user.is_client == False :
        pass
    else :
        designer = Designer.objects.get(user= request.user)
        designer.prccessing_commission_id = request.data['commission_id']
        designer.save()

        commission = Commission.objects.get(id = request.data['commission_id'])
        commission.request_count+=1
        tmp_string= commission.requst_designer_id 
        tmp_string = str(request.user.id) +','+ tmp_string
        commission.request_designer_id = tmp_string
        commission.save()
        return Response(status=status.HTTP_200_OK)

