from .views import BranchViewSet, HomePage
from rest_framework.routers import DefaultRouter
from django.urls import include, path

router = DefaultRouter()
router.register(r"branches", BranchViewSet)

urlpatterns = [
  path("api/", include(router.urls)),
  path("", HomePage),
]



