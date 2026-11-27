(function () {
  var root = document.documentElement;
  var stage = document.getElementById('desert-cover');
  if (!stage) return;

  var frame = document.getElementById('cover-photo-frame');
  var bgImg = stage.querySelector('.cover-bg-img');
  var canvas = document.getElementById('cover-canvas');
  var toneBtn = document.getElementById('cover-tone-toggle');
  var isZh = root.lang && root.lang.indexOf('zh') === 0;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var rafId = null;
  var animating = false;
  var mainTimer = null;
  var cleanupTimer = null;

  // Enable smooth transitions only after first paint so #home starts dismissed with zero flash
  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () {
      root.classList.add('js-cover-ready');
    });
  });

  function isCoverOpen() {
    return !root.classList.contains('cover-dismissed');
  }

  function clearInlineFrameStyles() {
    if (!frame) return;
    frame.style.transition = '';
    frame.style.top = '';
    frame.style.left = '';
    frame.style.width = '';
    frame.style.height = '';
    frame.style.borderRadius = '';
    frame.style.boxShadow = '';
    if (bgImg) {
      bgImg.style.transition = '';
      bgImg.style.filter = '';
      bgImg.style.objectPosition = '';
    }
  }

  function getTargetHeroMetrics() {
    var heroEl = document.querySelector('.home-hero');
    if (!heroEl) return null;
    var heroImg = heroEl.querySelector('.home-hero__img') || heroEl;
    var rect = heroImg.getBoundingClientRect();
    if (!rect || rect.width < 40 || rect.height < 40) return null;
    var heroStyle = window.getComputedStyle(heroEl);
    var imgStyle = window.getComputedStyle(heroImg);
    var radius = heroStyle.borderRadius || '16px';
    var imgFilter = imgStyle.filter && imgStyle.filter !== 'none' ? imgStyle.filter : 'brightness(1) contrast(1) saturate(1)';
    var imgObjPos = imgStyle.objectPosition || '62% 60%';
    var heroShadow = heroStyle.boxShadow && heroStyle.boxShadow !== 'none' ? heroStyle.boxShadow : 'none';
    return {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      radius: radius,
      filter: imgFilter,
      objectPosition: imgObjPos,
      boxShadow: heroShadow
    };
  }

  function dismissCover() {
    if (!isCoverOpen() || animating) return;
    window.clearTimeout(mainTimer);
    window.clearTimeout(cleanupTimer);

    if (reduced) {
      root.classList.add('cover-dismissed');
      stage.setAttribute('aria-hidden', 'true');
      try {
        if (window.location.hash !== '#home') {
          history.replaceState(null, '', window.location.pathname + window.location.search + '#home');
        }
      } catch (e) {}
      return;
    }

    window.scrollTo(0, 0);
    var target = getTargetHeroMetrics();
    animating = true;

    if (!target || !frame) {
      // Fallback soft fade if page has no .home-hero
      root.classList.add('cover-entering', 'cover-revealing');
      mainTimer = window.setTimeout(function () {
        animating = false;
        root.classList.remove('cover-entering', 'cover-revealing');
        root.classList.add('cover-dismissed');
        stage.setAttribute('aria-hidden', 'true');
        try {
          if (window.location.hash !== '#home') {
            history.replaceState(null, '', window.location.pathname + window.location.search + '#home');
          }
        } catch (e) {}
      }, 1350);
      return;
    }

    // Shared-Element Morph: pin frame cleanly at full viewport first, then morph to exact .home-hero rect
    clearInlineFrameStyles();
    frame.style.transition = 'none';
    frame.style.left = '0px';
    frame.style.top = '0px';
    frame.style.width = W + 'px';
    frame.style.height = H + 'px';
    frame.style.borderRadius = '0px';
    void frame.offsetWidth;

    root.classList.add('cover-morphing', 'cover-entering', 'cover-revealing');

    // Animate the desert photo frame directly into .home-hero over 2.0s total
    var morphEase = 'cubic-bezier(0.22, 1, 0.36, 1)';
    frame.style.transition =
      'left 1.84s ' + morphEase + ' 0.14s, ' +
      'top 1.84s ' + morphEase + ' 0.14s, ' +
      'width 1.84s ' + morphEase + ' 0.14s, ' +
      'height 1.84s ' + morphEase + ' 0.14s, ' +
      'border-radius 1.76s ' + morphEase + ' 0.16s, ' +
      'box-shadow 1.65s ease 0.25s';

    if (bgImg) {
      bgImg.style.transition =
        'filter 1.75s ' + morphEase + ' 0.14s, ' +
        'object-position 1.84s ' + morphEase + ' 0.14s';
    }

    window.requestAnimationFrame(function () {
      frame.style.left = target.left + 'px';
      frame.style.top = target.top + 'px';
      frame.style.width = target.width + 'px';
      frame.style.height = target.height + 'px';
      frame.style.borderRadius = target.radius;
      frame.style.boxShadow = target.boxShadow;
      if (bgImg) {
        bgImg.style.filter = target.filter;
        bgImg.style.objectPosition = target.objectPosition;
      }
    });

    // Seamless zero-flash handoff right as the desert photo lands onto .home-hero at 2.0s
    mainTimer = window.setTimeout(function () {
      animating = false;
      root.classList.remove('js-cover-ready');
      root.classList.remove('cover-entering', 'cover-morphing');
      root.classList.add('cover-dismissed');
      stage.setAttribute('aria-hidden', 'true');
      clearInlineFrameStyles();
      void stage.offsetWidth;
      root.classList.add('js-cover-ready');

      try {
        if (window.location.hash !== '#home') {
          history.replaceState(null, '', window.location.pathname + window.location.search + '#home');
        }
      } catch (e) {}
    }, 2000);

    cleanupTimer = window.setTimeout(function () {
      root.classList.remove('cover-revealing');
    }, 2120);
  }

  function openCover() {
    if ((isCoverOpen() && !animating) || animating) return;
    window.clearTimeout(mainTimer);
    window.clearTimeout(cleanupTimer);

    window.scrollTo(0, 0);

    if (reduced || !frame) {
      root.classList.remove('cover-entering', 'cover-revealing', 'cover-morphing', 'cover-returning', 'cover-dismissed');
      stage.removeAttribute('aria-hidden');
      try {
        if (window.location.hash === '#home') {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      } catch (e) {}
      rebuildSky();
      startLoop();
      return;
    }

    var target = getTargetHeroMetrics();
    animating = true;

    if (!target) {
      root.classList.remove('cover-entering', 'cover-revealing', 'cover-morphing', 'cover-dismissed');
      stage.removeAttribute('aria-hidden');
      animating = false;
      try {
        if (window.location.hash === '#home') {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      } catch (e) {}
      rebuildSky();
      startLoop();
      return;
    }

    // Reverse Shared-Element Morph: start .cover-photo-frame right on top of .home-hero, then expand to full screen!
    clearInlineFrameStyles();
    root.classList.remove('js-cover-ready');
    root.classList.add('cover-morphing', 'cover-returning');
    root.classList.remove('cover-dismissed');
    stage.removeAttribute('aria-hidden');

    frame.style.transition = 'none';
    frame.style.left = target.left + 'px';
    frame.style.top = target.top + 'px';
    frame.style.width = target.width + 'px';
    frame.style.height = target.height + 'px';
    frame.style.borderRadius = target.radius;
    frame.style.boxShadow = target.boxShadow;
    if (bgImg) {
      bgImg.style.transition = 'none';
      bgImg.style.filter = target.filter;
      bgImg.style.objectPosition = target.objectPosition;
    }
    void frame.offsetWidth;
    root.classList.add('js-cover-ready');

    // Recompute sky dimensions for current viewport before starting star loop
    rebuildSky();
    startLoop();

    var morphEase = 'cubic-bezier(0.22, 1, 0.36, 1)';
    window.requestAnimationFrame(function () {
      frame.style.transition =
        'left 1.65s ' + morphEase + ', ' +
        'top 1.65s ' + morphEase + ', ' +
        'width 1.65s ' + morphEase + ', ' +
        'height 1.65s ' + morphEase + ', ' +
        'border-radius 1.55s ' + morphEase + ', ' +
        'box-shadow 1.1s ease';
      if (bgImg) {
        bgImg.style.transition =
          'filter 1.55s ' + morphEase + ', ' +
          'object-position 1.65s ' + morphEase;
      }

      root.classList.remove('cover-returning');
      frame.style.left = '0px';
      frame.style.top = '0px';
      frame.style.width = window.innerWidth + 'px';
      frame.style.height = window.innerHeight + 'px';
      frame.style.borderRadius = '0px';
      frame.style.boxShadow = 'none';
      if (bgImg) {
        bgImg.style.filter = '';
        bgImg.style.objectPosition = '';
      }
    });

    mainTimer = window.setTimeout(function () {
      animating = false;
      root.classList.remove('cover-morphing', 'cover-returning');
      clearInlineFrameStyles();
      try {
        if (window.location.hash === '#home') {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      } catch (e) {}
    }, 1820);
  }

  if (!isCoverOpen()) {
    stage.setAttribute('aria-hidden', 'true');
  }

  // Day / Night twilight atmosphere toggle
  if (toneBtn) {
    var applyTone = function (isDay) {
      stage.classList.toggle('cover-stage--day', isDay);
      toneBtn.textContent = isZh ? (isDay ? '夜' : '昼') : (isDay ? 'Night' : 'Day');
    };
    var savedTone = null;
    try { savedTone = localStorage.getItem('cover-tone'); } catch (e) {}
    applyTone(savedTone === 'day');
    toneBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var nextDay = !stage.classList.contains('cover-stage--day');
      applyTone(nextDay);
      try { localStorage.setItem('cover-tone', nextDay ? 'day' : 'night'); } catch (err) {}
    });
  }

  // Bottom-left "个人主页 / Home" link triggers the shared-element morph into the homepage
  stage.querySelectorAll('[data-cover-enter="true"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      dismissCover();
    });
  });

  // Navbar "封面 / Cover" link expands .home-hero seamlessly back to full-screen cover
  document.querySelectorAll('[data-open-cover="true"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      openCover();
    });
  });

  // Clicking anywhere on the desert cover launches the morph into .home-hero
  stage.addEventListener('click', function (e) {
    if (e.target.closest('a, button')) return;
    dismissCover();
  });

  stage.addEventListener('wheel', function (e) {
    if (isCoverOpen() && !animating && e.deltaY > 24) {
      dismissCover();
    }
  }, { passive: true });

  var touchStartY = null;
  stage.addEventListener('touchstart', function (e) {
    if (e.touches && e.touches.length === 1) {
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  stage.addEventListener('touchend', function (e) {
    if (touchStartY !== null && e.changedTouches && e.changedTouches.length === 1) {
      var dy = touchStartY - e.changedTouches[0].clientY;
      if (dy > 44 && isCoverOpen() && !animating) {
        dismissCover();
      }
    }
    touchStartY = null;
  }, { passive: true });

  document.addEventListener('keydown', function (e) {
    if (!isCoverOpen() || animating) return;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'Escape') {
      if (document.activeElement && document.activeElement.closest('a, button')) return;
      e.preventDefault();
      dismissCover();
    }
  });

  // ---------- Realistic Desert Night Sky with Pixel-Exact Dune Horizon Mask ----------
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0;

  var skyHorizon = null;
  var horizonCols = 320;
  var stars = [];
  var meteors = [];
  var nextMeteorAt = performance.now() + 4200;

  var STAR_COLORS = [
    [252, 253, 255],
    [248, 250, 255],
    [245, 248, 255],
    [224, 236, 255],
    [255, 244, 224]
  ];

  var FALLBACK_PROFILE = [
    [0.00, 0.58], [0.12, 0.49], [0.24, 0.44], [0.38, 0.49],
    [0.52, 0.59], [0.64, 0.61], [0.74, 0.66], [0.86, 0.78], [1.00, 0.87]
  ];

  function buildFallbackHorizon() {
    var arr = new Float32Array(horizonCols);
    for (var i = 0; i < horizonCols; i++) {
      var nx = i / (horizonCols - 1);
      var ny = 0.52;
      for (var j = 0; j < FALLBACK_PROFILE.length - 1; j++) {
        var a = FALLBACK_PROFILE[j];
        var b = FALLBACK_PROFILE[j + 1];
        if (nx >= a[0] && nx <= b[0]) {
          var t = (nx - a[0]) / (b[0] - a[0]);
          ny = a[1] + (b[1] - a[1]) * t;
          break;
        }
      }
      arr[i] = ny * H - 10;
    }
    return arr;
  }

  function computeExactHorizonFromPhoto() {
    if (!bgImg || !bgImg.complete || !bgImg.naturalWidth || !W || !H) {
      skyHorizon = buildFallbackHorizon();
      return;
    }
    try {
      var mw = horizonCols;
      var mh = Math.max(80, Math.round((mw * H) / W));
      var off = document.createElement('canvas');
      off.width = mw;
      off.height = mh;
      var octx = off.getContext('2d', { willReadFrequently: true });

      var iw = bgImg.naturalWidth;
      var ih = bgImg.naturalHeight;
      var scale = Math.max(mw / iw, mh / ih);
      var dw = iw * scale;
      var dh = ih * scale;
      var ox = (mw - dw) * 0.56;
      var oy = (mh - dh) * 0.58;
      octx.drawImage(bgImg, ox, oy, dw, dh);

      var data = octx.getImageData(0, 0, mw, mh).data;
      var arr = new Float32Array(mw);
      var yScale = H / mh;

      for (var col = 0; col < mw; col++) {
        var ridgeRow = mh;
        for (var row = 0; row < mh; row++) {
          var idx = (row * mw + col) * 4;
          var lum = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
          if (lum < 62) {
            ridgeRow = row;
            break;
          }
        }
        arr[col] = Math.max(0, ridgeRow * yScale - 6);
      }

      var eroded = new Float32Array(mw);
      for (var c = 0; c < mw; c++) {
        var minY = arr[c];
        for (var k = -2; k <= 2; k++) {
          var nc = Math.max(0, Math.min(mw - 1, c + k));
          if (arr[nc] < minY) minY = arr[nc];
        }
        eroded[c] = minY;
      }
      skyHorizon = eroded;
    } catch (e) {
      skyHorizon = buildFallbackHorizon();
    }
  }

  function getSkyLimitY(x) {
    if (!skyHorizon || !W) return H * 0.45;
    var f = (Math.max(0, Math.min(W, x)) / W) * (horizonCols - 1);
    var i0 = Math.floor(f);
    var i1 = Math.min(horizonCols - 1, i0 + 1);
    var t = f - i0;
    return skyHorizon[i0] * (1 - t) + skyHorizon[i1] * t;
  }

  function initStars() {
    stars = [];
    if (!W || !H) return;
    var areaScale = Math.max(0.75, Math.min(1.4, (W * H) / (1280 * 820)));
    var target = Math.round(320 * areaScale);
    var attempts = 0;

    while (stars.length < target && attempts < target * 5) {
      attempts++;
      var x = Math.random() * W;
      var limitY = getSkyLimitY(x);
      if (limitY < 16) continue;

      var y = Math.random() * limitY;

      var mag = Math.random();
      var r, baseAlpha, isBright;
      if (mag > 0.955) {
        r = 1.05 + Math.random() * 0.42;
        baseAlpha = 0.86 + Math.random() * 0.14;
        isBright = true;
      } else if (mag > 0.72) {
        r = 0.72 + Math.random() * 0.34;
        baseAlpha = 0.58 + Math.random() * 0.30;
        isBright = false;
      } else {
        r = 0.42 + Math.random() * 0.32;
        baseAlpha = 0.28 + Math.random() * 0.38;
        isBright = false;
      }

      var distAboveRidge = Math.max(0, limitY - y);
      var ridgeExtinction = distAboveRidge < 75 ? (0.18 + 0.82 * (distAboveRidge / 75)) : 1;
      var zenithBoost = 1 - (y / H) * 0.22;
      var alpha = Math.min(1, baseAlpha * ridgeExtinction * zenithBoost);

      var col = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
      stars.push({
        x: x,
        y: y,
        r: r,
        isBright: isBright,
        color: col,
        alpha: alpha,
        phase: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.018,
        twinkleAmp: distAboveRidge < 90 ? 0.28 : 0.16
      });
    }
  }

  function spawnMeteor(now) {
    var startX = W * (0.28 + Math.random() * 0.58);
    var startY = H * (0.04 + Math.random() * 0.18);
    var angle = Math.PI * (0.74 + Math.random() * 0.10);
    var speed = 9.5 + Math.random() * 5.5;
    meteors.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      length: 58 + Math.random() * 44,
      life: 0,
      maxLife: 28 + Math.random() * 14
    });
    nextMeteorAt = now + 5800 + Math.random() * 5500;
  }

  function rebuildSky() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    computeExactHorizonFromPhoto();
    initStars();
    if (reduced && isCoverOpen()) {
      drawFrame(performance.now());
    }
  }

  rebuildSky();
  window.addEventListener('resize', function () {
    if (!animating) rebuildSky();
  });
  if (bgImg && !bgImg.complete) {
    bgImg.addEventListener('load', rebuildSky);
  }

  function drawFrame(now) {
    ctx.clearRect(0, 0, W, H);
    if (stage.classList.contains('cover-stage--day')) return;

    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      if (!reduced) s.phase += s.speed;
      var shimmer = 1 - s.twinkleAmp + s.twinkleAmp * (0.5 + 0.5 * Math.sin(s.phase));
      var a = s.alpha * shimmer;
      var rgb = s.color[0] + ',' + s.color[1] + ',' + s.color[2];

      if (s.isBright) {
        var hr = s.r * 2.5;
        var g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, hr);
        g.addColorStop(0, 'rgba(' + rgb + ', ' + (a * 0.34).toFixed(3) + ')');
        g.addColorStop(1, 'rgba(' + rgb + ', 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.x, s.y, hr, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = 'rgba(' + rgb + ', ' + a.toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!reduced && !animating) {
      if (now >= nextMeteorAt && meteors.length < 1) {
        spawnMeteor(now);
      }
      for (var m = meteors.length - 1; m >= 0; m--) {
        var mt = meteors[m];
        mt.x += mt.vx;
        mt.y += mt.vy;
        mt.life += 1;
        var ratio = mt.life / mt.maxLife;
        if (ratio >= 1 || mt.y >= getSkyLimitY(mt.x) - 8) {
          meteors.splice(m, 1);
          continue;
        }
        var fade = ratio < 0.22 ? ratio / 0.22 : 1 - (ratio - 0.22) / 0.78;
        var spd = Math.hypot(mt.vx, mt.vy) || 1;
        var tx = mt.x - (mt.vx / spd) * mt.length * fade;
        var ty = mt.y - (mt.vy / spd) * mt.length * fade;
        var mg = ctx.createLinearGradient(tx, ty, mt.x, mt.y);
        mg.addColorStop(0, 'rgba(235, 242, 255, 0)');
        mg.addColorStop(1, 'rgba(255, 255, 255, ' + (fade * 0.78).toFixed(3) + ')');
        ctx.strokeStyle = mg;
        ctx.lineWidth = 0.95;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(mt.x, mt.y);
        ctx.stroke();
      }
    }
  }

  function loop(now) {
    rafId = null;
    if (isCoverOpen() || animating) {
      drawFrame(now);
    }
    if (!reduced && (isCoverOpen() || animating)) {
      rafId = window.requestAnimationFrame(loop);
    }
  }

  function startLoop() {
    if (rafId === null) {
      rafId = window.requestAnimationFrame(loop);
    }
  }

  if (isCoverOpen()) {
    if (reduced) {
      drawFrame(performance.now());
    } else {
      startLoop();
    }
  }
})();
