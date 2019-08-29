from rest_framework import serializers
from .models import Member, Profile, Hobby

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('user', 'url', 'gender', 'dob', 'email') 
      
class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ('url', 'username', 'hobbies')

