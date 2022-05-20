from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics , status, viewsets

from rest_framework.permissions import AllowAny
from rest_framework.decorators import action

from client_commission.models import *

from django.core.exceptions import ImproperlyConfigured

from . import serializers

from .models import customerReview

from PIL import Image
import numpy as np
import argparse
import imutils
from imutils import paths
import cv2
import math
import os
#from .serializer import BriefReviewSerializer



class AuthViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny, ]
    serializer_class = serializers
    serializer_classes = {
        'create_review': serializers.ReviewSerializer,

    }
    
    @action(methods=['POST', ], detail=False)
    def create_review(self, request):
        tmpcommission = Commission.objects.get(id = request.data['commission_id'])
        if request.user.is_client() and tmpcommission.status == 2 :
            images = []
            images = request.data['images'].split(',')
            print("[INFO] switching images...")
            stitcher = cv2.createStitcher() if imutils.is_cv3() else cv2.Stitcher_create()
            (status, stitched) = stitcher.stitch(images)

            if status == 0:
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

        newReview = customerReview(
            client_id = request.user.id,
            designer_id = tmpcommission.designer_id,
            title = serializer.validated_data['title'],
            image = stitched,
            description=request.data['description'],
        )
        newReview.save()
        return Response(status=status.HTTP_200_OK)

            
        
    def get_serializer_class(self):
        if not isinstance(self.serializer_classes, dict):
            raise ImproperlyConfigured("serializer_classes should be a dict mapping.")

        if self.action in self.serializer_classes.keys():
            return self.serializer_classes[self.action]
        return super().get_serializer_class()

        