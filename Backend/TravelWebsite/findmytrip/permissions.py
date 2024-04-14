from rest_framework import permissions
from django.http import request


class IsStaffReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow agents to create and edit packages.
    """

    def has_permission(self, request, view):
        if permissions.IsAuthenticated:
            if request.user.is_staff:
                return True
            else:
                if request.method in ['GET', 'POST', 'DELETE']:
                    return True
                else:
                    return False
        else:
            return False
