from email.policy import HTTP
from http import client
from django.shortcuts import render
from portfolio.models import DesignerPopol
from portfolio.serializers import BriefPopolSerializer
from rest_framework.response import Response
from rest_framework import  status
from users.models import *
from userReview.models import customerReview
from client_commission.models import Commission
from client_commission.serializers import CommissionSerializer

from portfolio.serializers import PopolSerializer, DesignerProfileSerializer, ClientProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .serializers import  MyCommissionBriefSerializer,MyCommissionSerializer, MyReviewBriefSerialzier

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request, format=None):
    if request.user.is_client == True :
        client = Client.objects.get(id = request.user.id)
        tmpuserProfile = Client.objects.get(id = request.user.id)
        userserializer = ClientProfileSerializer(tmpuserProfile,many= False)

        my_commission  = Commission.objects.filter(client = tmpuserProfile)
        my_commissionSerializer =  MyCommissionBriefSerializer(my_commission, many= True)
        
        my_review = customerReview.objects.filter(client= client)
        my_reviewSerializer = MyReviewBriefSerialzier(my_review, many = True)

        return Response({
            'user' : userserializer.data,
            'commissions' : my_commissionSerializer.data,
            'reviews' :  my_reviewSerializer.data
        })

    else :
        tmpuserProfile = Designer.objects.get(auth_token = request.auth)
        userserializer = DesignerProfileSerializer(tmpuserProfile,many= False)
        
        portfolio = DesignerPopol.objects.get(designer =tmpuserProfile )

        part_in_commission = Commission.objects.get(id = tmpuserProfile.prccessing_commission_id )
        return Response(
           userserializer.data,
            {
                'portfolio' : portfolio,
                'part_in_commission':part_in_commission
            }
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyInfo(request, format=None):
    if request.user.is_client == True :
        tmpuserProfile = Client.objects.get(id = request.user.id)
        userserializer = ClientProfileSerializer(tmpuserProfile,many= False)

        my_commission  = Commission.objects.filter(client = tmpuserProfile)
        my_commissionSerializer =  MyCommissionBriefSerializer(my_commission, many= True)
        return Response(
            userserializer.data,
            my_commissionSerializer.data
        )

    else :
        tmpuserProfile = Designer.objects.get(auth_token = request.auth)
        userserializer = DesignerProfileSerializer(tmpuserProfile,many= False)
        return Response(
           userserializer.data,
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_my_commission(request,pk) :
    if request.user.is_client == True :
        commission = Commission.objects.get(id = pk)
        commission.delete()
        return Response(status=status.HTTP_200_OK)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def detail_my_portfolio(request,pk) :
    Popol = DesignerPopol.objects.get(id = pk)
    serializer = PopolSerializer(Popol, many = False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def detail_my_commission(request,pk) :
    commission = Commission.objects.get(id = pk)
    serializer = MyCommissionSerializer(commission, many = False)

    selected_designer={}
    for i in commission.request_designer_id :
        tmp = Designer.objects.get(id = i)
        selected_designer.append({'username':tmp.username,'id' :tmp.id})

    return Response(
        serializer.data,
        {
            'selected_designer':selected_designer
        }
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_portfolio(request,pk) :
    portforlio = DesignerPopol.objects.get(pk=pk)
    portforlio.delete()
    return Response(status=status.HTTP_200_OK)





