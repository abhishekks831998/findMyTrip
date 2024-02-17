from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


# Hotel model
class Hotel(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.name


# Flight model
class Flight(models.Model):
    flight_number = models.CharField(max_length=100)
    airline = models.CharField(max_length=100)

    def __str__(self):
        return self.airline + ' ' + self.flight_number


# Activity model
class Activity(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title


# Package model
class Package(models.Model):
    name = models.CharField(max_length=100)
    duration_in_days = models.PositiveIntegerField(default=1)
    hotels = models.ManyToManyField(Hotel)
    activities = models.ManyToManyField(Activity)
    flights = models.ManyToManyField(Flight)
    agent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='packages',null=True, blank=True)


# Booking model
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings',null=True, blank=True)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    booked_on = models.DateTimeField(default=timezone.now)
