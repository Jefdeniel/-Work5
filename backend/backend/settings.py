"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 5.0.4.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

import environ
import psycopg2
from pathlib import Path
from django.conf import settings
import django_heroku
import os

env = environ.Env()
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = "django-insecure-&c6e-t5ws_$=@a7ydb($ls_u4tkcqg512=r^nuojsw30^%#)k3"
SECRET_KEY = os.environ("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = []

# Application definition: when installing: put here!!!

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",  # Django rest framework
    "rest_framework_swagger",  # Swagger
    "rest_framework.authtoken",  # Token authentication
    "drf_yasg",  # Yet Another Swagger generator
    "backend",
    "calendar_app",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # should be as high as possible, especially before CommonMiddleware    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


ROOT_URLCONF = "backend.urls"

REST_FRAMEWORK = {
    "DEFAULT_ROUTER_TRAILING_SLASH": False,
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ],
}

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR.joinpath("frontend")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

CSRF_TRUSTED_ORIGINS = ["http://localhost:8000"]
WSGI_APPLICATION = "backend.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": env("DB_NAME"),
        "USER": env("DB_USER"),
        "PASSWORD": env("DB_PASSWORD"),
        "HOST": env("DB_HOST"),
        "PORT": env("DB_PORT"),
    }
}

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

AUTH_USER_MODEL = "calendar_app.CustomUser"  # Custom user model

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/ CHECK THIS

STATIC_URL = "static/"
STATICFILES_DIRS = [BASE_DIR.joinpath("frontend", "dist")]
STATIC_ROOT = BASE_DIR.joinpath("static")
django_heroku.settings(locals())

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR.joinpath("media")

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

## EXPLANATION

# django-cors-headers is a Python library that will prevent the errors that you would normally get due to CORS rules. In the CORS_ORIGIN_WHITELIST code, you whitelisted localhost:3000 because you want the frontend (which will be served on that port) of the application to interact with the API.

# CORS settings for allowing requests from FRONTEND

CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "http://localhost:5177",
    "http://localhost:8000",
]

# If you host your front-end and back-end at different hosts, you should configure the CORS settings to make the front-end is able to access the resources of the back-end
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5177",
    "http://localhost:8000",
]

CORS_ALLOW_CREDENTIALS = True

# Security settings
FILE_UPLOAD_PERMISSIONS = 0o644

# PRODUCTION: SET TO TRUE
# CSRF_COOKY_HTTPONLY = False
# SESSION_COOKIE_HTTPONLY = True

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5177",
    "http://localhost:8000",
]
