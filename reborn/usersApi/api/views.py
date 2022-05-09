from rest_framework.authtoken.models import Token
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import isClientUser, isDesignerUser

from rest_framework.authtoken.views import ObtainAuthToken

from .serializer import  DesignerSignupSerializer,DesignerSerializer,ClientSerializer,ClientSignupSerializer
from usersApi.api import serializer,permissions

from usersApi.models import Designer

class DesignerSignupView(generics.GenericAPIView):
    serializer_class = DesignerSignupSerializer
    def post(self, request, *args, **kwargs) :
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        
        # Designer.objects.create(
        #     phone = request.data["phone"],
        #     skills = request.data["skills"],
        #     description = request.data["description"]
        # )

        return Response({
            "designer" : DesignerSerializer(user,context=self.get_serializer_context()).data,
            #   "token" : Token.objects.get(user=user).key,
            "message" : "account create sucessfully...!",
        })

class ClientSignupView(generics.GenericAPIView):
    serializer_class = ClientSignupSerializer
    def post(self, request, *args, **kwargs) :
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.save()
        
        return Response({
            "Client" : ClientSerializer(user,context=self.get_serializer_context()).data,
            # "token" : Token.objects.get(user=user).key,
            "message" : "account create sucessfully...!",
        })


class CustomAuthToken(ObtainAuthToken):
    
    def post(self, request, *args, **kwargs) :
        serializer = self.serializer_class(data = request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user = user)
        print(type(request.auth))
        return Response({
            'token':token.key,
            'user_id':user.pk,
            'is_client':user.is_client,
        })

class LogoutView(APIView) :
    permission_classes = [permissions.IsAuthenticated]

    def post(self,request,format = None) :
        print(type(request.auth))
        request.auth.delete()
        return Response(status=status.HTTP_200_OK)

# class ClientOnlyView(generics.RetrieveAPIView):
#     permission_classes = [permissions.IsAuthenticated&isClientUser]
#     serializer_class = UserSerializer

#     def get_object(self):
#         return self.request.user

# class DesignerOnlyView(generics.RetrieveAPIView):
#     permission_classes = [permissions.IsAuthenticated&isDesignerUser]
#     serializer_class = UserSerializer

#     def get_object(self):
#         return self.request.user