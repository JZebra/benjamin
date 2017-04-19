from rest_framework import permissions, viewsets

from benjamin.checklist.models import Virtue, VirtueSet
from benjamin.checklist.permissions import IsOwner
from benjamin.checklist.serializers import VirtueSerializer, VirtueSetSerializer


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
