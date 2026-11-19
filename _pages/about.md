---
permalink: /
title: "Li Xiaodi (李逍迪)"
seo_title: "Li Xiaodi (李逍迪) | Quantum Computing Researcher"
description: "Li Xiaodi is a researcher at iFLYTEK Research working on quantum computation, quantum information theory, quantum AI, and neutral-atom quantum computing."
lang: en
og_locale: en_US
alternate_og_locale: zh_CN
alternate_lang: zh-CN
alternate_url: /zh/
x_default_url: /
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

{%- include base_path -%}

<div class="home-eyebrow">
  <span class="home-eyebrow__dot" aria-hidden="true"></span>
  <span>iFLYTEK Research · Quantum Computing &amp; Quantum AI</span>
</div>

I am a researcher at **iFLYTEK Research**, working on **quantum computation**, **quantum information theory**, and **quantum AI**.
{: .home-lead}

<div class="home-metrics" aria-label="Academic highlights">
  <div class="home-metric">
  <span class="home-metric__value">{{ site.publications | size }}</span>
  <span class="home-metric__label">Papers &amp; Preprints</span>
  </div>
  <div class="home-metric">
  <span class="home-metric__value">PRX Quantum · JHEP · PRD</span>
  <span class="home-metric__label">Published Venues</span>
  </div>
  <div class="home-metric">
  <span class="home-metric__value">Ph.D. Physics</span>
  <span class="home-metric__label">Zhejiang University</span>
  </div>
</div>

During my Ph.D. at Zhejiang University (2016–2021), I focused on theoretical high-energy physics, particularly on **scattering amplitudes** and **Feynman integral reduction**, developing new algebraic and differential-operator methods for computing one-loop integrals and expanding Einstein-Yang-Mills amplitudes. After graduating, I continued this line of research as a postdoctoral fellow at the University of Science and Technology of China (USTC).

In 2022, I joined Turing Quantum (Shanghai) as a quantum algorithm engineer, where I gained hands-on experience bridging quantum theory with practical algorithm development. From 2023 to 2025, I was a postdoctoral researcher at Fudan University, where my work shifted toward **quantum information theory** — including quantum state verification via classical shadows, entanglement certification, and quantum information masking. I am now at **iFLYTEK Research**, exploring the intersection of quantum computing and artificial intelligence, and **neutral-atom array quantum computing**.

## Research Interests

<div class="research-grid">
  <div class="research-card">
  <div class="research-card__icon" aria-hidden="true"><i class="fas fa-shield-halved"></i></div>
  <div class="research-card__body">
  <h3>Quantum State Verification</h3>
  <p>Classical shadow protocols and sample-efficient verification of quantum states.</p>
  </div>
  </div>
  <div class="research-card">
  <div class="research-card__icon" aria-hidden="true"><i class="fas fa-diagram-project"></i></div>
  <div class="research-card__body">
  <h3>Quantum Entanglement</h3>
  <p>Entanglement dimensionality certification via moments and quantum information masking.</p>
  </div>
  </div>
  <div class="research-card">
  <div class="research-card__icon" aria-hidden="true"><i class="fas fa-cubes"></i></div>
  <div class="research-card__body">
  <h3>Quantum Error Correction</h3>
  <p>Fault-tolerant quantum architectures and noise-resilient quantum algorithms.</p>
  </div>
  </div>
  <div class="research-card">
  <div class="research-card__icon" aria-hidden="true"><i class="fas fa-braille"></i></div>
  <div class="research-card__body">
  <h3>Neutral-Atom Quantum Computing</h3>
  <p>Fast assembly of large-scale defect-free atom arrays and quantum AI methods.</p>
  </div>
  </div>
</div>

## Recent Publications

<div class="home-pubs">
{%- assign recent_pubs = site.publications | sort: "date" | reverse -%}
{%- for post in recent_pubs limit:3 -%}
  <article class="home-pub-item">
  <div class="home-pub-item__top">
  <span class="home-pub-item__year">{{ post.date | date: "%Y" }}</span>
  {%- if post.venue contains 'arXiv' -%}<span class="pub-badge preprint-badge">Preprint</span>{%- else -%}<span class="pub-badge journal-badge">Journal</span>{%- endif -%}
  <span class="home-pub-item__venue">{{ post.venue }}</span>
  </div>
  <h3 class="home-pub-item__title"><a href="{{ post.paperurl | default: post.url }}" target="_blank" rel="noopener noreferrer">{{ post.title }}<i class="fas fa-arrow-up-right-from-square pub-ext-icon" aria-hidden="true"></i></a></h3>
  {%- if post.authors -%}<p class="home-pub-item__authors">{{ post.authors | replace: "XD Li", "<strong>XD Li</strong>" | replace: "X Li", "<strong>X Li</strong>" }}</p>{%- endif -%}
  </article>
{%- endfor -%}
</div>

<div class="home-actions">
  <a class="btn btn--primary" href="{{ base_path }}/publications/"><i class="fas fa-book-open" aria-hidden="true"></i> View all {{ site.publications | size }} publications</a>
  <a class="home-text-link" href="{{ base_path }}/cv/"><i class="fas fa-file-lines" aria-hidden="true"></i> Curriculum Vitae</a>
  <a class="home-text-link" href="https://scholar.google.com/citations?user=h80jD5gAAAAJ&hl=en" target="_blank" rel="noopener noreferrer"><i class="ai ai-google-scholar" aria-hidden="true"></i> Google Scholar</a>
</div>

## Education

<ul class="education-list">
  <li>
  <div class="education-list__degree"><strong>Ph.D. in Physics</strong><span class="education-list__inst">Department of Physics, Zhejiang University</span></div>
  <span class="education-list__period">2016 – 2021</span>
  </li>
  <li>
  <div class="education-list__degree"><strong>B.S. in Physics</strong><span class="education-list__inst">School of Physics, Shandong University</span></div>
  <span class="education-list__period">2012 – 2016</span>
  </li>
</ul>

## Contact

<div class="home-contact-card">
  <p>I welcome conversations about research collaboration in quantum computing, quantum information theory, and neutral-atom platforms. Academic profiles and links are available in the sidebar.</p>
  <div class="home-contact-links">
  <a href="https://scholar.google.com/citations?user=h80jD5gAAAAJ&hl=en" target="_blank" rel="noopener noreferrer"><i class="ai ai-google-scholar" aria-hidden="true"></i> Google Scholar</a>
  <a href="https://orcid.org/0000-0001-9208-7673" target="_blank" rel="noopener noreferrer"><i class="ai ai-orcid" aria-hidden="true"></i> ORCID</a>
  <a href="https://github.com/Xiao-diLi" target="_blank" rel="noopener noreferrer"><i class="fab fa-github" aria-hidden="true"></i> GitHub</a>
  </div>
</div>
