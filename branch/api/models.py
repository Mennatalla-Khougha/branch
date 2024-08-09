from django.db import models

# Create your models here.

class Branch(models.Model):
    branch_id=models.AutoField(primary_key=True)
    custom_no=models.IntegerField(default=0)
    arabic_name=models.CharField(max_length=500, blank=True)
    arabic_description=models.TextField(blank=True)
    english_name=models.CharField(max_length=500, blank=True)
    english_description=models.TextField(blank=True)
    notes=models.TextField(blank=True)
    address=models.TextField(blank=True)