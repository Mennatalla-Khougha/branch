from django.shortcuts import render
from .serializers import BranchSerializer
from .models import Branch
from rest_framework import viewsets, pagination
# Create your views here.

class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer
    pagination_class = pagination.PageNumberPagination
    pagination_class.page_size = 1

def HomePage(request):
    return render(request, 'index.html')