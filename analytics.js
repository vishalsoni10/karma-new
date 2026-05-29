/**
 * Vercel Web Analytics Integration
 * Initializes analytics tracking for the Karma Event Management website
 * 
 * This script loads the Vercel Analytics tracking code.
 * It will automatically track page views and provide insights in your Vercel dashboard.
 */

(function() {
  // Initialize the Vercel Analytics queue
  window.va = window.va || function () { 
    (window.vaq = window.vaq || []).push(arguments); 
  };
  
  // Track initial page view
  window.va('pageview');
})();
