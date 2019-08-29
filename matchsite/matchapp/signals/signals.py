from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from matchapp.models import Profile, Member

# User model is the sender 
# Profile model is the receiver

# When a user is saved send this signal which 
# creates the profile for the user
@receiver(post_save, sender=Member)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        print("created")

@receiver(post_save, sender=Member)
def save_profile(sender, instance,**kwargs):
    instance.profile.save()