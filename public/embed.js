(function() {
  // Create widget container
  function createWidgetContainer() {
    const container = document.createElement('div');
    container.className = 'metis-widget-embedded';
    return container;
  }

  // Load required styles
  function loadStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    const base = window.METIS_WIDGET_BASE || '/';
    link.href = base + 'style.css';
    document.head.appendChild(link);
  }

  // Initialize widget
  window.initMetisWidget = function(elementId) {
    const targetElement = document.getElementById(elementId);
    if (!targetElement) {
      console.error('Target element not found:', elementId);
      return;
    }

    const container = createWidgetContainer();
    targetElement.appendChild(container);
    loadStyles();

    const base = window.METIS_WIDGET_BASE || '/';
    
    // Load scripts sequentially
    function loadScript(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    // Load scripts sequentially
    loadScript('https://unpkg.com/react@18/umd/react.production.min.js')
      .then(() => loadScript('https://unpkg.com/react-dom@18/umd/react-dom.production.min.js'))
      .then(() => loadScript(base + 'embed.iife.js'))
      .then(() => {
        if (window.embedMetisWidget) {
          window.embedMetisWidget(container);
        } else {
          console.error('Widget embedding function not found');
        }
      })
      .catch(error => {
        console.error('Error loading scripts:', error);
      });
  };
})();
