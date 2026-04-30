---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

<div class="lang-en" markdown="1">

Education
======
* **Ph.D.** in Physics, Zhejiang University, 2016-2021
* **B.S.** in Physics, Shandong University, 2012-2016

Work Experience
======
* 2021 - Present: **Postdoctoral Researcher**
  * Fudan University, Shanghai, China
  * Research in quantum computation and quantum information theory

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

</div>

<div class="lang-zh" markdown="1">

教育经历
======
* **博士**，物理系，浙江大学，2016-2021
* **学士**，物理学院，山东大学，2012-2016

工作经历
======
* 2021 至今：**博士后研究员**
  * 复旦大学，上海
  * 研究方向：量子计算与量子信息理论

论文发表
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

</div>
