from rest_framework import serializers
from .models import customerReview


class PopolSerializer(serializers.ModelSerializer):
    class Meta :
        model = customerReview
        fields = '__all__'
