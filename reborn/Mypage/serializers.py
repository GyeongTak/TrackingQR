
from urllib.request import Request
from attr import field
from numpy import source
from rest_framework.authtoken.models import Token
from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from django.db import models
from userReview.models import customerReview
from users.models import Client, Designer, User
from client_commission.models import *
import datetime

class ClientUserSerializer(serializers.ModelSerializer):
    class Meta :
        model = Client
        fields = ('username','email','phone','company_name','description','profile_image')

class  MyReviewBriefSerialzier(serializers.ModelSerializer) :
    brief_description = serializers.SerializerMethodField()
    
    class Meta :
        model = customerReview
        fields = ('score', 'small_image','designer_id','brief_description','title')
    def get_brief_description(self, obj) :
        return obj.description[:30] + '...'
        # description 을 30 글자만 표시할 수 있도록 바꾼다.

class RequestedDesignerSerializer(serializers.ModelSerializer) :
    designer_username = serializers.CharField(source='designer.username')
    designer_average_stars = serializers.FloatField(source='designer.average_stars')
    designer_id = serializers.IntegerField(source = 'designer.id')
    class Meta  :
        model = RequestedDesigner
        fields = ('designer_username','designer_average_stars','designer_id')

class  MyCommissionBriefSerializer(serializers.ModelSerializer) :
    brief_description = serializers.SerializerMethodField()
    request_designer = RequestedDesignerSerializer(many=True, read_only=True)
    class Meta :
        model = Commission
        fields = ('id','title', 'created','brief_description','budget','finish_date','small_image','request_designer','deadline')
    def get_brief_description(self, obj) :
        return obj.description[:50] 
        # description 을 50 글자만 표시할 수 있도록 바꾼다.


class MyCommissionSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Commission
        fields = ('__all__')


class CommissionSerializer(serializers.ModelSerializer):
    auth_token = serializers.SerializerMethodField()

    class Meta:
         model = User
         fields = ('id', 'username','is_client','auth_token')
         read_only_fields = ('id', 'is_client')
    
    def get_auth_token(self, obj):
        try:
            token = Token.objects.get(user=obj)

        except Token.DoesNotExist:
            token = Token.objects.create(user=obj)

        return token.key
#---------------------------------------------------------------------

class DesignerUserSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Designer
        fields = ['username','email','phone','skills','description','profile_image','average_stars']

class PartInCommissionSerializer(serializers.ModelSerializer) :
    client_phone = serializers.CharField(source='client.phone')
    client_username = serializers.CharField(source='client.username')
    client_company_name = serializers.CharField(source='client.company_name')
    class Meta :
        model = Commission
        fields = ['client_username','client_company_name','client_phone','title','budget','small_image','updated']

class EndCommissionSerializer(serializers.ModelSerializer) :
    client_username = serializers.CharField(source='client.username')
    client_company_name = serializers.CharField(source='client.company_name')
    class Meta :
        model = Commission
        fields = ['client_username','client_company_name','title','budget','small_image','updated'] # 여기서 updated 는 마지막으로 수정 날짜 즉, 이 커미션이 종료된 날짜이다


class EmptySerializer(serializers.Serializer):
    pass