from email.policy import HTTP
import certifi
from django.shortcuts import render
from portfolio.models import DesignerPopol, Projects
from portfolio.serializers import BriefPopolSerializer,ClientProfileSerializer
from rest_framework.response import Response
from rest_framework import  status
from client_commission.models import RequestedDesigner
from portfolio.models import Certificate, EducationAndCareer
from portfolio.serializers import CertificateSerializer, EduAndCareerSerializer
from users.models import *
from userReview.models import customerReview
from client_commission.models import Commission
from client_commission.serializers import CommissionSerializer

from portfolio.serializers import PopolSerializer, DesignerProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .serializers import  PortfolioSerializer,ProjectSerializer,MyCommissionBriefSerializer,MyCommissionSerializer,MyReviewBriefSerialzier, ClientUserSerializer,DesignerUserSerializer,PartInCommissionSerializer,EndCommissionSerializer

import datetime

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request, format=None):
    if request.user.is_client == True :
        clientUser = Client.objects.get(id = request.user.id)
        userSerializer = ClientUserSerializer(clientUser, many=False)

        my_commission  = Commission.objects.filter(client = clientUser)
        my_commissionSerializer =  MyCommissionBriefSerializer(my_commission, many= True)        
        
        my_review = customerReview.objects.filter(client= clientUser)
        my_reviewSerializer = MyReviewBriefSerialzier(my_review, many = True)
        
        # if my_commission.messageflag == True :
        #     alarm = True;
        #     message = ''

        return Response({
            'user' : userSerializer.data,
            'commissions' : my_commissionSerializer.data,
            'reviews' :  my_reviewSerializer.data
        })

    else :
        designerUser = Designer.objects.get(id = request.user.id)
        userserializer = DesignerUserSerializer(designerUser,many= False)
        
        portfolio = DesignerPopol.objects.get(designer = designerUser )
        portfolioSerializer = PortfolioSerializer(portfolio, many= False)
        
        certificates = Certificate.objects.filter(portfolio = portfolio)
        certificateSerializer = CertificateSerializer(certificates, many= True)

        eduandcareers = EducationAndCareer.objects.filter(portfolio= portfolio)
        eduAndCareerSerializer = EduAndCareerSerializer(eduandcareers,many= True)

        partincommission = Commission.objects.filter(designer_id = request.user.id , current_status=2)
        partincommissionSerializer = PartInCommissionSerializer(partincommission, many=True)
        
        for i in partincommissionSerializer.data :
            tmp = datetime.datetime.now() - i['updated']
            i['updated'] = tmp

        endcommission = Commission.objects.filter(designer_id = request.user.id , current_status = 3)
        endcommissionSerializer = EndCommissionSerializer(endcommission, many=True)

        projects = Projects.objects.filter(portfolio = portfolio)
        projectSerializer = ProjectSerializer(projects, many=True)
        print(
             {
                'user' : userserializer.data,
                'portfolio' :portfolioSerializer.data,
                'part_in_commission':partincommissionSerializer.data,
                'projects' :projectSerializer.data,
                'end_commission' : endcommissionSerializer.data
            }
        )
        return Response(
           
            {
                'user' : userserializer.data,
                'portfolio' :portfolioSerializer.data,
                'certificates' : certificateSerializer.data,
                'educationandcareers' : eduAndCareerSerializer.data,
                'part_in_commission':partincommissionSerializer.data,
                'projects' :projectSerializer.data,
                'end_commission' : endcommissionSerializer.data
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





