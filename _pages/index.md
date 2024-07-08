---
title: Homepage
order: 1
permalink: /
stylesheets:
  - /assets/style/page/index.css
scripts: []
---
![A moody picture of myself in a mirror holding my Nikon Z fc camera.](/assets/image/portrait.webp){:class="portrait"}

Hello! My name is Zachary Fetters and I am an amateur photographer, web designer, developer, game enjoyer, bad D&D player, and whatever else interests me from time to time. (That's me to the left!)

This is my personal website, so expect random ramblings on topics like photography, gaming, design, and programming/tech. Please note that my opinions are my own and are not reflective of those held by any past, current, or future employers or organizations I am a part of.

If you're interested in spinning up your own site like mine, feel free to visit the [GitHub repository](https://github.com/zfett/zach.fetters.me) for my website and clone it for yourself! It's entirely hosted on GitHub and published via [Netlify](https://www.netlify.com).

## Recent Posts

{% assign posts = site.posts | limit: 10 %}
{% if posts.size > 0 %}
{% for post in posts %}

1. **[{{post.title}}]({{post.url}})** — Posted {{post.date | date: '%A, %b %e, %Y'}}

{% endfor %}
{% else %}
_No posts available_
{% endif %}
