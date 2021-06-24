/* Main module for Along the Longing JavaScript files */

import { initAphorisms } from "./js_modules/aphorisms.js";
import { initManifesto } from "./js_modules/manifesto.js";

// Initialize current page

if (window.location.pathname === '/aphorisms') {
    initAphorisms();
} else if (window.location.pathname === '/manifesto') {
    initManifesto();
}