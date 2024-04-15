from rest_framework import serializers
from .models import Hotel, Flight, Activity, Package, Booking
from django.contrib.auth.models import User as BaseUser
from rest_framework import request


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
    total_price = serializers.SerializerMethodField()

    def get_total_price(self,obj):
        return obj.calculate_total_price()

    class Meta:
        model = Package
        fields = ['id', 'name','description', 'duration_in_days', 'hotels', 'flights', 'activities','total_price', 'image','created_by']


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['url', 'user', 'package', 'booked_on','guest_info', 'isCancelled', 'paymentamount']

class BookingSerializerForGet(serializers.ModelSerializer):
    package_name = serializers.SerializerMethodField()
    user_name = serializers.SerializerMethodField()

    def get_package_name(self, obj):
        return obj.package.name

    def get_user_name(self, obj):
        return obj.user.username

    class Meta:
        model = Booking
        fields = ['url', 'user', 'user_name', 'package', 'package_name', 'booked_on', 'guest_info', 'isCancelled', 'paymentamount']


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

    def create(self, validated_data):
        User = BaseUser.objects.create_user(**validated_data)
        return User