from rest_framework import routers

from .views import CommissionViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register('',CommissionViewSet, basename='client_commission')

urlpatterns = router.urls