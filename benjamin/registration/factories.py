from factory import Faker
from factory.django import DjangoModelFactory

from benjamin.registration.models import User


class UserFactory(DjangoModelFactory):

    class Meta:
        model = User

    email = Faker('email')
