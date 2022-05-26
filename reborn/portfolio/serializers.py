from dataclasses import field
from pydoc import describe
from django.forms import ValidationError
from matplotlib import projections
from nbformat import read
from rest_framework import serializers
from sklearn.metrics import average_precision_score
from . models import DesignerPopol,Projects
from users.models import User,Designer,Client

class PopolSerializer(serializers.ModelSerializer):
    class Meta :
        model = DesignerPopol
        fields = '__all__'

    def validate_title(self, value):
        if value=='':
            raise ValidationError('제목은 필수 항목입니다.')
        return value


class BriefProjectSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Projects
        field = ['title', 'score']

class BriefPopolSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='designer.username')
    profile_image = serializers.ImageField(source = 'designer.profile_image')
    skills = serializers.CharField(source='designer.skills')
    average_stars = serializers.IntegerField(source = 'designer.average_stars')
    projects =  BriefProjectSerializer(many=True, read_only=True)
    class Meta : 
        model = DesignerPopol
        fields = ['username','profile_image','skills','average_stars','description','projects']





class DesignerProfileSerializer(serializers.ModelSerializer) :
    # employer  = ClientSerializer(many=False,read_only=True)

    class Meta:
        model = Designer
        fields = ['username','email','skills','phone','description','skills','average_stars']

class ClientProfileSerializer(serializers.ModelSerializer) :
    #popols = serializers.RelatedField(many=True,read_only=True)
    #designer = DesignerSerializer(read_only=True)
    # employer  = ClientSerializer(many=False,read_only=True)

    class Meta:
        model = User
        fields = ['username','email']


# class PopolTestSerializer(serializers.ModelSerializer):
#     class Meta :
#         model = DesignerPopol
#         # exclude = ('user', )
