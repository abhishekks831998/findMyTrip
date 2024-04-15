import unicodedata

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
from .models import Hotel, Flight, Activity, Package, Booking, User
from .serializers import HotelSerializer, FlightSerializer, ActivitySerializer, PackageSerializer, BookingSerializer, RegisterSerializer, BookingSerializerForGet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, generics, status
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth import logout, authenticate
from django.contrib.auth.models import User as BaseUser
import base64
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import User as CustomUser
from django.core.files.base import ContentFile
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .permissions import IsStaffReadOnly
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from django.db.models import Count
from django.db.models.functions import TruncMonth

def send_email(subject, message, recipient_list):
    """
    Utility function to send email using Django's send_mail function.
    
    Parameters:
    - subject: The subject of the email.
    - message: The content of the email.
    - recipient_list: A list of recipient email addresses.
    """
    try:
        print("Email sent successfully!")
        send_mail(
            subject,
            message,
            'findmytripcoen@gmail.com',
            recipient_list,
            fail_silently=True,  # Set to True to suppress exceptions
        )
        print("Email sent successfully!")
    except Exception as e:
        print(f"An error occurred while sending email: {e}")


def custom_logout(request):
    logout(request)
    # Redirect to homepage or login page after logout
    return HttpResponseRedirect('/')


class LogoutViewSet(APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)


class LoginViewSet(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        # Check if both username and password have been provided
        if not username or not password:
            return Response({'error': 'Both username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if a user with the provided username exists
        if not BaseUser.objects.filter(username=username).exists():
            return Response({'error': 'Invalid username/password.'}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate the user
        user = authenticate(username=username, password=password)
        if user is None:
            return Response({'error': 'Invalid username/password.'}, status=status.HTTP_400_BAD_REQUEST)

        # Generate or get the token for the user
        token, created = Token.objects.get_or_create(user=user)

        # Return the token and user information
        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'is_staff': user.is_staff,
                'email': user.email
            }
        }, status=status.HTTP_200_OK)


class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsStaffReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["name", "address"]
    search_fields = ["name", "address"]

    def post(self):
        return HttpResponse({"status":"200"}, status=200)

    def put(self):
        return HttpResponse({"status":"200"}, status=200)

    def delete(self):
        return HttpResponse({"status":"200"}, status=200)

class FlightViewSet(viewsets.ModelViewSet):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["flight_number", "airline"]
    search_fields = ["flight_number", "airline"]

    def post(self):
        return HttpResponse({"status":"200"}, status=200)

    def put(self):
        return HttpResponse({"status":"200"}, status=200)

    def delete(self):
        return HttpResponse({"status":"200"}, status=200)


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["title", "description"]
    search_fields = ["title", "description"]

    def post(self):
        return HttpResponse({"status":"200"}, status=200)

    def put(self):
        return HttpResponse({"status":"200"}, status=200)

    def delete(self):
        return HttpResponse({"status":"200"}, status=200)


class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    permission_classes = [IsStaffReadOnly]
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
        created_by = request.data.get('created_by')
        Package.objects.create(name=name, description=description, duration_in_days=duration_in_days, hotels=hotels,
                               activities=activities, flights=flights, image=image, created_by=created_by)

    def post(self, request, *args, **kwargs):
        self.make_data(request, *args, **kwargs)
        return HttpResponse({"status":"200"}, status=200)

    def put(self, request, *args, **kwargs):
        self.make_data(request, *args, **kwargs)
        return HttpResponse({"status":"200"},status=200)


@csrf_exempt
def package_upload(request):
    if request.method == 'POST':
        image = request.FILES.get('image')
        return JsonResponse({'message': 'Package created/updated successfully'})


class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsStaffReadOnly]
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

    @action(detail=False, methods=['delete'], permission_classes=[IsStaffReadOnly])
    def cancel_booking(self, request,booking_id):
        """
        Allows cancelling a booking by specifying the booking's ID.
        """
        try:
            booking = Booking.objects.get(pk=booking_id)
            
            # Update the isCancelled field to True
            booking.isCancelled = True
            booking.save()
            
            return Response({'detail': 'Booking cancelled successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except Booking.DoesNotExist:
            return Response({"error": "Booking does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        

    @action(detail=False, methods=['get'], permission_classes=[IsStaffReadOnly])
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
        
    @action(detail=False, methods=['get'], permission_classes=[IsStaffReadOnly])
    def get_all_bookings(self, request):
        """
        This view should return a list of all packages.
        """
        user = request.user
        if(user.is_staff):
            bookings = Booking.objects.all().order_by('-booked_on')
        else:
            bookings= Booking.objects.filter(user=self.request.user).order_by('-booked_on')
        serializer = BookingSerializerForGet(bookings, many=True, context={'request': request})
        return Response(serializer.data)
    


    @action(detail=True, methods=['post'], permission_classes=[IsStaffReadOnly])
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
        send_email("Package booked successfully", "You have booked the following package successfully:"+package.name,["findmytripcoen@gmail.com","abhishekks831998@gmail.com"])
        return Response({'detail': 'Package booked successfully.', 'booking_id': booking.id},
                        status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def book_package_for_agent(self, request, pk=None):
        """
        Allows an agent to book a package for a user by specifying the package's ID and user's ID.
        """
        try:
            
            package_id = request.data.get('package')
            user = request.data.get('user')
            guest_info = request.data.get('guest_info', {})  
            paymentamount = request.data.get('paymentamount')
            package = Package.objects.get(pk=package_id)
            user =get_user_model().objects.get(pk=user)
            booking = Booking.objects.create(package=package, user=user, booked_on=timezone.now(), guest_info=guest_info, paymentamount=paymentamount)
            serializer = self.get_serializer(booking)
            send_email("Package booked successfully", "You have booked the following package successfully:"+package.name,["findmytripcoen@gmail.com","abhishekks831998@gmail.com"])
            return Response(serializer.data)
        except Package.DoesNotExist:
            return Response({"error": "Package does not exist"}, status=400)
        except User.DoesNotExist:
            return Response({"error": "User does not exist"}, status=400)

class RegisterViewSet(viewsets.ModelViewSet):
    queryset = BaseUser.objects.all()
    serializer_class = RegisterSerializer

class ReportViewSet(viewsets.ViewSet):

    def list(self, request):
        total_users = get_user_model().objects.count()

        # Get the number of users who are staff (agents)
        agent_users = get_user_model().objects.filter(is_staff=True).count()
        customer_users = get_user_model().objects.filter(is_staff=False).count()
        # Return the data in the required format

        bookings_per_month = Booking.objects.annotate(month=TruncMonth('booked_on')).values('month') .annotate(num_bookings=Count('id')).order_by('month')
        formatted_bookings = []
        for entry in bookings_per_month:
            month_str = entry['month'].strftime("%Y-%m")
            formatted_entry = {
                "month": month_str,
                "num_bookings": entry['num_bookings']
            }
            formatted_bookings.append(formatted_entry)

        total_packages = Package.objects.count()
        provided_packages = Package.objects.filter(created_by=0).count()
        data = { 
            "user_data":
            {
                "Total": total_users,
                "Agents": agent_users,
                "Customers": customer_users
            },
            "bookings_per_month" :formatted_bookings,
            "package_data" : {
                "Custom" : total_packages - provided_packages,
                "Provided" : provided_packages
            }
        }

        return Response(data)