from rest_framework import routers

from .views import CommissionViewSet

router = routers.SimpleRouter()
router.register(r'',CommissionViewSet, basename='client_commission')

urlpatterns = router.urls