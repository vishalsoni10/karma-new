#!/usr/bin/env node

/**
 * Build script to inject Vercel Speed Insights into static HTML files
 * This script adds the Speed Insights tracking code before the closing body tag
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const SPEED_INSIGHTS_SCRIPT = `
<!-- Vercel Speed Insights -->
<script>
  window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
</script>
<script defer src="/_vercel/speed-insights/script.js"></script>`;

function injectSpeedInsights(filePath) {
  console.log(`Processing ${filePath}...`);
  
  let content = readFileSync(filePath, 'utf-8');
  
  // Check if already injected
  if (content.includes('speed-insights')) {
    console.log(`  ✓ Speed Insights already present in ${filePath}`);
    return false;
  }
  
  // Inject before closing body tag
  const bodyCloseRegex = /(<\/body>)/i;
  if (bodyCloseRegex.test(content)) {
    content = content.replace(bodyCloseRegex, `${SPEED_INSIGHTS_SCRIPT}\n$1`);
    writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✓ Speed Insights injected into ${filePath}`);
    return true;
  } else {
    console.log(`  ✗ No closing body tag found in ${filePath}`);
    return false;
  }
}

// Process HTML files
const files = ['index.html', 'admin.html'];
let injectedCount = 0;

files.forEach(file => {
  if (injectSpeedInsights(file)) {
    injectedCount++;
  }
});

console.log(`\n✨ Build complete! Speed Insights injected into ${injectedCount} file(s).`);
