import random

from factory import Faker, SubFactory
from factory.django import DjangoModelFactory

from benjamin.checklist.models import Virtue, VirtueEntry, VirtueSet, VirtueStar
from benjamin.registration.factories import UserFactory


class VirtueSetFactory(DjangoModelFactory):

    class Meta:
        model = VirtueSet

    user = SubFactory(UserFactory)
    title = Faker('word')


class VirtueFactory(DjangoModelFactory):

    class Meta:
        model = Virtue

    user = SubFactory(UserFactory)
    virtue_set = SubFactory(VirtueSetFactory, user=user)
    title = Faker('word')
    description = Faker('sentence')
    quote = Faker('sentence')


class VirtueEntryFactory(DjangoModelFactory):

    class Meta:
        model = VirtueEntry

    user = SubFactory(UserFactory)
    virtue = SubFactory(VirtueFactory, user=user)
    date = Faker('date_object')
    value = round(random.random())


class VirtueStarFactory(DjangoModelFactory):

    class Meta:
        model = VirtueStar

    user = SubFactory(UserFactory)
    virtue = SubFactory(VirtueFactory, user=user)
    date = Faker('date_object')
