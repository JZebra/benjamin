from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class VirtueSet(models.Model):
    user = models.ForeignKey(User)

    def __str__(self):
        return "<VirtueSet belonging to user {0}".format(self.user.id)


class Virtue(models.Model):
    user = models.ForeignKey(User)
    virtue_set = models.ForeignKey(VirtueSet)
    title = models.TextField()
    image = models.ImageField()
    personal_image = models.ImageField()
    description = models.TextField()
    personal_description = models.TextField()
    quote = models.TextField()
    personal_quote = models.TextField()

    def __str__(self):
        return "<Virtue id: {0}".format(self.id)


class VirtueEntry(models.Model):
    user = models.ForeignKey(User)
    virtue = models.ForeignKey(Virtue)
    date = models.DateTimeField()
    value = models.IntegerField()

    def __str__(self):
        return "<VirtueEntry id: {0}".format(self.id)
