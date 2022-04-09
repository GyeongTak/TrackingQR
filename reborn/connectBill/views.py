from distutils.log import Log
from multiprocessing import context
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate,login, logout
from django.contrib import messages
from .models import User
from .models import Portfolio
from .forms import RegisterForm, LoginForm
from argon2 import PasswordHasher, exceptions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PortfolioSerializer

def home(request):
    context = {}
    login_session = request.session.get('login_session','')

    if login_session == '' :
        context['login_session'] = False
    else :
        context['login_session'] =True
    return render(request,'connectBill/home.html',context)

def register(request) :
    register_form = RegisterForm()
    context = {'forms': register_form}

    if request.method == 'GET' :
        return render(request,'connectBill/register.html',context)
    elif request.method == 'POST' :
        register_form = RegisterForm(request.POST)
        if register_form.is_valid() :
            user = User(
                user_id = register_form.user_id,
                user_pw = PasswordHasher().hash(register_form.user_pw),
                user_name = register_form.user_name,
                user_email = register_form.user_email,
                user_role = register_form.user_role
            )
            user.save()
            return redirect('/')
        else :
            context['forms'] = register_form
            if register_form.errors :
                for value in register_form.errors.values() :
                    context['error'] = value
        return render(request, 'connectBill/register.html',context)


# def joinPage(request) :
#     if request.method == 'GET' :
#         return render(request,'connectBill/join.html')
#     elif request.method == 'POST' :
#         user_id = request.POST.get('user_id','')
#         user_pw = request.POST.get('user_pw','')
#         user_pw_check = request.POST.get('user_pw_check','')
#         user_name = request.POST.get('user_name','')
#         user_role = request.POST.get('user_role','')
#         user_email = request.POST.get('user_email','')
#         if( user_id or user_pw or user_pw_check or user_name or user_email) =='' :
#             return redirect('join.html')
#         elif user_pw != user_pw_check :
#             return redirect('join.html')
#         else :
#             user = User(
#                 user_id = user_id,
#                 user_pw = user_pw,
#                 user_name = user_name,
#                 user_email = user_email,
#                 user_role = user_role
#             )
#             user.save()
#         return redirect('/')

def loginPage(request) :
    loginform = LoginForm()
    context= {'forms': loginform }

    if request.method == 'GET' :
        return render(request, 'connectBill/login.html',context)

    elif request.method == 'POST' :
        loginform = LoginForm(request.POST)

        if loginform.is_valid() :
            request.session['login_session'] = loginform.login_session
            request.session.set_expiry(0)
            return redirect('/')

        else :
            context['forms'] = loginform
            if loginform.errors :
                for value in loginform.errors.values():
                    context['error'] = value
        return render(request,'connectBill/login.html',context)

# def loginPage(request) :
#     #page = 'login'
#     if request.user.is_authenticated :
#         return redirect('home')

#     if request.method == 'POST' :
#         username = request.POST.get('username').lower()
#         password = request.POST.get('password')

#         # try :
#         #     user = User.objects.get(username = username)
#         # except :
#         #     messages.error(request,'User does not Exist')

#         user = authenticate(request, username = username , password=password)

#         if user is not None :
#             login(request, user)
#             return redirect('home')
        
#         else :
#              messages.error(request,'Username OR Password does not Exist')

#     #context = {'page':page}
#     return render(request,'base/login.html')

# Create your views here.

def logout(request) :
    request.session.flush()
    return redirect('/')


class PortfolioListAPI(APIView):
    def portfolios(self, request) :
        queryset = Portfolio.objects.order_by('-created')
        serializer = PortfolioSerializer(queryset, many=True)
        return Response(serializer.data)