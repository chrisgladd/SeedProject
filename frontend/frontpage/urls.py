from django.conf.urls import patterns, url

from frontpage import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^app/$', views.app, name='app'),
    url(r'^featured/$', views.featured, name='featured'),
    url(r'^blog/$', views.blog, name='blog'),
    url(r'^about/$', views.about, name='about'),
    url(r'^contact/$', views.contact, name='contact'),
    url(r'^article/$', views.article_list, name='article_list'),
    url(r'^article/(?P<slug>\d+)/$', views.article, name='article'),
    url(r'^article/$', views.contact, name='contact'),
)
