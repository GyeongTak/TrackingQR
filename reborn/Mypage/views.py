from django.shortcuts import render
from portfolio.models import DesignerPopol
from portfolio.serializers import BriefPopolSerializer
from rest_framework.response import Response
from rest_framework import  status
from users.models import *


from portfolio.serializers import PopolSerializer, DesignerProfileSerializer, ClientProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request, format=None):
    if request.user.is_client == True :
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





