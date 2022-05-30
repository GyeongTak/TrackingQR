from importlib_metadata import MetadataPathFinder
from numpy import source
from rest_framework.authtoken.models import Token
from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from userReview.models import customerReview
from users.models import *
from client_commission.models import *

User = get_user_model()

class ClientUserSerializer(serializers.Serializer):
    class Meta :
        models = Client
        field = ('__all__')

class  MyReviewBriefSerialzier(serializers.Serializer) :
    brief_description = serializers.SerializerMethodField()
    class Meta :
        models = customerReview
        fields = ('score', 'small_image','designer_id','brief_description','title')
    def get_brief_description(self, obj) :
        return obj.description[:30] + '...'
        # description 을 30 글자만 표시할 수 있도록 바꾼다.

class  MyCommissionBriefSerializer(serializers.ModelSerializer) :
    brief_description = serializers.SerializerMethodField()
    class Meta :
        model = Commission
        fields = ('title', 'created','brief_description','budget','finish_date','request_count')
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

class EmptySerializer(serializers.Serializer):
    pass