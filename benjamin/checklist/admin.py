from django.contrib import admin
from benjamin.checklist.models import Virtue, VirtueEntry, VirtueSet

# Register your models here.
admin.site.register(Virtue)
admin.site.register(VirtueEntry)
admin.site.register(VirtueSet)
