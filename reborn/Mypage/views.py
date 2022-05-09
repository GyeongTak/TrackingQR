from django.shortcuts import render
from SearchDesignerApi.models import DesignerPopol
from SearchDesignerApi.serializers import BriefPopolSerializer
from rest_framework.response import Response
from usersApi.api.permissions import isDesignerUser
from rest_framework import  status
from usersApi.models import *


from SearchDesignerApi.serializers import PopolSerializer, DesignerProfileSerializer, ClientProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request, format=None):
    user = User.objects.get(auth_token = request.auth)
    if user.is_client == True :
        tmpuserProfile = Client.objects.get(auth_token = request.auth)
        userserializer = ClientProfileSerializer(tmpuserProfile,many= False)
    else :
        tmpuserProfile = Designer.objects.get(auth_token = request.auth)
        userserializer = DesignerProfileSerializer(tmpuserProfile,many= False)
    
    return Response(userserializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def detail_my_portfolio(request,pk) :
    Popol = DesignerPopol.objects.get(pk = pk)
    serializer = PopolSerializer(Popol, many = False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_portfolio(request,pk) :
    portforlio = DesignerPopol.objects.get(pk=pk)
    portforlio.delete()
    return Response(status=status.HTTP_200_OK)





