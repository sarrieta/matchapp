from django.urls import path, include
from matchapp import views
from django.conf.urls import url

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'profiles', views.ProfileViewSet)
router.register(r'members', views.MemberViewSet)

urlpatterns = [
    path('', views.index, name='index'),
    # register
    path('tc/', views.tc, name='tc'),
    # register
    path('register/', views.register, name='register'),
    # user profile edit page
    path('editProfile/', views.editProfile, name='editProfile'),
    # displays profile
    path('displayProfile/', views.displayProfile, name='displayProfile'),
    # login page
    path('home/', views.login, name='login'),
    # logout page
    path('logout/', views.logout, name='logout'),
    # similar hobbies
    path('similarHobbies/', views.similarHobbies, name='similarHobbies'),
    # contact similar matches
    path('contact/', views.contacts, name='contact'),
    #Ajax: filter
    path('filter/', views.filter, name='filter'),
    # upload image
    path('uploadimage/', views.upload_image, name='uploadimage'),
    # send request
    url(r'^send_request/(?P<id>\d+)/$', views.send_request, name='send_request'),
    # accept request
    url(r'^accept_request/(?P<id>\d+)/$',
        views.accept_request, name='accept_request'),
    url(r'^delete_request/(?P<id>\d+)/$',
        views.delete_request, name='delete_request'),
    # cancel request
    url(r'^cancel_request/(?P<id>\d+)/$',
        views.cancel_request, name='cancel_request'),
    # @Ajax call the update the user who liked each other
    path("liked/<int:match_id>/", views.liked, name='liked'),
    # API
    path('api/', include(router.urls))
]
