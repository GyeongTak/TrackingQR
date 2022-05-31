from rest_framework import routers


from .views import PortfolioViewSet, ProjectViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register('',PortfolioViewSet, basename='portfolio')
router.register('projects/',ProjectViewSet, basename='projects')

urlpatterns = router.urls