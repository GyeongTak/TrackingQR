from lib2to3.pgen2 import token
from pydoc import describe
from jupyter_client import protocol_version_info
from rest_framework.authtoken.models import Token

from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import generics , status


from portfolio.models import DesignerPopol
from portfolio.models import Certificate, EducationAndCareer
from .serializers import PopolSerializer,BriefPopolSerializer
from rest_framework import status

from users.models import *

import json


@api_view(['GET']) 
def PopolList(request) :
    ListPopol = DesignerPopol.objects.all()
    serializer = BriefPopolSerializer(ListPopol, many = True)
    return Response(serializer.data)

# @api_view(['GET'])
# def PopolSearch(request,pk) :
#     print(pk)
#     if self.request.
#         SearchResult = DesignerPopol.objects.all().filter(title__contains= pk)
#     serializer = PopolSerializer(SearchResult, many = True)
#     return Response(serializer.data)

@api_view(['GET'])
def PopolDetail(request,pk) :
    Popol = DesignerPopol.objects.get(id = pk)
    serializer = PopolSerializer(Popol, many = False)
    return Response(serializer.data)


# Parsers in Django REST are used to parse the content of incoming HTTP request.
# 보낼때는 serializer
@api_view(['POST'])
def createPortfolio(request): 
    designer = Designer.objects.get(id = request.user.id)
    print(json.stringify(request.data['certificates']) )#테스트 코드

    print(request.data['content'])
    print(designer.id)

    # request.data['certificates']
    # # certificates = []
    # # certificates = request.data['certificates'].split(',')
    # # educationAndcareers = []
    # # educationAndcareers = request.data['educationcareers'].split(',')

    # if request.user.is_client == False :

    #         newPortfolio = DesignerPopol(
    #             designer = designer,
    #             description = request.data['content']
    #         )
    #         newPortfolio.save()

    #         for i in certificates :
    #             newCertificate = Certificate(
    #                 portfolio = newPortfolio,
    #                 acquired_date = i.acquired_date,
    #                 certificate_name = i.certificate_name,
    #                 time = i.time
    #             )
    #             newCertificate.save()

    #         for j in educationAndcareers :
    #             newEducationAndCareer = EducationAndCareer(
    #                 portfolio = newPortfolio,
    #                 working_period = j.working_period,
    #                 company_name = j.company_name,
    #                 description = j.job_position
    #             )
    #             newEducationAndCareer.save()
           
    #         return Response({'result':'success', 'message': '성공적으로 등록되었습니다.'}, status=status.HTTP_201_CREATED) #json?
           

    #     # # except:
    #     #     
    # else :
    #     return Response({'result':'fail', 'message': '디자이너가 아니십니다'}, status=status.HTTP_404_NOT_FOUND)



# @api_view(['POST'])
# def updatePortfolio(request): 
#     try:
#         user = User.objects.get(user_id=request.data['userid'])
#     except:
#         return Response({'result':'fail', 'message': '존재하지 않는 사용자입니다.'}, status=status.HTTP_404_NOT_FOUND)

#     try:
#         portfolio = DesignerPopol.objects.get(id=request.data['id'])
#     except:
#         return Response({'result':'fail', 'message': '존재하지 않는 게시글 입니다.'}, status=status.HTTP_404_NOT_FOUND)

#     portfolio.title = request.data['title']
#     portfolio.description = request.data['description']
#     portfolio.image = request.data['image']
#     serializer = PopolTestSerializer(data=request.data) #request.data = querydict
    
#     if serializer.is_valid():
#         portfolio.save()
#     else:
#         print(serializer.errors)
#         return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

#     return Response({'result':'success', 'message': '성공적으로 수정되었습니다.'}, status=status.HTTP_201_CREATED) 

# #parameter로 
# @api_view(['DELETE'])
# def deletePortfolio(request, id): 

#     try:
#         portfolio = DesignerPopol.objects.get(id=id)
#     except:
#         return Response({'result':'fail', 'message': '존재하지 않는 게시글입니다.'}, status=status.HTTP_404_NOT_FOUND)

#     print(portfolio.delete())

#     return Response({'result':'success', 'message': '성공적으로 등록되었습니다.'}, status=status.HTTP_200_OK) 
