---
layout: page
title: Projects
permalink: /projects/
nav: true
nav_order: 2
display_categories: [Creative Machines, Sensing & HRI, Automotive, AI & Task Guidance, Design]
horizontal: false
---

<div class="projects-filter">
  <div class="filter-label">Filter by theme</div>
  <div class="filter-bar" id="theme-filter">
    <button class="filter-btn active" data-filter="all">All</button>
    {% for category in page.display_categories %}
    <button class="filter-btn" data-filter="{{ category }}">{{ category }}</button>
    {% endfor %}
  </div>
  <div class="filter-label" style="margin-top: 0.75rem;">Filter by method</div>
  <div class="filter-bar" id="method-filter">
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="user-study">User Studies</button>
    <button class="filter-btn" data-filter="prototyping">Prototyping</button>
    <button class="filter-btn" data-filter="python">Python</button>
    <button class="filter-btn" data-filter="computer-vision">Computer Vision</button>
    <button class="filter-btn" data-filter="wizard-of-oz">Wizard-of-Oz</button>
    <button class="filter-btn" data-filter="design">Design</button>
    <button class="filter-btn" data-filter="fabrication">Fabrication</button>
  </div>
</div>

<div class="projects">
  <div class="row row-cols-1 row-cols-md-3" id="project-grid">
    {% assign sorted_projects = site.projects | sort: "importance" %}
    {% for project in sorted_projects %}
      {% unless project.title == "Placeholder" %}
      <div class="col project-item" data-category="{{ project.category }}" data-tags="{{ project.tags | join: ',' }}">
        <a href="{% if project.redirect %}{{ project.redirect }}{% else %}{{ project.url | relative_url }}{% endif %}">
          <div class="card h-100 hoverable project-card-enhanced">
            {% if project.img %}
            {% include figure.liquid loading="eager" path=project.img sizes="250px" alt=project.title class="card-img-top" %}
            {% endif %}
            <div class="card-body">
              <div class="card-meta">
                <span class="card-category">{{ project.category }}</span>
                {% if project.year %}<span class="card-year">{{ project.year }}</span>{% endif %}
              </div>
              <h2 class="card-title">{{ project.title }}</h2>
              <p class="card-text">{{ project.description }}</p>
              {% if project.tags %}
              <div class="card-tags">
                {% for tag in project.tags %}
                <span class="method-tag">{{ tag }}</span>
                {% endfor %}
              </div>
              {% endif %}
            </div>
          </div>
        </a>
      </div>
      {% endunless %}
    {% endfor %}
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  var themeFilter = 'all';
  var methodFilter = 'all';

  function applyFilters() {
    var items = document.querySelectorAll('.project-item');
    items.forEach(function(item) {
      var category = item.getAttribute('data-category');
      var tags = item.getAttribute('data-tags') || '';
      var showTheme = (themeFilter === 'all' || category === themeFilter);
      var showMethod = (methodFilter === 'all' || tags.indexOf(methodFilter) !== -1);
      if (showTheme && showMethod) {
        item.classList.remove('hidden');
        item.style.display = '';
      } else {
        item.classList.add('hidden');
        item.style.display = 'none';
      }
    });
  }

  document.getElementById('theme-filter').addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-btn')) {
      this.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
      e.target.classList.add('active');
      themeFilter = e.target.getAttribute('data-filter');
      applyFilters();
    }
  });

  document.getElementById('method-filter').addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-btn')) {
      this.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
      e.target.classList.add('active');
      methodFilter = e.target.getAttribute('data-filter');
      applyFilters();
    }
  });

  // Handle URL hash for direct theme linking
  var hash = decodeURIComponent(window.location.hash.substring(1));
  if (hash) {
    var btn = document.querySelector('#theme-filter [data-filter="' + hash + '"]');
    if (btn) {
      btn.click();
    }
  }
});
</script>
