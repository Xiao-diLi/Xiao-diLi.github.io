---
layout: archive
title: "个人简历"
seo_title: "个人简历 | 李逍迪"
description: "李逍迪的个人学术简历：教育经历、科大讯飞研究院/复旦大学/上海图灵量子/中科大工作经历与完整论文列表。"
permalink: /zh/cv/
lang: zh-CN
og_locale: zh_CN
alternate_og_locale: en_US
alternate_lang: en
alternate_url: /cv/
x_default_url: /cv/
author_profile: true
---

{%- include base_path -%}

<div class="cv-toolbar">
  <p class="cv-toolbar__summary">科大讯飞研究院研究员 · 浙江大学物理学博士</p>
  <button type="button" class="cv-print-btn" onclick="window.print()"><i class="fas fa-print" aria-hidden="true"></i><span>打印 / 导出 PDF</span></button>
</div>

<section class="cv-section">
  <h2 class="cv-section__title">教育经历</h2>
  <ul class="cv-entries">
  <li class="cv-entry">
  <div class="cv-entry__period">2016 – 2021</div>
  <div class="cv-entry__content">
  <div class="cv-entry__role">物理学博士</div>
  <div class="cv-entry__org">浙江大学物理系 · 杭州</div>
  </div>
  </li>
  <li class="cv-entry">
  <div class="cv-entry__period">2012 – 2016</div>
  <div class="cv-entry__content">
  <div class="cv-entry__role">物理学学士</div>
  <div class="cv-entry__org">山东大学物理学院 · 济南</div>
  </div>
  </li>
  </ul>
</section>

<section class="cv-section">
  <h2 class="cv-section__title">工作经历</h2>
  <ul class="cv-entries">
  <li class="cv-entry">
  <div class="cv-entry__period">2025/10 – 至今</div>
  <div class="cv-entry__content">
  <div class="cv-entry__role">研究员</div>
  <div class="cv-entry__org">科大讯飞研究院（iFLYTEK Research）· 合肥</div>
  <div class="cv-entry__detail">研究方向：量子计算、量子 AI、中性原子量子计算</div>
  </div>
  </li>
  <li class="cv-entry">
  <div class="cv-entry__period">2023/06 – 2025/10</div>
  <div class="cv-entry__content">
  <div class="cv-entry__role">博士后研究员</div>
  <div class="cv-entry__org">复旦大学 · 上海</div>
  <div class="cv-entry__detail">研究方向：量子态验证、纠缠维度认证、量子信息掩蔽</div>
  </div>
  </li>
  <li class="cv-entry">
  <div class="cv-entry__period">2022/06 – 2023/06</div>
  <div class="cv-entry__content">
  <div class="cv-entry__role">量子算法工程师</div>
  <div class="cv-entry__org">上海图灵量子科技有限公司 · 上海</div>
  <div class="cv-entry__detail">量子算法研发与工程实现</div>
  </div>
  </li>
  <li class="cv-entry">
  <div class="cv-entry__period">2021/07 – 2022/05</div>
  <div class="cv-entry__content">
  <div class="cv-entry__role">博士后研究员</div>
  <div class="cv-entry__org">中国科学技术大学 · 合肥</div>
  <div class="cv-entry__detail">研究方向：高能物理形式理论、散射振幅</div>
  </div>
  </li>
  </ul>
</section>

<section class="cv-section">
  <div class="cv-section__header-row">
  <h2 class="cv-section__title">论文发表 <span class="cv-section__count">{{ site.publications | size }}</span></h2>
  <a class="cv-section__link" href="{{ base_path }}/zh/publications/">查看论文简介 <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
  </div>
  <ol class="cv-pub-list">
{%- assign cv_pubs = site.publications | sort: "date" | reverse -%}
{%- for post in cv_pubs -%}
{%- include archive-single-cv.html -%}
{%- endfor -%}
  </ol>
</section>
