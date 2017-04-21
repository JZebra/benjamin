from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.forms import EmailField, CharField
from django.forms.widgets import EmailInput, PasswordInput

from benjamin.registration.models import User


class BenjaminUserCreationForm(UserCreationForm):

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('email',)


class BenjaminUserLoginForm(AuthenticationForm):
    email = EmailField(widget=EmailInput(attrs={
        'class': 'form-control',
        'placeholder': 'Email',
    }))

    password = CharField(
        label='Password',
        strip=False,
        widget=PasswordInput(
            attrs={
                'class': 'form-control',
                'placeholder': 'Password'
            }
        ))
