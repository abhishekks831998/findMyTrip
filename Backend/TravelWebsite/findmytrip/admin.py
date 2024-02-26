from django.contrib import admin
# Register your models here.
from .models import Hotel, Flight, Activity, Package, Booking

# import the modal that we have created in view.py

admin.site.register(Hotel)
admin.site.register(Flight)
admin.site.register(Activity)
admin.site.register(Package)
admin.site.register(Booking)
from django.contrib import admin

# Register your models here.
