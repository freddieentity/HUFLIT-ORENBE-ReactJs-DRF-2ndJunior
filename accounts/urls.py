from django.urls import path
from .views import SignupView, UserInfoView

urlpatterns = [
    path('signup', SignupView.as_view()),
    path('userinfo/', UserInfoView.as_view()),
]