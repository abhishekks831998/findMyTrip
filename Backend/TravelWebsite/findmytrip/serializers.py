from rest_framework import serializers
from .models import Hotel, Flight, Activity, Package, Booking


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['id', 'name', 'address']


class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = ['id', 'flight_number', 'airline']


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'title', 'description']


class PackageSerializer(serializers.ModelSerializer):
    hotels = serializers.PrimaryKeyRelatedField(queryset=Hotel.objects.all(), many=True)
    flights = serializers.PrimaryKeyRelatedField(queryset=Flight.objects.all(), many=True)
    activities = serializers.PrimaryKeyRelatedField(queryset=Activity.objects.all(), many=True)

    class Meta:
        model = Package
        fields = ['id', 'name', 'duration_in_days', 'hotels', 'flights', 'activities', 'agent']

    def create(self, validated_data):
        hotels_data = validated_data.pop('hotels')
        flights_data = validated_data.pop('flights')
        activities_data = validated_data.pop('activities')
        package = Package.objects.create(**validated_data)
        package.hotels.set(hotels_data)
        package.flights.set(flights_data)
        package.activities.set(activities_data)
        return package

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.duration_in_days = validated_data.get('duration_in_days', instance.duration_in_days)
        if 'hotels' in validated_data:
            instance.hotels.set(validated_data['hotels'])
        if 'flights' in validated_data:
            instance.flights.set(validated_data['flights'])
        if 'activities' in validated_data:
            instance.activities.set(validated_data['activities'])
        instance.save()
        return instance


class BookingSerializer(serializers.ModelSerializer):
    #package = PackageSerializer(read_only=True)
    #user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Booking
        fields = ['url', 'user', 'package', 'booked_on','flight_info', 'hotel_info' ,'activity_info']


