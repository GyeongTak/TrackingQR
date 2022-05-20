from xml.dom import ValidationErr
from attr import field
from rest_framework.authtoken.models import Token
from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from users.models import *
from .models import *
from django.forms import ValidationError

class EmptySerializer(serializers.Serializer):
    pass

class CommissionSerializer(serializers.ModelSerializer):

    class Meta:
         model = Commission
         fields = '__all__'
        #  read_only_fields = ('id', 'is_client')
    
    # def get_panorama_image(self,obj):
    def validate_title(self, value):
        if value=='' or len(value)> 30 :
            raise ValidationError('Not Validate title')
        return value        

class CommissionViewSerializer(serializers.ModelSerializer):
    brief_description = serializers.SerializerMethodField()
    class Meta :
        model = Commission
        fields = ('title', 'created','brief_description','budget','finish_date','request_count')
    def get_brief_description(self, obj) :
        return obj.description[:50] 
        # description 을 50 글자만 표시할 수 있도록 바꾼다.
        



