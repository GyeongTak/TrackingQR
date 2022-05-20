from rest_framework import serializers
from .models import customerReview

class EmptySerializer(serializers.Serializer):
    pass

class ReviewSerializer(serializers.ModelSerializer):
    class Meta :
        model = customerReview
        fields = ['title','customer_id','image','created']
    
    def validated_(self):
        return super().validated_data
