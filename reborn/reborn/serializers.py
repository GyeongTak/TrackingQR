from dataclasses import field
from msilib.schema import Class
from pydoc import describe
from django.forms import ValidationError
from nbformat import read
from rest_framework import serializers
from users.models import User,Designer,Client
from userReview.models import customerReview

class designerSerializer(serializers.ModelSerializer):
    class Meta : 
        model = Designer
        fields = ['profile_image','username', 'average_stars']

class reviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='client.username')
    class Meta :
        model = customerReview
        fields = ['image','client','username','description', 'score']
