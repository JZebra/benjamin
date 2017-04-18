from django.http import Http404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from benjamin.checklist.models import Virtue, VirtueSet
from benjamin.checklist.serializers import VirtueSerializer, VirtueSetSerializer


class VirtueSetView(APIView):

    def get(self, request, user_id, format=None):
        try:
            virtue_sets = VirtueSet.objects.filter(user_id=user_id)
        except VirtueSet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = VirtueSetSerializer(virtue_sets, many=True)
        return Response(serializer.data)


class VirtueView(APIView):

    def get_object(self, pk):
        try:
            return Virtue.objects.get(pk=pk)
        except Virtue.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        virtue = self.get_object(pk)
        serializer = VirtueSerializer(virtue)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        virtue = self.get_object(pk)
        serializer = VirtueSerializer(virtue, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        virtue = self.get_object(pk)
        virtue.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
