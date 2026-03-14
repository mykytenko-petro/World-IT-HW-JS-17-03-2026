from django.urls import path

from .views import render_card


urlpatterns = [
    path("", view=render_card, name="render_card")
]