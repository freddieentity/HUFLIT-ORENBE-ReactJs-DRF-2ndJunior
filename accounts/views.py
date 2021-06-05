from django.contrib.auth import get_user_model
User = get_user_model()
from .models import UserAccount
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from .serializers import CustomTokenObtainPairSerializer, UserAccountSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )
    

    def post(self, request, format=None):
        data = self.request.data

        name = data['name']
        email = data['email']
        password = data['password']
        password2 = data['password2']

        if password == password2:
            if User.objects.filter(email=email).exists():
                return Response({'error': 'Email already exists'})
            else:
                if len(password) < 6:
                    return Response({'error': 'Password must be at least 6 characters'})
                else:
                    user = User.objects.create_user(email=email, password=password, name=name)

                    user.save()
                    return Response({'success': 'User created successfully'})
        else:
            return Response({'error': 'Passwords do not match'})



class UserInfoView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = UserAccountSerializer
    
    def patch(self, request, format=None):
        data = self.request.data
        print(data)
        queryset = UserAccount.objects.get(email=request.query_params["email"])

        queryset.email = data.get("email", queryset.email)
        queryset.name = data.get("name", queryset.name)
        queryset.firstname = data.get("firstname", queryset.firstname)
        queryset.middlename = data.get("middlename", queryset.middlename)
        queryset.lastname = data.get("lastname", queryset.lastname)
        queryset.phone = data.get("phone", queryset.phone)
        queryset.avatar = data.get("avatar", queryset.avatar)

        queryset.save()
        serializer = UserAccountSerializer(queryset)

        return Response(serializer.data)
        

class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer