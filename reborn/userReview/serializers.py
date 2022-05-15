from rest_framework import serializers
from .models import customerReview


class BriefReviewSerializer(serializers.ModelSerializer):
    class Meta :
        model = customerReview
        fields = ['title','customer_id','image','created']
