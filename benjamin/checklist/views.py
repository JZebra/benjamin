from django.utils import timezone
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response

from benjamin.checklist.models import Virtue, VirtueSet, VirtueEntry
from benjamin.checklist.permissions import IsOwner
from benjamin.checklist.serializers import VirtueSerializer, VirtueSetSerializer, VirtueEntrySerializer


class VirtueSetViewSet(viewsets.ModelViewSet):
    """
     This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    permission_classes = (permissions.IsAuthenticated, IsOwner)
    serializer_class = VirtueSetSerializer

    def get_queryset(self):
        user = self.request.user
        return VirtueSet.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class VirtueDetailViewSet(viewsets.ModelViewSet):
    """
     This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    permission_classes = (permissions.IsAuthenticated, IsOwner)
    serializer_class = VirtueSerializer

    def get_queryset(self):
        user = self.request.user
        return Virtue.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class VirtueEntryViewSet(viewsets.ModelViewSet):
    """
     This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    permission_classes = (permissions.IsAuthenticated, IsOwner)
    serializer_class = VirtueEntrySerializer

    def get_queryset(self):
        user = self.request.user
        return VirtueEntry.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        request.data['user_id'] = self.request.user.id
        request.data['date'] = self.request.data.get('date', timezone.now())

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
