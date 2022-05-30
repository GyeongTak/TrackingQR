from http.client import ResponseNotReady
from pathlib import Path
from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.core.exceptions import ImproperlyConfigured

from client_commission.models import Commission
from users.models import Designer,Client
from .serializers import EmptySerializer,CommissionSerializer,CommissionSerializer,CommissionViewSerializer

from datetime import datetime


from PIL import Image
import numpy as np
import argparse
import imutils
from imutils import paths
import cv2
import math
import os

datetime_format = "%Y-%m-%d"
User = get_user_model()

class CommissionViewSet(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, ]
    serializer_class = EmptySerializer
    serializer_classes = {
        'create_commission': CommissionSerializer,
        'commission_view' : CommissionViewSerializer,
        'commission_view_detail' : CommissionSerializer
        
    }   

    @action(methods=['POST'], detail=False)
    def create_commission(self, request):
        print(request.data)
        print(request.data['images'][1])
        if request.user.is_client == True:
            if request.data['is_panorama'] == 'true' :
                image = request.data['images'][0]
            else :
                images = []
                for i in request.data['images'] :
                    images.append(i)
                print("[INFO] switching images...")
                stitcher = cv2.createStitcher() if imutils.is_cv3() else cv2.Stitcher_create()
                (tmpstatus, image) = stitcher.stitch(images)

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

            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            
            tmpClient = Client.objects.get(id = request.user.id)

            newCommission = Commission(
                client = tmpClient,
                title=serializer.validated_data['title'],
                small_image = request.data['small_image'],
                budget = request.data['budget'],
                commission_image = image,
                finish_date = int(request.data['finish_date']) ,
                deadline = request.data['deadline'],
                description=request.data['description'],
            )
            #newCommission.save()

            return Response({'message' : "Success"}, status = status.HTTP_200_OK)
        else :
            Response({'message' : "Cannot create commission"}, status= status.HTTP_401_UNAUTHORIZED)

    @action(methods=['GET'],permission_classes=[AllowAny, ],detail=False)
    def commission_view(self, request):
        ListCommision = Commission.objects.filter(current_status = 0) #아직 의뢰가 수락되지 않은 상태의 모든 의뢰 조회
        serializer = self.get_serializer_class(ListCommision, many=True)

        return Response(serializer.data, status = status.HTTP_200_OK)


    @action(methods=['GET'],permission_classes=[AllowAny, ],detail=False)
    def commission_view_detail(self,request) :
        commission = Commission.objects.get(id = request.pk)
        serializer = self.get_serializer(commission)
        return Response(serializer.data , status= status.HTTP_200_OK)

    @action(methods=['POST'], permission_classes=[IsAuthenticated,] ,detail=False)
    def commission_select_for_designer(self,request) :
        if request.user.is_client() :
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




    def get_serializer_class(self):
        if not isinstance(self.serializer_classes, dict):
            raise ImproperlyConfigured("serializer_classes should be a dict mapping.")

        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()
