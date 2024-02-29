from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.contrib.auth.models import User as BaseUser


# Hotel model
class Hotel(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    class Meta:
        ordering = ['name']

# Flight model
class Flight(models.Model):
    flight_number = models.CharField(max_length=100)
    airline = models.CharField(max_length=100)

    def __str__(self):
        return self.airline + ' ' + self.flight_number
    class Meta:
        ordering = ['flight_number']

# Activity model
class Activity(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title
    class Meta:
        ordering = ['title']


# Package model
class Package(models.Model):
    name = models.CharField(max_length=100)
    duration_in_days = models.PositiveIntegerField(default=1)
    hotels = models.ManyToManyField(Hotel)
    activities = models.ManyToManyField(Activity)
    flights = models.ManyToManyField(Flight)
    agent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='packages',null=True, blank=True)

    def __str__(self):
        return self.name


# Booking model
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings',null=True, blank=True)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    booked_on = models.DateTimeField(default=timezone.now)
    flight_info = models.JSONField(default=dict)
    hotel_info = models.JSONField(default=dict)
    activity_info = models.JSONField(default=dict)
    def get_absolute_url(self):
        return reverse('package-detail', args=[str(self.id)])

class User(models.Model):
    id = models.OneToOneField(BaseUser, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    class Meta:
        ordering = ['id']