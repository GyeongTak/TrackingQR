from jupyter_client import protocol_version_info
from rest_framework.authtoken.models import Token

from rest_framework import viewsets,status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from rest_framework.decorators import api_view

from rest_framework import generics , status


from portfolio.models import DesignerPopol,Projects,Certificate, EducationAndCareer
from Mypage import serializers
from .serializers import BriefProjectSerializer, PopolSerializer,BriefPopolSerializer,CertificateSerializer, EduAndCareerSerializer, ProjectSerializer
from rest_framework import status

from users.models import *


class PortfolioViewSet(viewsets.GenericViewSet):
    @action(methods=['GET'],permission_classes=[AllowAny, ], detail=False)
    def portfolio_view(self, request):
        ListPopol = DesignerPopol.objects.all()
           
        briefportfolio = BriefPopolSerializer(ListPopol, many = True)

        for i in range(0,len(briefportfolio.data)) :
            if len(briefportfolio.data[i]['projects']) > 3 :
                briefportfolio.data[i]['projects'] = briefportfolio.data[i]['projects'][:3]
        
        return Response(briefportfolio.data, status = status.HTTP_200_OK)

    @action(methods=['GET'], permission_classes=[AllowAny, ], detail=False)
    def portfolio_view_detail(self, request, pk):
    
        Popol = DesignerPopol.objects.get(id = pk)
        serializer_popol = PopolSerializer(Popol, many = False)

        certifits = Certificate.objects.filter(portfolio= Popol)
        serializer_certificate = CertificateSerializer(certifits, many= True)

        eduandcareers = EducationAndCareer.objects.filter(portfolio= Popol)
        serializer_educareer = EduAndCareerSerializer(eduandcareers, many=True)

        projects = Projects.objects.filter(portfolio= Popol)
        serializer_projects = ProjectSerializer(projects, many=True)

        
        return Response(
            serializer_popol.data , {
                'certificates ' : serializer_certificate.data,
                'educationandcareer' : serializer_educareer.data ,
                'projects' : serializer_projects.data ,
            }
            , status = status.HTTP_200_OK
        )


    # Parsers in Django REST are used to parse the content of incoming HTTP request.
    # 보낼때는 serializer
    @action(methods=['POST'], permission_classes = [IsAuthenticated, ], detail=False)
    def create_portfolio(self, request):
        designer = Designer.objects.get(id = request.user.id)

        if request.user.is_client == False :

                newPortfolio = DesignerPopol(
                    designer = designer,
                    description = request.data['content']
                )
                newPortfolio.save()

                for i in request.data['certificates'] :
                    newCertificate = Certificate(
                        portfolio = newPortfolio,
                        acquired_date = i['acquired_period'],
                        certificate_name = i['certificate_name'],
                        time = i['time']
                    )
                    newCertificate.save()

                for j in request.data['educationcareers'] :
                    newEducationAndCareer = EducationAndCareer(
                        portfolio = newPortfolio,
                        working_period = j['working_period'],
                        company_name = j['company_name'],
                        description = j['job_position']
                    )
                    newEducationAndCareer.save()
            
                return Response({'result':'success', 'message': '성공적으로 등록되었습니다.'}, status=status.HTTP_201_CREATED) #json?
            

            # # except:
            #     
        else :
            return Response({'result':'fail', 'message': '디자이너가 아니십니다'}, status=status.HTTP_404_NOT_FOUND)

class ProjectViewSet(viewsets.GenericViewSet) :
    @action(methods=['POST'],permission_classes=[IsAuthenticated, ], detail=False)
    def create_project(self, request):
        tmpdesigner= Designer.objects.get(id = request.user.id)
        tmpportfolio = DesignerPopol.objects.get(designer= tmpdesigner)
        serializer = ProjectSerializer(request.data)
        serializer.is_valid(raise_exception=True)

        if request.user.is_client == False :
            newProject = Projects(
                title = request.data['title'],
                description = request.data['description'],
                participation_date = request.data['participation_date'],
                portfolio = tmpportfolio,
       
            )
            newProject.save()
        
        return Response({'message': 'success'}, status=status.HTTP_200_OK)

    def image_handler(self,request) :
        print( request.FILE  )

    

        




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
