/**
 * Custom JavaScript for Blog Enhancements
 * Includes: Reading Progress, Lazy Loading, Performance Optimizations
 */

document.addEventListener('DOMContentLoaded', function() {

  // =====================
  // Reading Progress Bar
  // =====================
  function createProgressBar() {
    // Check if we're on a blog post page
    const article = document.querySelector('article.md-content__inner');
    if (!article) return;

    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);

    // Update progress on scroll
    function updateProgress() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // =====================
  // Lazy Loading Images
  // =====================
  function setupLazyLoading() {
    const images = document.querySelectorAll('img:not([loading])');

    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });

    // Add intersection observer for better control
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  // =====================
  // Enhanced Code Blocks
  // =====================
  function enhanceCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(block => {
      // Add line numbers if not present
      if (!block.classList.contains('has-line-numbers')) {
        const lines = block.textContent.split('\n').length;
        block.setAttribute('data-line-count', lines);
      }

      // Add language label
      const language = Array.from(block.classList)
        .find(cls => cls.startsWith('language-'));

      if (language) {
        const label = language.replace('language-', '').toUpperCase();
        const labelEl = document.createElement('div');
        labelEl.className = 'code-language-label';
        labelEl.textContent = label;
        block.parentElement.insertBefore(labelEl, block);
      }
    });
  }

  // =====================
  // External Links
  // =====================
  function handleExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');

    links.forEach(link => {
      // Skip links to the same domain
      if (link.hostname === window.location.hostname) return;

      // Add external link indicator
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');

      // Add icon if not already present
      if (!link.querySelector('.external-link-icon')) {
        const icon = document.createElement('span');
        icon.className = 'external-link-icon';
        icon.innerHTML = ' ↗';
        link.appendChild(icon);
      }
    });
  }

  // =====================
  // Smooth Scroll for Anchors
  // =====================
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update URL without triggering scroll
          history.pushState(null, null, href);
        }
      });
    });
  }

  // =====================
  // Copy Code Button Enhancement
  // =====================
  function enhanceCopyButtons() {
    const copyButtons = document.querySelectorAll('.md-clipboard');

    copyButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Visual feedback
        const originalTitle = button.getAttribute('title');
        button.setAttribute('title', 'Copied!');
        button.classList.add('copied');

        setTimeout(() => {
          button.setAttribute('title', originalTitle);
          button.classList.remove('copied');
        }, 2000);
      });
    });
  }

  // =====================
  // Table of Contents Highlight
  // =====================
  function highlightTOC() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        if (!id) return;

        const tocLink = document.querySelector(`.md-nav a[href="#${id}"]`);
        if (tocLink) {
          if (entry.isIntersecting) {
            tocLink.classList.add('active');
          } else {
            tocLink.classList.remove('active');
          }
        }
      });
    }, {
      rootMargin: '-20% 0px -35% 0px'
    });

    // Observe all headings
    document.querySelectorAll('h2[id], h3[id]').forEach(heading => {
      observer.observe(heading);
    });
  }

  // =====================
  // Reading Time Estimator
  // =====================
  function addReadingTime() {
    const article = document.querySelector('article.md-content__inner');
    if (!article) return;

    const text = article.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

    // Add reading time to post meta if it doesn't exist
    const metaSection = document.querySelector('.md-meta');
    if (metaSection && !metaSection.querySelector('.reading-time')) {
      const readingTimeEl = document.createElement('span');
      readingTimeEl.className = 'reading-time';
      readingTimeEl.innerHTML = ` • ${readingTime} min read`;
      metaSection.appendChild(readingTimeEl);
    }
  }

  // =====================
  // Performance: Prefetch Links on Hover
  // =====================
  function setupLinkPrefetch() {
    const links = document.querySelectorAll('a[href^="/"], a[href^="./"]');

    links.forEach(link => {
      link.addEventListener('mouseenter', function() {
        const href = this.getAttribute('href');
        if (href && !document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.href = href;
          document.head.appendChild(prefetchLink);
        }
      }, { once: true });
    });
  }

  // =====================
  // Print Optimization
  // =====================
  function setupPrintOptimization() {
    window.addEventListener('beforeprint', function() {
      // Expand all collapsed sections
      document.querySelectorAll('details').forEach(detail => {
        detail.setAttribute('open', '');
      });
    });
  }

  // =====================
  // Initialize All Features
  // =====================
  createProgressBar();
  setupLazyLoading();
  enhanceCodeBlocks();
  handleExternalLinks();
  setupSmoothScroll();
  enhanceCopyButtons();
  highlightTOC();
  addReadingTime();
  setupLinkPrefetch();
  setupPrintOptimization();

  // =====================
  // Console Easter Egg
  // =====================
  console.log('%c👋 Hello, curious developer!', 'font-size: 20px; font-weight: bold; color: #667eea;');
  console.log('%cInterested in how this site works?', 'font-size: 14px; color: #666;');
  console.log('%cCheck out the source: https://github.com/Alphagon/Alphagon.github.io', 'font-size: 12px; color: #999;');
});

// =====================
// Service Worker for Offline Support (Optional)
// =====================
if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(
      function(registration) {
        console.log('ServiceWorker registration successful');
      },
      function(err) {
        console.log('ServiceWorker registration failed: ', err);
      }
    );
  });
}
