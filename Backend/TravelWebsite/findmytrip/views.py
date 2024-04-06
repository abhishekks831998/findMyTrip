import unicodedata

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
from .models import Hotel, Flight, Activity, Package, Booking
from .serializers import HotelSerializer, FlightSerializer, ActivitySerializer, PackageSerializer, BookingSerializer, RegisterSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAgent
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, generics, status
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth import logout
from django.contrib.auth.models import User as BaseUser
import base64
from django.core.files.base import ContentFile
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

def custom_logout(request):
    logout(request)
    # Redirect to homepage or login page after logout
    return HttpResponseRedirect('/')


class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["name", "address"]
    search_fields = ["name", "address"]


class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["flight_number", "airline"]
    search_fields = ["flight_number", "airline"]


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["title", "description"]
    search_fields = ["title", "description"]


class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["name", "duration_in_days"]
    search_fields = ["name", "duration_in_days"]

    def make_data(self,request, *args, **kwargs):
        name = request.data.get('name')
        description = request.data.get('description')
        duration_in_days = request.data.get('duration_in_days')
        hotels = request.data.get('hotels')
        activities = request.data.get('activities')
        flights = request.data.get('flights')
        image = request.data.get('image')
        Package.objects.create(name=name, description=description, duration_in_days=duration_in_days, hotels=hotels,
                               activities=activities, flights=flights, image=image)

    def post(self, request, *args, **kwargs):
        self.make_data(request, *args, **kwargs)
        return HttpResponse({'message': 'Package created successfully'}, status=200)

    def put(self, request, *args, **kwargs):
        self.make_data(request, *args, **kwargs)
        return HttpResponse({'message': 'Package Updated successfully'})


@csrf_exempt
def package_upload(request):
    if request.method == 'POST':
        # Access file with request.FILES['image'] if 'image' is the field name
        image = request.FILES.get('image')
        # Process the rest of the form data and save your model instance
        return JsonResponse({'message': 'Package created/updated successfully'})

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
    queryset = Booking.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["user", "package", "booked_on"]
    search_fields = ["user", "package", "booked_on"]


    def get_queryset(self):
        """
        This view should return a list of all bookings
        for the currently authenticated user.
        """

        return Booking.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Create a booking with the current user as the one who booked.
        """
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def packages(self, request):
        """
        This view should return a list of all packages.
        """
        packages = Package.objects.all()
        page = self.paginate_queryset(packages)
        if page is not None:
            serializer = PackageSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        else:
            serializer = PackageSerializer(packages, many=True)
            return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def book_package(self, request, pk=None):
        """
        Allows a user to book a package by specifying the package's ID.
        """
        user = request.user
        package = get_object_or_404(Package, pk=pk)

        # Check if the user has already booked this package
        if Booking.objects.filter(user=user, package=package).exists():
            return Response({'detail': 'You have already booked this package.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the booking
        booking = Booking.objects.create(user=user, package=package)
        return Response({'detail': 'Package booked successfully.', 'booking_id': booking.id},
                        status=status.HTTP_201_CREATED)


class RegisterViewSet(viewsets.ModelViewSet):
    queryset = BaseUser.objects.all()
    serializer_class = RegisterSerializer