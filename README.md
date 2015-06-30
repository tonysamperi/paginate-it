PaginateIt
============

A **jQuery** content paginator!

# Index

  - [Introduction](#introduction)
  - [Requirements](#requirements)
  - [Usage](#usage)
  - [License](#license)

# Introduction

**PaginateIt** is a jQuery plugin, that lets you easily paginate content!

# Requirements

The only requirement needed is [jQuery](https://jquery.com/download/) that you can install it via [Bower](http://bower.io/).

# Usage

Simply include the paginateIt JS
```html
<html>
    <head>
        <script type="text/javascript" src="path-to/js/paginateIt.js"></script>
    </head>
</html>
```
Create any grid like this (this is bootstrap, but you can use for example UIkit or a custom grid!)
```html
<div id="container" class="row" paginate="3">
    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        my content 1
    </div>
    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        my content 2
    </div>
    <!-- ....... -->
    <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        my content n
    </div>
</div>
```
in the container div you tell **paginateIt** how many elements for page you want.
And you're done!

# License

Check out LICENSE file (MIT)