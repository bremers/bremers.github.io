// Theme toggle (only if button exists)
(function() {
  var toggle = document.getElementById('theme-toggle');
  var stored = localStorage.getItem('theme');
  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  if (toggle) {
    toggle.addEventListener('click', function() {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
  }
})();

// Project filtering
(function() {
  var themeFilter = 'all';
  var methodFilter = 'all';

  function apply() {
    var cards = document.querySelectorAll('.project-card');
    cards.forEach(function(card) {
      var cat = card.getAttribute('data-category');
      var tags = card.getAttribute('data-tags') || '';
      var showTheme = themeFilter === 'all' || cat === themeFilter;
      var showMethod = methodFilter === 'all' || tags.indexOf(methodFilter) !== -1;
      card.classList.toggle('hidden', !(showTheme && showMethod));
    });
  }

  document.getElementById('theme-filter').addEventListener('click', function(e) {
    if (!e.target.classList.contains('filter-btn')) return;
    this.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
    e.target.classList.add('active');
    themeFilter = e.target.getAttribute('data-filter');
    apply();
  });

  document.getElementById('method-filter').addEventListener('click', function(e) {
    if (!e.target.classList.contains('filter-btn')) return;
    this.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
    e.target.classList.add('active');
    methodFilter = e.target.getAttribute('data-filter');
    apply();
  });

  // Theme cards link to filter
  document.querySelectorAll('.theme-card').forEach(function(card) {
    card.addEventListener('click', function() {
      var theme = this.getAttribute('data-theme');
      var btn = document.querySelector('#theme-filter [data-filter="' + theme + '"]');
      if (btn) {
        btn.click();
        document.getElementById('theme-filter').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
