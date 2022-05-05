from rest_framework import serializers
from usersApi.models import User,Designer,Client

class DesignerSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Designer
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Client
        fields = '__all__'        

class DesignerSignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type":"password"}, write_only = True)
    class Meta :
        model = Designer
        fields = ['username','email','password','password2','phone','skills','description']
        extra_kwargs={
            'password':{'write_only' : True}
        }
    def save(self, **kwargs):
        user = Designer(
            username = self._validated_data['username'],
            email = self._validated_data['email'],
            phone = self._validated_data['phone'],
            skills = self._validated_data['skills'],
            description = self._validated_data['description']
        )
        password = self._validated_data['password'],
        password2 = self._validated_data['password2'],

        if password != password2 :
            raise serializers.ValidationError({"error":"password do notmatch"})
        user.set_password(self.validated_data['password'])
        user.is_Designer = True
        user.save()
        #Designer.objects.create(user=user)
        return user


class ClientSignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type":"password"}, write_only = True)
    class Meta :
        model = Client
        fields = ['username','email','password','password2','company_name','phone','description']
        extra_kwargs={
            'password':{'write_only' : True}
        }

    def save(self, **kwargs):
        user = Client(
            username = self._validated_data['username'],
            email = self._validated_data['email'],
            company_name = self._validated_data['company_name'],
            phone = self._validated_data['phone'],
            description = self._validated_data['description']
        )
        password = self._validated_data['password'],
        password2 = self._validated_data['password2'],

        if password != password2 :
            raise serializers.ValidationError({"error":"password do not match"})
        user.set_password(self._validated_data['password'])
        user.is_client = True
        user.save()
        # Client.objects.create(user=user)
        return user


