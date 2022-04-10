from dataclasses import field
from rest_framework import serializers
from . models import DesignerPopol

class PopolSerializer(serializers.ModelSerializer):
    class Meta :
        model = DesignerPopol
        fields = '__all__'