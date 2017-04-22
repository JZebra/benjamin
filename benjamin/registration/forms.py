from django.contrib.auth import password_validation
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.forms import EmailField, CharField
from django.forms.widgets import EmailInput, PasswordInput

from benjamin.registration.models import User


class BenjaminUserCreationForm(UserCreationForm):
    email = EmailField(widget=EmailInput(attrs={
        'class': 'form-control',
        'placeholder': 'Email',
    }))

    password1 = CharField(
        label='Password',
        strip=False,
        help_text=password_validation.password_validators_help_text_html(),
        widget=PasswordInput(
            attrs={
                'class': 'form-control',
                'placeholder': 'Password'
            }),
    )
    password2 = CharField(
        label='Please type your password again',
        strip=False,
        help_text='Enter the same password as before, for verification.',
        widget=PasswordInput(
            attrs={
                'class': 'form-control',
                'placeholder': 'Confirm Password'
            }),
    )

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
