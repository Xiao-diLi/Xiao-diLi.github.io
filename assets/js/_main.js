/* ==========================================================================
   Various functions that we want to use within the template
   ========================================================================== */

const browserPref = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light';

// Determine the expected state of the theme toggle, which can be "dark", "light", or
// "system". Default is "system".
let determineThemeSetting = () => {
  let themeSetting = localStorage.getItem("theme");
  return (themeSetting != "dark" && themeSetting != "light" && themeSetting != "system") ? "system" : themeSetting;
};

// Determine the computed theme, which can be "dark" or "light". If the theme setting is
// "system", the computed theme is determined based on the user's system preference.
let determineComputedTheme = () => {
  let themeSetting = determineThemeSetting();
  if (themeSetting != "system") {
    return themeSetting;
  }
  return browserPref;
};

// Set the theme on page load or when explicitly called
let setTheme = (theme) => {
  const use_theme =
    theme ||
    localStorage.getItem("theme") ||
    $("html").attr("data-theme") ||
    browserPref;

  if (use_theme === "dark") {
    $("html").attr("data-theme", "dark");
    $("#theme-icon").removeClass("fa-sun").addClass("fa-moon");
    $('meta[name="theme-color"]').attr("content", "#0d1117");
  } else if (use_theme === "light") {
    $("html").removeAttr("data-theme");
    $("#theme-icon").removeClass("fa-moon").addClass("fa-sun");
    $('meta[name="theme-color"]').attr("content", "#f8fafc");
  }
};

// Toggle the theme manually
var toggleTheme = () => {
  const current_theme = $("html").attr("data-theme");
  const new_theme = current_theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", new_theme);
  setTheme(new_theme);
};

/* ==========================================================================
   Plotly integration script so that Markdown codeblocks will be rendered
   ========================================================================== */

// Read the Plotly data from the code block, hide it, and render the chart as new node. This allows for the 
// JSON data to be retrieve when the theme is switched.
import { plotlyDarkLayout, plotlyLightLayout } from './theme.js';       
document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") {
    document.querySelectorAll("pre>code.language-plotly").forEach((elem) => {
      // Parse the Plotly JSON data and hide it
      var jsonData = JSON.parse(elem.textContent);
      elem.parentElement.classList.add("hidden");

      // Add the Plotly node
      let chartElement = document.createElement("div");
      elem.parentElement.after(chartElement);      

      // Set the theme for the plot and render it
      const theme = (determineComputedTheme() === "dark") ? plotlyDarkLayout : plotlyLightLayout;
      if (jsonData.layout) {
        jsonData.layout.template = (jsonData.layout.template) ? { ...theme, ...jsonData.layout.template } : theme;
      } else {
        jsonData.layout = { template: theme };
      }
      Plotly.react(chartElement, jsonData.data, jsonData.layout);
    });
  }
});

/* ==========================================================================
   Actions that should occur when the page has been fully loaded
   ========================================================================== */

$(document).ready(function () {
  setTheme();

  // if user hasn't chosen a theme, follow OS changes
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });

  $('#theme-toggle').on('click', toggleTheme);

  // Optional visual style toggle (Default Modern <-> Archival Paper)
  $('#style-toggle').on('click', function () {
    var isArchival = $('html').attr('data-style') === 'archival';
    if (isArchival) {
      $('html').removeAttr('data-style');
      try { localStorage.setItem('site-style', 'default'); } catch (e) {}
    } else {
      $('html').attr('data-style', 'archival');
      try { localStorage.setItem('site-style', 'archival'); } catch (e) {}
    }
  });

  // Subtle scroll elevation on masthead
  var updateMastheadScroll = function () {
    $('.masthead').toggleClass('masthead--scrolled', $(window).scrollTop() > 12);
  };
  updateMastheadScroll();
  $(window).on('scroll', updateMastheadScroll);

  // Interactive publication filter
  var $pubFilterButtons = $('.pub-filter-btn');
  if ($pubFilterButtons.length) {
    var isZhPage = document.documentElement.lang && document.documentElement.lang.indexOf('zh') === 0;
    $pubFilterButtons.on('click', function () {
      var filter = $(this).data('pub-filter');
      $pubFilterButtons.removeClass('is-active').attr('aria-pressed', 'false');
      $(this).addClass('is-active').attr('aria-pressed', 'true');

      $('.pub-year-group').each(function () {
        var $group = $(this);
        var visibleCount = 0;
        $group.find('.pub-card').each(function () {
          var $card = $(this);
          var match = filter === 'all' || $card.data('pub-type') === filter;
          $card.toggleClass('is-hidden', !match);
          if (match) {
            visibleCount += 1;
          }
        });
        $group.toggleClass('is-hidden', visibleCount === 0);
        if (visibleCount > 0) {
          var label = isZhPage
            ? visibleCount + ' 篇'
            : visibleCount + (visibleCount === 1 ? ' paper' : ' papers');
          $group.find('.pub-year-count').text(label);
        }
      });
    });
  }

  // These should be the same as the settings in _variables.scss
  const scssLarge = 925; // pixels

  // Sticky footer
  var bumpIt = function () {
    $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
  },
    didResize = false;

  bumpIt();

  $(window).resize(function () {
    didResize = true;
  });
  setInterval(function () {
    if (didResize) {
      didResize = false;
      bumpIt();
    }
  }, 250);

  // FitVids init
  fitvids();

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

  // init smooth scroll, this needs to be slightly more than then fixed masthead height
  $("a").smoothScroll({ 
    offset: -75, // needs to match $masthead-height
    preventDefault: false,
  }); 

  // add lightbox class to all image links
  // Add "image-popup" to links ending in image extensions,
  // but skip any <a> that already contains an <img>
  $("a[href$='.jpg'],\
  a[href$='.jpeg'],\
  a[href$='.JPG'],\
  a[href$='.png'],\
  a[href$='.gif'],\
  a[href$='.webp']")
      .not(':has(img)')
      .addClass("image-popup");

  // 1) Wrap every <p><img> (except emoji images) in an <a> pointing at the image, and give it the lightbox class
  $('p > img').not('.emoji').each(function() {
    var $img = $(this);
    // skip if it’s already wrapped in an <a.image-popup>
    if ( ! $img.parent().is('a.image-popup') ) {
      $('<a>')
        .addClass('image-popup')
        .attr('href', $img.attr('src'))
        .insertBefore($img)   // place the <a> right before the <img>
        .append($img);        // move the <img> into the <a>
    }
  });

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-zoom-in',
    callbacks: {
      beforeOpen: function () {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
      }
    },
    closeOnContentClick: true,
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

});
