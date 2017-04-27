from datetime import datetime
from django.utils import timezone
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response
from pytz import timezone as pytz_timezone

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
        queryset = VirtueEntry.objects.filter(user=user)

        date = self.request.query_params.get('date', None)
        start_date_unix = self.request.query_params.get('startDate', None)
        end_date_unix = self.request.query_params.get('endDate', None)

        if start_date_unix and end_date_unix:
            # TODO: get the timezone from the user
            tz = pytz_timezone("America/Los_Angeles")
            start_date = datetime.fromtimestamp(int(start_date_unix), tz)
            end_date = datetime.fromtimestamp(int(end_date_unix), tz)
            queryset = queryset.filter(date__gte=start_date, date__lte=end_date)

        elif date is not None:
            queryset = queryset.filter(date)

        return queryset

    def create(self, request, *args, **kwargs):
        """Creates a new VirtueEntry if one does not exist for that day. Otherwise
        it updates the existing VirtueEntry for that day
        TODO: refactor logic out of view and into model/serializer
        """
        request.data['user_id'] = self.request.user.id
        request.data['date'] = self.request.data.get('date', timezone.now())
        serializer = self.serializer_class(data=request.data)

        same_day_instance = VirtueEntry.objects.on_same_day(
            request.data['user_id'], request.data['virtue_id'], request.data['date'])
        if same_day_instance:
            # Update existing VirtueEntry instead of saving a new one
            same_day_instance.value = request.data['value']
            serializer.instance = same_day_instance

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
