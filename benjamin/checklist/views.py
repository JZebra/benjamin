from datetime import datetime
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response

from benjamin.checklist.constants import DATE_FORMAT
from benjamin.checklist.models import Virtue, VirtueSet, VirtueEntry, VirtueStar
from benjamin.checklist.permissions import IsOwner
from benjamin.checklist.serializers import VirtueSerializer, VirtueSetSerializer, VirtueEntrySerializer, VirtueStarSerializer


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
        start_date_str = self.request.query_params.get('startDate', None)
        end_date_str = self.request.query_params.get('endDate', None)

        if start_date_str and end_date_str:
            start_date = datetime.strptime(start_date_str, DATE_FORMAT)
            end_date = datetime.strptime(end_date_str, DATE_FORMAT)
            # TODO: get the timezone from the user
            # tz = pytz_timezone("America/Los_Angeles")
            queryset = queryset.filter(date__gte=start_date, date__lte=end_date)
        elif date is not None:
            queryset = queryset.filter(date=date)

        return queryset

    def create(self, request, *args, **kwargs):
        request.data['user_id'] = self.request.user.id
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VirtueStarViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated, IsOwner)
    serializer_class = VirtueStarSerializer

    def get_queryset(self):
        user = self.request.user
        return VirtueStar.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        request.data['user_id'] = request.user.id
        # tz = pytz_timezone("America/Los_Angeles")
        serializer = self.serializer_class(data=request.data)

        same_day_star = VirtueStar.objects.on_same_day(
            request.data['user_id'], request.data['date']
        )

        if same_day_star:
            serializer.instance = same_day_star

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
