from django.shortcuts import render


def render_card(request):
    return render(
        request=request,
        template_name='card_app/main.html'
    )