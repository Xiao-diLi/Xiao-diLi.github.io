import os
import re

pubs = [
    {
        "title": "An Algorithm for Fast Assembling Large-Scale Defect-Free Atom Arrays",
        "authors": "T Zhang, X Li, H Zhai, L Chen",
        "venue": "arXiv preprint arXiv:2604.08669",
        "year": "2026",
        "url": "https://arxiv.org/abs/2604.08669",
        "excerpt": "We propose an efficient algorithm for rapidly assembling large-scale defect-free neutral atom arrays, addressing a key bottleneck in scaling up neutral-atom quantum computing platforms."
    },
    {
        "title": "A new recursion relation for tree-level NLSM amplitudes based on hidden zeros",
        "authors": "X Li, K Zhou",
        "venue": "Journal of High Energy Physics",
        "year": "2026",
        "url": "https://doi.org/10.1007/JHEP01(2026)010",
        "excerpt": "We derive a new recursion relation for tree-level nonlinear sigma model (NLSM) amplitudes by exploiting the hidden zero structure of scattering amplitudes."
    },
    {
        "title": "Certifying entanglement dimensionality by reduction moments",
        "authors": "C Yi, X Li, H Zhu",
        "venue": "PRX Quantum",
        "year": "2026",
        "url": "https://doi.org/10.1103/cc1n-gmj1",
        "excerpt": "We develop a practical method for certifying the dimensionality of quantum entanglement using reduction moments, providing efficient lower bounds on the Schmidt number."
    },
    {
        "title": "A new general quantum state verification protocol by the classical shadow method",
        "authors": "X Li",
        "venue": "Quantum Information Processing",
        "year": "2025",
        "url": "https://link.springer.com/article/10.1007/s11128-025-04285-0",
        "excerpt": "We propose a general quantum state verification protocol based on the classical shadow framework, offering efficient verification with reduced measurement complexity."
    },
    {
        "title": "Random approximate quantum information masking",
        "authors": "X Li, X Shu, H Zhu",
        "venue": "arXiv preprint arXiv:2507.19454",
        "year": "2025",
        "url": "https://arxiv.org/abs/2507.19454",
        "excerpt": "We study approximate quantum information masking using random unitaries, analyzing the conditions under which quantum information can be hidden from local subsystems."
    },
    {
        "title": "Leading singularities in Baikov representation and Feynman integrals with uniform transcendental weight",
        "authors": "C Dlapa, X Li, Y Zhang",
        "venue": "Journal of High Energy Physics",
        "year": "2021",
        "url": "https://link.springer.com/article/10.1007/JHEP08(2021)133",
        "excerpt": "We develop a systematic method based on leading singularities in the Baikov representation to construct Feynman integral bases with uniform transcendental weight."
    },
    {
        "title": "Analytic tadpole coefficients of one-loop integrals",
        "authors": "B Feng, T Li, X Li",
        "venue": "Journal of High Energy Physics",
        "year": "2021",
        "url": "https://link.springer.com/article/10.1007/JHEP01(2021)058",
        "excerpt": "We derive analytic expressions for tadpole coefficients in one-loop Feynman integral decomposition, completing the analytic reduction of one-loop integrals."
    },
    {
        "title": "One-loop Feynman integral reduction by differential operators",
        "authors": "C Hu, T Li, X Li",
        "venue": "Physical Review D",
        "year": "2021",
        "url": "https://journals.aps.org/prd/abstract/10.1103/PhysRevD.103.125008",
        "excerpt": "We present a new method for reducing one-loop Feynman integrals using differential operators acting on the integrand, simplifying the computation of scattering amplitudes."
    },
    {
        "title": "Expansion of EYM amplitudes in gauge invariant vector space",
        "authors": "B Feng, XD Li, R Huang",
        "venue": "Chinese Physics C",
        "year": "2020",
        "url": "https://iopscience.iop.org/article/10.1088/1674-1137/44/7/073103",
        "excerpt": "We expand Einstein-Yang-Mills (EYM) amplitudes in a gauge invariant vector space, establishing explicit relations between gravitational and gauge theory amplitudes."
    },
    {
        "title": "Boundary contributions of on-shell recursion relations with multiple-line deformation",
        "authors": "C Hu, XD Li, Y Li",
        "venue": "The European Physical Journal C",
        "year": "2020",
        "url": "https://link.springer.com/article/10.1140/epjc/s10052-020-8041-8",
        "excerpt": "We systematically analyze boundary contributions in on-shell recursion relations under multiple-line momentum deformations for scattering amplitudes."
    },
    {
        "title": "Expansion of Einstein-Yang-Mills theory by differential operators",
        "authors": "B Feng, X Li, K Zhou",
        "venue": "Physical Review D",
        "year": "2019",
        "url": "https://journals.aps.org/prd/abstract/10.1103/PhysRevD.100.125012",
        "excerpt": "We develop a differential operator approach to expand Einstein-Yang-Mills amplitudes into pure Yang-Mills amplitudes, revealing deep connections between gravity and gauge theories."
    }
]

html_escape_table = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;"
}

def html_escape(text):
    return "".join(html_escape_table.get(c,c) for c in text)

def get_slug(title):
    s = title.lower()
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'[\s-]+', '-', s)
    return s[:60].strip('-')

out_dir = "/Users/lixiaodi/Nutstore Files/个人/personal_homepage/Xiao-diLi.github.io/_publications"

os.makedirs(out_dir, exist_ok=True)

# Remove old generated files (keep README.md)
for f in os.listdir(out_dir):
    if f.endswith('.md') and f != 'README.md':
        os.remove(os.path.join(out_dir, f))

for item in pubs:
    pub_date = item['year'] + "-01-01"
    url_slug = get_slug(item['title'])
    
    md_filename = f"{pub_date}-{url_slug}.md"
    html_filename = f"{pub_date}-{url_slug}"
    
    md = f"---\ntitle: \"{item['title']}\"\n"
    md += "collection: publications\n"
    md += f"permalink: /publication/{html_filename}\n"
    if item.get('excerpt'):
        md += f"excerpt: '{html_escape(item['excerpt'])}'\n"
    md += f"date: {pub_date}\n"
    md += f"venue: '{html_escape(item['venue'])}'\n"
    if item['url']:
        md += f"paperurl: '{item['url']}'\n"
    md += "---\n"
    
    filepath = os.path.join(out_dir, md_filename)
    with open(filepath, 'w') as f:
        f.write(md)

print(f"Generated {len(pubs)} publication files.")
