from jsonschema import ValidationError
from rest_framework import serializers
from .models import customerReview

class EmptySerializer(serializers.Serializer):
    pass

class ReviewSerializer(serializers.ModelSerializer):
    class Meta :
        model = customerReview
        fields = ['title','customer_id','image','created']
    
    def validated_title(self, value):
        if value == '' or len(value) > 50 :
            raise ValidationError("invalid title")
        return value 

    
