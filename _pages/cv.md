---
layout: archive
title: "Curriculum Vitae"
seo_title: "CV | Li Xiaodi (李逍迪)"
description: "Curriculum Vitae of Li Xiaodi: education, research experience at iFLYTEK Research, Fudan University, Turing Quantum, and USTC, and full publication list."
permalink: /cv/
lang: en
og_locale: en_US
alternate_og_locale: zh_CN
alternate_lang: zh-CN
alternate_url: /zh/cv/
x_default_url: /cv/
author_profile: true
redirect_from:
  - /resume
---

{%- include base_path -%}

<div class="cv-toolbar">
  <p class="cv-toolbar__summary">Researcher at iFLYTEK Research · Ph.D. in Physics, Zhejiang University</p>
  <button type="button" class="cv-print-btn" onclick="window.print()"><i class="fas fa-print" aria-hidden="true"></i><span>Print / Save PDF</span></button>
</div>

<section class="cv-section">
  <h2 class="cv-section__title">Education</h2>
  <ul class="cv-entries">
  <li class="cv-entry">
  <div class="cv-entry__period">2016 – 2021</div>
  <div class="cv-entry__content">
  <div class="cv-entry__role">Ph.D. in Physics</div>
  <div class="cv-entry__org">Department of Physics, Zhejiang University · Hangzhou</div>
  </div>
  </li>
  <li class="cv-entry">
  <div class="cv-entry__period">2012 – 2016</div>
  <div class="cv-entry__content">
  <div class="cv-entry__role">B.S. in Physics</div>
  <div class="cv-entry__org">School of Physics, Shandong University · Jinan</div>
  </div>
  </li>
  </ul>
</section>

<section class="cv-section">
  <h2 class="cv-section__title">Work Experience</h2>
  <ul class="cv-entries">
  <li class="cv-entry">
  <div class="cv-entry__period">2025/10 – Present</div>
  <div class="cv-entry__content">
  <div class="cv-entry__role">Researcher</div>
  <div class="cv-entry__org">iFLYTEK Research · Hefei</div>
  <div class="cv-entry__detail">Research: quantum computation, quantum AI, neutral-atom quantum computing</div>
  </div>
  </li>
  <li class="cv-entry">
  <div class="cv-entry__period">2023/06 – 2025/10</div>
  <div class="cv-entry__content">
  <div class="cv-entry__role">Postdoctoral Researcher</div>
  <div class="cv-entry__org">Fudan University · Shanghai</div>
  <div class="cv-entry__detail">Research: quantum state verification, entanglement certification, quantum information masking</div>
  </div>
  </li>
  <li class="cv-entry">
  <div class="cv-entry__period">2022/06 – 2023/06</div>
  <div class="cv-entry__content">
  <div class="cv-entry__role">Quantum Algorithm Engineer</div>
  <div class="cv-entry__org">Turing Quantum (图灵量子) · Shanghai</div>
  <div class="cv-entry__detail">Quantum algorithm development and engineering</div>
  </div>
  </li>
  <li class="cv-entry">
  <div class="cv-entry__period">2021/07 – 2022/05</div>
  <div class="cv-entry__content">
  <div class="cv-entry__role">Postdoctoral Researcher</div>
  <div class="cv-entry__org">University of Science and Technology of China (USTC) · Hefei</div>
  <div class="cv-entry__detail">Research: theoretical high-energy physics, scattering amplitudes</div>
  </div>
  </li>
  </ul>
</section>

<section class="cv-section">
  <div class="cv-section__header-row">
  <h2 class="cv-section__title">Publications <span class="cv-section__count">{{ site.publications | size }}</span></h2>
  <a class="cv-section__link" href="{{ base_path }}/publications/">View with abstracts <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
  </div>
  <ol class="cv-pub-list">
{%- assign cv_pubs = site.publications | sort: "date" | reverse -%}
{%- for post in cv_pubs -%}
{%- include archive-single-cv.html -%}
{%- endfor -%}
  </ol>
</section>
