from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import UserAccount
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('email', 'name', 'phone', 'firstname', 'lastname', 'middlename', 'avatar', 'is_partner')

        
class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['email', 'name', 'phone', 'firstname', 'lastname', 'middlename', 'avatar']

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        # Custom data you want to include
        data.update({'email': self.user.email})
        data.update({'name': self.user.name})
        data.update({'is_partner': self.user.is_partner})
        data.update({'firstname': self.user.firstname})
        data.update({'middlename': self.user.middlename})
        data.update({'lastname': self.user.lastname})
        data.update({'phone': self.user.phone})
        data.update({'avatar': str(self.user.avatar)})
        # and everything else you want to send in the response
        return data