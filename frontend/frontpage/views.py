from django.shortcuts import render
from frontpage.models import About, Author, Article, Contributer, Featured

def index(request):
    latest_articles = Article.objects.all().order_by('-pub_date')[:5]
    context = {'latest_articles': latest_articles}
    return render(request, 'home.html', context)

def app(request):
    context = {
        'link_start': '../',
    }
    return render(request, 'app.html', context)

def featured(request):
    latest_featured = Featured.objects.all().order_by('-pub_date')[:5]
    context = {
        'latest_featured': latest_featured,
        'link_start': '../',
    }
    return render(request, 'featured.html', context)

def blog(request):
    latest_articles = Article.objects.all().order_by('-pub_date')[:5]
    context = {
        'latest_articles': latest_articles,
        'link_start': '../',
    }
    return render(request, 'blog.html', context)

def about(request):
    about = About.objects.all();
    context = {
        'about': about,
        'link_start': '../',
    }
    return render(request, 'about.html', context)

def contact(request):
    contribs = Contributer.objects.all();
    context = {
        'contributers': contribs,
        'link_start': '../',
    }
    return render(request, 'contact.html', context)
