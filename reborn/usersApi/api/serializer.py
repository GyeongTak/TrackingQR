from rest_framework import serializers
from usersApi.models import User,Designer,Client

class UserSerializer(serializers.ModelSerializer) :
    class Meta :
        model = User
        fields = '__all__'

class DesignerSignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type":"password"}, write_only = True)
    class Meta :
        model = User
        fields = ['username','email','password','password2']
        extra_kwargs={
            'password':{'write_only' : True}
        }
    def save(self, **kwargs):
        user = User(
            username = self._validated_data['username'],
            email = self._validated_data['email'],
        )
        password = self._validated_data['password'],
        password2 = self._validated_data['password2'],

        if password != password2 :
            raise serializers.ValidationError({"error":"password do notmatch"})
        user.set_password(self.validated_data['password'])
        user.is_Designer = True
        user.save()
        Designer.objects.create(user=user)
        return user


class ClientSignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type":"password"}, write_only = True)
    class Meta :
        model = User
        fields = ['username','email','password','password2']
        extra_kwargs={
            'password':{'write_only' : True}
        }

    def save(self, **kwargs):
        user = User(
            username = self._validated_data['username'],
            email = self._validated_data['email']
        )
        password = self._validated_data['password'],
        password2 = self._validated_data['password2'],

        if password != password2 :
            raise serializers.ValidationError({"error":"password do not match"})
        user.set_password(self._validated_data['password'])
        user.is_client = True
        user.save()
        Client.objects.create(user=user)
        return user


