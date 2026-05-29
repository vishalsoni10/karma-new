# Vercel Speed Insights Setup

This document describes the Vercel Speed Insights configuration for the Karma Event Management website.

## Implementation Details

### What is Speed Insights?

Vercel Speed Insights provides real-time performance monitoring for your website, tracking Core Web Vitals and other performance metrics directly from real user visits.

### Implementation Approach

Since this is a **static HTML website** without a JavaScript framework, we've implemented Speed Insights using the recommended manual script injection method from the [official Vercel documentation](https://vercel.com/docs/speed-insights/quickstart).

### Files Modified

1. **index.html** - Main website page
2. **admin.html** - Admin panel page

Both files now include the Speed Insights tracking scripts before the closing `</body>` tag:

```html
<!-- Vercel Speed Insights -->
<script>
  window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
</script>
<script defer src="/_vercel/speed-insights/script.js"></script>
```

### Configuration Files Created

1. **package.json** - Includes `@vercel/speed-insights` package (v1.3.1)
2. **vercel.json** - Vercel deployment configuration with security headers
3. **.gitignore** - Excludes node_modules and build artifacts
4. **build.js** - Optional build script for automated injection (not required for deployment)

## How It Works

1. The Speed Insights script is loaded asynchronously (deferred) from Vercel's CDN
2. Vercel automatically serves the script at `/_vercel/speed-insights/script.js` when:
   - The project is deployed to Vercel
   - Speed Insights is enabled in the Vercel dashboard
3. The script collects real user performance metrics including:
   - First Contentful Paint (FCP)
   - Largest Contentful Paint (LCP)
   - Cumulative Layout Shift (CLS)
   - First Input Delay (FID)
   - Time to First Byte (TTFB)

## Enabling Speed Insights in Vercel

To activate Speed Insights for this project:

1. Deploy the project to Vercel
2. Go to your project dashboard on Vercel
3. Navigate to **Analytics** → **Speed Insights**
4. Click **Enable Speed Insights**
5. Redeploy the project (if needed)

After deployment, Speed Insights will automatically start collecting metrics from real user visits.

## Viewing Performance Data

Once enabled and deployed:

1. Visit your Vercel project dashboard
2. Navigate to **Analytics** → **Speed Insights**
3. View real-time performance metrics and Core Web Vitals
4. Filter by page, time range, and other dimensions

## Package Information

- **Package**: `@vercel/speed-insights`
- **Version**: 1.3.1
- **Documentation**: https://vercel.com/docs/speed-insights
- **GitHub**: https://github.com/vercel/speed-insights

## Local Development

For local development, you can use any static file server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js http-server (install globally first)
npx http-server -p 8000
```

Note: Speed Insights will only track metrics on the production Vercel deployment, not in local development.

## Build Script (Optional)

A `build.js` script is included for automated injection of the Speed Insights code. This is optional since the scripts are already manually injected. To run it:

```bash
npm run build
```

The script will check if Speed Insights is already present and only inject if missing.

## Performance Impact

The Speed Insights script:
- Is loaded with the `defer` attribute (non-blocking)
- Has minimal performance impact (~5KB gzipped)
- Only runs after the page has loaded
- Does not affect Core Web Vitals measurements

## Support & Documentation

- [Speed Insights Quickstart](https://vercel.com/docs/speed-insights/quickstart)
- [Speed Insights API Reference](https://vercel.com/docs/speed-insights/api)
- [Core Web Vitals Guide](https://web.dev/vitals/)

---

**Implementation Date**: May 29, 2026  
**Implemented By**: Vade (Vercel Code Generation Agent)
