from rest_framework import permissions


class IsAgent(permissions.BasePermission):
    """
    Custom permission to only allow agents to create and edit packages.
    """
    def has_permission(self, request, view):
        """
        Check if the request is made by an authenticated user who is an agent.
        This method is called for every request, but mainly focuses on non-object-specific requests
        like creating a new package.
        """
        # Ensure the user is authenticated, has the 'is_agent' attribute, and 'is_agent' is True.
        return request.user and request.user.is_authenticated and self._is_agent(request.user)

    def has_object_permission(self, request, view, obj):
        """
        Object-level permission check.
        This method is called for requests that act on a specific object, e.g., updating or deleting a package.
        """
        # Check if the user is an agent as above. You may include additional checks specific to the object if needed.
        return self._is_agent(request.user)

    def _is_agent(self, user):
        """
        Utility method to check if a user is marked as an agent.
        This method abstracts the check to make it reusable and easier to maintain.
        """
        return hasattr(user, 'is_agent') and user.is_agent
