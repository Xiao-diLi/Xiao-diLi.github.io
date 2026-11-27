---
permalink: /zh/
title: "李逍迪"
seo_title: "李逍迪 | 量子计算与量子信息研究"
description: "李逍迪现任科大讯飞研究院研究员，主要从事量子计算、量子信息理论、量子 AI 与中性原子阵列量子计算研究。"
lang: zh-CN
og_locale: zh_CN
alternate_og_locale: en_US
alternate_lang: en
alternate_url: /
x_default_url: /
author_profile: true
hide_title: true
has_cover: true
---

{%- include base_path -%}

<h1 class="sr-only" itemprop="headline">李逍迪</h1>

<figure class="home-hero">
  <img class="home-hero__img" src="{{ base_path }}/images/hero-desert.jpg" alt="李逍迪拍摄的沙漠剪影摄影作品" />
  <figcaption class="home-hero__credit">摄影 · 李逍迪</figcaption>
</figure>

我目前就职于**科大讯飞研究院（iFLYTEK Research）**，从事**量子计算**、**量子信息理论**与**量子 AI** 的研究工作。
{: .home-lead}

2016–2021 年，在浙江大学读博期间，我的研究方向为高能物理形式理论，主要聚焦于**散射振幅**和 **Feynman 积分约化**，研究了 Einstein-Yang-Mills 振幅的展开问题，并发展了基于微分算子和代数方法的单圈积分计算新方法。毕业后，我在中国科学技术大学从事博士后研究，继续开展散射振幅方面的工作。

2022 年，我加入上海图灵量子担任量子算法工程师。2023 至 2025 年，我在复旦大学从事博士后研究，研究方向转向**量子信息理论**，包括基于经典影子（classical shadow）的量子态验证、纠缠维度认证以及量子信息掩蔽。目前，我就职于**科大讯飞研究院（iFLYTEK Research）**，探索量子计算与人工智能的交叉领域，主要关注**基于中性原子阵列的量子计算**。

## 研究兴趣

<div class="research-grid">
  <div class="research-card">
  <div class="research-card__icon" aria-hidden="true"><i class="fas fa-shield-halved"></i></div>
  <div class="research-card__body">
  <h3>量子态验证</h3>
  <p>基于经典影子框架的高效通用量子态验证与测量复杂度优化。</p>
  </div>
  </div>
  <div class="research-card">
  <div class="research-card__icon" aria-hidden="true"><i class="fas fa-diagram-project"></i></div>
  <div class="research-card__body">
  <h3>量子纠缠</h3>
  <p>基于约化矩的纠缠维度认证方法以及随机近似量子信息掩蔽。</p>
  </div>
  </div>
  <div class="research-card">
  <div class="research-card__icon" aria-hidden="true"><i class="fas fa-cubes"></i></div>
  <div class="research-card__body">
  <h3>量子纠错</h3>
  <p>容错量子计算架构与面向实用硬件的量子算法设计。</p>
  </div>
  </div>
  <div class="research-card">
  <div class="research-card__icon" aria-hidden="true"><i class="fas fa-braille"></i></div>
  <div class="research-card__body">
  <h3>中性原子量子计算</h3>
  <p>大规模无缺陷中性原子阵列快速组装算法与量子 AI 交叉研究。</p>
  </div>
  </div>
</div>

## 近期论文

<div class="home-pubs">
{%- assign recent_pubs = site.publications | sort: "date" | reverse -%}
{%- for post in recent_pubs limit:3 -%}
  <article class="home-pub-item">
  <div class="home-pub-item__top">
  <span class="home-pub-item__year">{{ post.date | date: "%Y" }}</span>
  {%- if post.venue contains 'arXiv' -%}<span class="pub-badge preprint-badge">预印本</span>{%- else -%}<span class="pub-badge journal-badge">期刊论文</span>{%- endif -%}
  <span class="home-pub-item__venue">{{ post.venue }}</span>
  </div>
  <h3 class="home-pub-item__title"><a href="{{ post.paperurl | default: post.url }}" target="_blank" rel="noopener noreferrer">{{ post.title }}<i class="fas fa-arrow-up-right-from-square pub-ext-icon" aria-hidden="true"></i></a></h3>
  {%- if post.authors -%}<p class="home-pub-item__authors">{{ post.authors | replace: "XD Li", "<strong>XD Li</strong>" | replace: "X Li", "<strong>X Li</strong>" }}</p>{%- endif -%}
  </article>
{%- endfor -%}
</div>

<div class="home-actions">
  <a class="btn btn--primary" href="{{ base_path }}/zh/publications/"><i class="fas fa-book-open" aria-hidden="true"></i> 查看全部 {{ site.publications | size }} 篇论文</a>
  <a class="home-text-link" href="{{ base_path }}/zh/cv/"><i class="fas fa-file-lines" aria-hidden="true"></i> 个人简历</a>
  <a class="home-text-link" href="https://scholar.google.com/citations?user=h80jD5gAAAAJ&hl=en" target="_blank" rel="noopener noreferrer"><i class="ai ai-google-scholar" aria-hidden="true"></i> Google Scholar</a>
</div>

## 教育经历

<ul class="education-list">
  <li>
  <div class="education-list__degree"><strong>物理学博士</strong><span class="education-list__inst">浙江大学物理系</span></div>
  <span class="education-list__period">2016 – 2021</span>
  </li>
  <li>
  <div class="education-list__degree"><strong>物理学学士</strong><span class="education-list__inst">山东大学物理学院</span></div>
  <span class="education-list__period">2012 – 2016</span>
  </li>
</ul>

## 联系方式

<div class="home-contact-card">
  <p>欢迎就量子计算、量子信息理论及中性原子阵列领域的研究合作进行交流。学术主页与更多链接可在左侧个人资料面板查看。</p>
  <div class="home-contact-links">
  <a href="https://scholar.google.com/citations?user=h80jD5gAAAAJ&hl=en" target="_blank" rel="noopener noreferrer"><i class="ai ai-google-scholar" aria-hidden="true"></i> Google Scholar</a>
  <a href="https://orcid.org/0000-0001-9208-7673" target="_blank" rel="noopener noreferrer"><i class="ai ai-orcid" aria-hidden="true"></i> ORCID</a>
  <a href="https://github.com/Xiao-diLi" target="_blank" rel="noopener noreferrer"><i class="fab fa-github" aria-hidden="true"></i> GitHub</a>
  </div>
</div>
