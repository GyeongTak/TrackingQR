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

from reborn.client_commission.models import Commission
from .serializers import *

from PIL import Image
import numpy as np
import argparse
import imutils
from imutils import paths
import cv2
import math
import os


User = get_user_model()

class CommissionViewSet(viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated, ]
    serializer_class = serializers.EmptySerializer
    serializer_classes = {
        'create_commission': serializers.CommissionSerializer,
        'commission_view' : serializers.CommissionViewSerializer,
        'commission_view_detail' : serializers.CommissionSerializer
        
    }   

    @action(methods=['POST'], detail=False)
    def create_commission(self, request):
        if request.user.is_client() :
            images = []
            images = request.data['images'].split(',')
            print("[INFO] switching images...")
            stitcher = cv2.createStitcher() if imutils.is_cv3() else cv2.Stitcher_create()
            (status, stitched) = stitcher.stitch(images)

            if status == 0:
                # write the output stitched image to disk

                # display the output stitched image to our screen
                cv2.imshow("Stitched", stitched)
                cv2.waitKey(0)
            else:
                if status == cv2.STITCHER_ERR_NEED_MORE_IMGS:
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
            
            newCommission = Commission(
                title=serializer.validated_data['title'],
                client_id = request.user.id,
                budget = request.data['budget'],
                committion_image = stitched,
                finish_date = request.data['finish_date'] ,
                description=request.data['description'],
            )
            newCommission.save()

            return Response(status.HTTP_200_OK)
        else :
            Response({'message' : "Cannot create commission"}, status= status.HTTP_401_UNAUTHORIZED)

    @action(methods=['GET'],permission_classes=[AllowAny, ])
    def commision_view(self, request):
        ListCommision = Commission.objects.get(status = 0) #아직 의뢰가 수락되지 않은 상태의 모든 의뢰 조회
        serializer = self.get_serializer_class(ListCommision)

        return Response(serializer.data, status = status.HTTP_200_OK)


    @action(methods=['GET'],permission_classes=[AllowAny, ])
    def commision_view_detail(self,request) :
        commission = Commission.objects.get(id = request.pk)
        serializer = self.get_serializer(commission)
        return Response(serializer.data , status= status.HTTP_200_OK)


    def get_serializer_class(self):
        if not isinstance(self.serializer_classes, dict):
            raise ImproperlyConfigured("serializer_classes should be a dict mapping.")

        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()
