from django.db import models
from django.template.defaultfilters import slugify

class About(models.Model):
    headline = models.CharField(max_length=200)
    elevator = models.TextField()
    content = models.TextField()

    def  __unicode__(self):
        return self.headline

class Author(models.Model):
    first_name = models.CharField(max_length=70)
    last_name = models.CharField(max_length=70)

    def full_name(self):
        return self.first_name + self.last_name
    
    def  __unicode__(self):
        return self.first_name + self.last_name

class Article(models.Model):
    author = models.ForeignKey(Author)

    pub_date = models.DateTimeField()
    last_updated = models.DateTimeField()

    headline = models.CharField(max_length=200)
    slug = models.SlugField(blank=True)

    content = models.TextField()
    blurb = models.TextField(blank=True)

    large_img = models.CharField(blank=True,max_length=200)
    small_img = models.CharField(blank=True,max_length=200)

    alt_link = models.CharField(blank=True,max_length=200)

    def save(self, *args, **kwargs):
        # Newly created object, so set the slug
        if not self.id:
            self.slug = slugify(self.headline)

        super(Article, self).save(*args, **kwargs)

    def  __unicode__(self):
        return self.headline

class Contributer(models.Model):
    first_name = models.CharField(max_length=70)
    last_name = models.CharField(max_length=70)

    def  __unicode__(self):
        return self.first_name + self.last_name

class Featured(models.Model):
    name = models.CharField(max_length=200)
    desc = models.TextField()

    link = models.CharField(max_length=200)

    large_img = models.CharField(blank=True,max_length=200)
    small_img = models.CharField(blank=True,max_length=200)

    def __unicode__(self):
        return self.name
