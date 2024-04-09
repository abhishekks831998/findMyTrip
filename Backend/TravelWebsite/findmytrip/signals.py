from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User as BaseUser
from .models import User as CustomUser


@receiver(post_save, sender=BaseUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        CustomUser.objects.create(id=instance)


@receiver(post_save, sender=BaseUser)
def save_user_profile(sender, instance, **kwargs):
    instance.user.save()
