from dataclasses import field
from rest_framework import serializers
from . models import DesignerPopol

class PopolSerializer(serializers.ModelSerializer):
    class Meta :
        model = DesignerPopol
        fields = '__all__'

    def validate_title(self, value):
        if value=='':
            raise ValidationError('제목은 필수 항목입니다.')
        return value


class PopolTestSerializer(serializers.ModelSerializer):
    class Meta :
        model = DesignerPopol
        exclude = ('user', )
