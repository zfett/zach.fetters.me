---
title: Creative Commons Modular Badge
subtitle: A Jekyll implementation for displaying Creative Common's license badges easily!
tags:
  - programming
  - creativecommons
  - jekyll
published: true
---
Recently, I've decided to redesign my personal website (the one you're on now) and I wanted to display a badge for the license that my content is available under: Creative Commons BY-NC-SA. I could've just used the badge images that the Creative Commons provides, but I wanted to create a more modular implementation. I've made an include that takes user input and outputs a badge list that looks like the following:

{%include creative-commons.html terms="by nc nd sa zero" url="example.com"%}

The code is fairly simple: no JavaScript is required, only one HTML file and one CSS file (including a minified CSS file). The code will be available on my [GitHub](https://github.com/zfett/jekyll-creative-commons-badge), provided under the MIT license.
