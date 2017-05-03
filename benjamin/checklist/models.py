from django.db import models
from benjamin.registration.models import User


# Create your models here.
class VirtueSet(models.Model):
    user = models.ForeignKey(User, related_name='virtue_sets', on_delete=models.CASCADE)
    title = models.TextField(null=False)

    def virtue_stars(self):
        return VirtueStar.objects.filter(virtue__virtue_set_id=self.id)

    def __str__(self):
        return "<VirtueSet belonging to user {0}>".format(self.user.id)


class Virtue(models.Model):
    user = models.ForeignKey(User, related_name='virtues', on_delete=models.CASCADE)
    virtue_set = models.ForeignKey(VirtueSet, related_name='virtues', on_delete=models.CASCADE)
    title = models.TextField()
    image = models.ImageField(null=True, blank=True)
    personal_image = models.ImageField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    personal_description = models.TextField(null=True, blank=True)
    quote = models.TextField(null=True, blank=True)
    personal_quote = models.TextField(null=True, blank=True)

    def __str__(self):
        return "<Virtue id: {0}>".format(self.id)


class VirtueEntryManager(models.Manager):

    def on_same_day(self, user_id, virtue_id, date):
        try:
            same_day_entry = VirtueEntry.objects.get(
                user_id=user_id,
                virtue_id=virtue_id,
                date=date,
            )
        except VirtueEntry.DoesNotExist:
            same_day_entry = None

        return same_day_entry


class VirtueEntry(models.Model):
    objects = VirtueEntryManager()
    user = models.ForeignKey(User, related_name='virtue_entries', on_delete=models.CASCADE)
    virtue = models.ForeignKey(Virtue, related_name='virtue_entries', on_delete=models.CASCADE)
    date = models.DateField(null=False)
    value = models.IntegerField(null=False)

    def save(self, *args, **kwargs):
        same_day_entry = VirtueEntryManager.on_same_day(
            VirtueEntryManager,
            user_id=self.user.id,
            virtue_id=self.virtue.id,
            date=self.date,
        )

        if same_day_entry:
            same_day_entry.value = self.value
            super(VirtueEntry, same_day_entry).save()
        else:
            super(VirtueEntry, self).save(*args, **kwargs)

    def __str__(self):
        return "<VirtueEntry id: {0}>".format(self.id)


class VirtueStarManager(models.Manager):

    def on_same_day(self, user_id, date):
        try:
            same_day_star = VirtueStar.objects.get(
                user_id=user_id,
                date=date,
            )
        except VirtueStar.DoesNotExist:
            same_day_star = None

        return same_day_star


class VirtueStar(models.Model):
    objects = VirtueStarManager()
    virtue = models.ForeignKey(Virtue, related_name='starred_days', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='starred_virtues', on_delete=models.CASCADE)
    date = models.DateField(null=False)

    def save(self, *args, **kwargs):
        same_day_star = VirtueStarManager.on_same_day(
            VirtueStarManager,
            user_id=self.user.id,
            date=self.date,
        )

        if same_day_star:
            same_day_star.virtue_id = self.virtue_id
            super(VirtueStar, same_day_star).save()
        else:
            super(VirtueStar, self).save(*args, **kwargs)

    def __str__(self):
        return "<VirtueStar id: {0} for virtue: {1} on date: {2}.>".format(self.id, self.virtue.id, self.date)
