from rest_framework.permissions import BasePermission, IsAuthenticated

class isClientUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_client)

class isDesignerUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_Designer)        