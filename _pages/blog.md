---
title: "Blog"
order: 2
permalink: /blog/
---
{% assign posts = site.posts | limit: 100 %}
{% if posts.size > 0 %}
{% for post in posts %}{% assign currentdate = post.date | date: "%Y" %}{% if currentdate != date %}

## {{currentdate}}

{% assign date = currentdate %} {% endif %}
{% capture tags %}{% for tag in post.tags %}{% if forloop.last == false %}{{tag | downcase}}, {% else %}{{tag | downcase}}{% endif %}{% endfor %}{% endcapture %}

{% if tags.size > 0 %}

1. "[{{post.title}}]({{post.url}})" — Posted {{post.date | date: '%A, %b %e, %Y'}} — Tags: _{{tags}}_

{% else %}

1. "[{{post.title}}]({{post.url}})" — Posted {{post.date | date: '%A, %b %e, %Y'}}

{% endif %}

{% endfor %}
{% else %}
_No posts available_
{% endif %}