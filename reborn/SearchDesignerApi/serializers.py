from dataclasses import field
from pydoc import describe
from django.forms import ValidationError
from nbformat import read
from rest_framework import serializers
from . models import DesignerPopol
from usersApi.models import User,Designer,Client

class PopolSerializer(serializers.ModelSerializer):
    class Meta :
        model = DesignerPopol
        fields = '__all__'

    def validate_title(self, value):
        if value=='':
            raise ValidationError('제목은 필수 항목입니다.')
        return value

class BriefPopolSerializer(serializers.ModelSerializer):
    class Meta : 
        model = DesignerPopol
        fields = ['portfolio_image','title','created','designer']


class DesignerSerializer(serializers.ModelSerializer):
    user = serializers.RelatedField(read_only=True)
    class Meta :
        model = Designer
        fields = ['phone','skills','description','user']

class ClientSerializer(serializers.ModelSerializer):
    class Meta :
        model = Client
        fields = '__all__'

class DesignerProfileSerializer(serializers.ModelSerializer) :
    # employer  = ClientSerializer(many=False,read_only=True)

    class Meta:
        model = Designer
        fields = ['username','email','skills','phone','description','skills']

class ClientProfileSerializer(serializers.ModelSerializer) :
    #popols = serializers.RelatedField(many=True,read_only=True)
    designer = DesignerSerializer(read_only=True)
    # employer  = ClientSerializer(many=False,read_only=True)

    class Meta:
        model = User
        fields = ['username','email','designer']


# class PopolTestSerializer(serializers.ModelSerializer):
#     class Meta :
#         model = DesignerPopol
#         # exclude = ('user', )
