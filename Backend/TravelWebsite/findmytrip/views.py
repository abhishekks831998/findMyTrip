from django.shortcuts import render

# Create your views here.
from .models import Hotel, Flight, Activity, Package, Booking
from .serializers import HotelSerializer, FlightSerializer, ActivitySerializer, PackageSerializer, BookingSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAgent
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


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


class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    permission_classes = [IsAuthenticated]

class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
    queryset = Booking.objects.all()

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



