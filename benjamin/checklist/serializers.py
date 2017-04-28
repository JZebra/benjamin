from django.contrib.auth.models import User

from rest_framework import serializers

from benjamin.checklist.models import Virtue, VirtueEntry, VirtueSet, VirtueStar


# Serializers define the API representation
class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')


class VirtueEntrySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.IntegerField(required=True)
    virtue_id = serializers.IntegerField(required=True)
    date = serializers.DateTimeField(required=True)
    value = serializers.IntegerField(required=True)

    def create(self, validated_data):
        return VirtueEntry.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.value = validated_data.get('value', instance.value)
        instance.save()
        return instance


class VirtueStarSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.IntegerField(required=True)
    virtue_id = serializers.IntegerField(required=True)
    date = serializers.DateTimeField(required=True)

    def create(self, validated_data):
        return VirtueStar.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.virtue_id = validated_data.get('virtue_id', instance.virtue_id)
        instance.save()
        return instance


class VirtueSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.IntegerField(required=True)
    virtue_set_id = serializers.IntegerField(required=True)
    title = serializers.CharField(required=True)
    image = serializers.ImageField(required=False)
    personal_image = serializers.ImageField(required=False)
    description = serializers.CharField(required=False)
    personal_description = serializers.CharField(required=False)
    quote = serializers.CharField(required=False)
    personal_quote = serializers.CharField(required=False)
    starred_days = VirtueStarSerializer(many=True)

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


class VirtueSetSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=True)
    virtues = VirtueSerializer(many=True)

    def create(self, validated_data):
        return VirtueSet.objects.create(**validated_data)
