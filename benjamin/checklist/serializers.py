from django.contrib.auth.models import User

from rest_framework import serializers

from benjamin.checklist.models import Virtue, VirtueEntry, VirtueSet


# Serializers define the API representation
class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')


class VirtueSetSerializer(serializers.Serializer):
    user = serializers.IntegerField(read_only=True)

    def create(self, validated_data):
        return VirtueSet.objects.create(**validated_data)


class VirtueSerializer(serializers.Serializer):
    user = serializers.IntegerField(read_only=True, required=True)
    virtue_set = serializers.IntegerField(required=True)
    title = serializers.TextField(required=True)
    image = serializers.ImageField(required=False)
    personal_image = serializers.ImageField(required=False)
    description = serializers.TextField(required=False)
    personal_description = serializers.TextField(required=False)
    quote = serializers.TextField(required=False)
    personal_quote = serializers.TextField(required=False)

    def create(self, validated_data):
        return Virtue.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.virtue_set = validated_data.get('virtue_set', instance.virtue_set)
        instance.title = validated_data.get('title', instance.title)
        instance.image = validated_data.get('image', instance.image)
        instance.personal_image = validated_data.get('personal_image', instance.personal_image)
        instance.description = validated_data.get('description', instance.description)
        instance.personal_description = validated_data.get('personal_description', instance.personal_description)
        instance.quote = validated_data.get('quote', instance.quote)
        instance.personal_quote = validated_data.get('personal_quote', instance.personal_quote)
        instance.save()
        return instance


class VirtueEntrySerializer(serializers.Serializer):
    user = serializers.IntegerField(read_only=True, required=True)
    virtue = serializers.IntegerField(read_only=True, required=True)
    date = serializers.DateTimeField(required=True)
    value = serializers.IntegerField(required=True)

    def create(self, validated_data):
        return VirtueEntry.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.value = validated_data.get('value', instance.value)
        instance.save()
        return instance
