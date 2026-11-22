/* ==========================================================================
   Various functions that we want to use within the template
   ========================================================================== */

/*jslint es6 */
'use strict';

// Constants for CDNs

// Detect OS/browser preference
const browserPref = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Determine the computed theme, which can be "dark" or "light".
function determineComputedTheme() {
  // Determine the expected state of the theme toggle, which can be "dark", "light", or default "system"
  let themeSetting = localStorage.getItem("theme");
  themeSetting = (themeSetting != "dark" && themeSetting != "light" && themeSetting != "system") ? "system" : themeSetting;

  // Return the setting if set, or use the browser preference
  if (themeSetting != "system") {
    return themeSetting;
  }
  return browserPref ? "dark" : "light";
}

// Set the theme on page load or when explicitly called. Without an argument the
// theme is the stored preference or, failing that, the OS/browser preference.
function setTheme(theme) {
  const use_theme = theme || determineComputedTheme();

  if (use_theme === "dark") {
    $("html").attr("data-theme", "dark");
    $("#theme-icon").removeClass("fa-sun").addClass("fa-moon");
  } else if (use_theme === "light") {
    $("html").removeAttr("data-theme");
    $("#theme-icon").removeClass("fa-moon").addClass("fa-sun");
  }
}

/* ==========================================================================
   Actions that should occur when the page has been fully loaded
   ========================================================================== */

$(document).ready(function () {
  // Kramdown supplies the permalink; move it after the heading when scripts run.
  document.querySelectorAll(":is(.page__content, .archive) :is(h1, h2, h3, h4, h5, h6)[id]").forEach(heading => {
    const link = heading.firstElementChild;
    if (link && link.matches("a[href^='#']:empty") && link.getAttribute("href") === "#" + heading.id) {
      link.classList.add("heading-permalink");
      link.setAttribute("aria-label", "Permalink");
      heading.appendChild(link);
    }
  });

  // SCSS SETTINGS - These should be the same as the settings in the relevant files
  const scssLarge = 925;          // pixels, from /_sass/_themes.scss
  const scssMastheadHeight = 70;  // pixels, from the current theme (e.g., /_sass/theme/_default.scss)

  // If the user hasn't chosen a theme, follow the OS preference
  setTheme();
  window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener("change", (e) => {
          if (!localStorage.getItem("theme")) {
            setTheme(e.matches ? "dark" : "light");
          }
        });

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function () {
    $(".author__urls").fadeToggle("fast", function () { });
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // Restore the follow menu if toggled on a window resize
  jQuery(window).on('resize', function () {
    if ($('.author__urls.social-icons').css('display') == 'none' && $(window).width() >= scssLarge) {
      $(".author__urls").css('display', 'block')
    }
  });

});
