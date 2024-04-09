from rest_framework import serializers
from .models import Hotel, Flight, Activity, Package, Booking
from django.contrib.auth.models import User as BaseUser


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['id', 'name', 'address','hotel_price']


class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = ['id', 'flight_number', 'airline', 'flight_price']


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'title', 'description', 'activity_price']


class PackageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Package
        fields = ['id', 'name','description', 'duration_in_days', 'hotels', 'flights', 'activities', 'image']


class BookingSerializer(serializers.ModelSerializer):
    #package = PackageSerializer(read_only=True)
    #user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Booking
        fields = ['url', 'user', 'package', 'booked_on','guest_info']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseUser
        fields = ('id', 'first_name', 'last_name', 'is_staff', 'username', 'email', 'password')
        extra_kwargs = {'first_name': {'required': True},
                        'last_name': {'required': True},
                        'is_staff': {'required': True},
                        'username': {'required': True},
                        'email': {'required': True},
                        'password': {'write_only': True}}

    def validate_username(self, value):
        if BaseUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already in use.")
        return value

    def validate_email(self, value):
        if BaseUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email address is already in use.")
        return value

    def create(self, validated_data):
        User = BaseUser.objects.create_user(**validated_data)
        return User