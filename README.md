# Metis Rewards Widget

A React-based embeddable widget that displays the status of Metis rewards distribution.

## Features

- Real-time status display of rewards distribution
- Animated status indicators
- Responsive design
- Easy to embed in any website

## Installation

1. Include the widget script and styles in your HTML:

```html
<script>
  window.METIS_WIDGET_BASE = 'https://path-to-your-assets/';
</script>
<div id="metis-widget"></div>
<script src="https://path-to-your-assets/embed.js"></script>
```

2. Initialize the widget:

```html
<script>
  window.initMetisWidget('metis-widget');
</script>
```

## Configuration

### Base URL

Set the `METIS_WIDGET_BASE` variable to specify the base URL where your widget assets are hosted:

```javascript
window.METIS_WIDGET_BASE = 'https://path-to-your-assets/';
```

### Container Element

The widget requires a container element with a specific ID. You can create one like this:

```html
<div id="metis-widget"></div>
```

## Development

### Prerequisites

- Node.js 16+
- npm 8+

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the development server:

```bash
npm run start
```

### Building

Build the widget for production:

```bash
npm run build
```

This will create:
- `dist/embed.iife.js` - The main widget script
- `dist/style.css` - Widget styles
- `dist/embed.js` - Widget loader script
- `dist/example-embed.html` - Example implementation

## Deployment

### Manual Deployment to Vercel

1. Fork this repository to your GitHub account
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your forked repository
5. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Click "Deploy"

The widget will be available at your Vercel deployment URL.

## License

MIT
