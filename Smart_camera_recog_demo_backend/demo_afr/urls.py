"""
URL configuration for demo_afr project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from register import views as reg_view
from delete  import views  as del_view
from home import views as home_view
from authenticate import views as auth_view

urlpatterns = [
    path('/home',home_view.main,name="main"),
    path('register/',reg_view.register,name="register"),
    path('delete/',del_view.delete_face,name="delete"),
    path('authenticate/',auth_view.authenticate,name="authenticate")
]
