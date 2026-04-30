import os
import re

pubs = [
    {
        "title": "An Algorithm for Fast Assembling Large-Scale Defect-Free Atom Arrays",
        "authors": "T Zhang, X Li, H Zhai, L Chen",
        "venue": "arXiv preprint arXiv:2604.08669",
        "year": "2026",
        "url": "https://arxiv.org/abs/2604.08669"
    },
    {
        "title": "A new recursion relation for tree-level NLSM amplitudes based on hidden zeros",
        "authors": "X Li, K Zhou",
        "venue": "arXiv preprint arXiv:2508.12894",
        "year": "2025",
        "url": "https://arxiv.org/abs/2508.12894"
    },
    {
        "title": "Certifying entanglement dimensionality by reduction moments",
        "authors": "C Yi, X Li, H Zhu",
        "venue": "arXiv preprint arXiv:2501.15360",
        "year": "2025",
        "url": "https://arxiv.org/abs/2501.15360"
    },
    {
        "title": "A new general quantum state verification protocol by the classical shadow method",
        "authors": "X Li",
        "venue": "Quantum Information Processing",
        "year": "2025",
        "url": "https://link.springer.com/article/10.1007/s11128-025-04285-0"
    },
    {
        "title": "Random approximate quantum information masking",
        "authors": "X Li, X Shu, H Zhu",
        "venue": "arXiv preprint arXiv:2507.19454",
        "year": "2025",
        "url": "https://arxiv.org/abs/2507.19454"
    },

    {
        "title": "Leading singularities in Baikov representation and Feynman integrals with uniform transcendental weight",
        "authors": "C Dlapa, X Li, Y Zhang",
        "venue": "Journal of High Energy Physics",
        "year": "2021",
        "url": "https://link.springer.com/article/10.1007/JHEP08(2021)133"
    },
    {
        "title": "Analytic tadpole coefficients of one-loop integrals",
        "authors": "B Feng, T Li, X Li",
        "venue": "Journal of High Energy Physics",
        "year": "2021",
        "url": "https://link.springer.com/article/10.1007/JHEP01(2021)058"
    },
    {
        "title": "One-loop Feynman integral reduction by differential operators",
        "authors": "C Hu, T Li, X Li",
        "venue": "Physical Review D",
        "year": "2021",
        "url": "https://journals.aps.org/prd/abstract/10.1103/PhysRevD.103.125008"
    },
    {
        "title": "Expansion of EYM amplitudes in gauge invariant vector space",
        "authors": "B Feng, XD Li, R Huang",
        "venue": "Chinese Physics C",
        "year": "2020",
        "url": "https://iopscience.iop.org/article/10.1088/1674-1137/44/7/073103"
    },
    {
        "title": "Boundary contributions of on-shell recursion relations with multiple-line deformation",
        "authors": "C Hu, XD Li, Y Li",
        "venue": "The European Physical Journal C",
        "year": "2020",
        "url": "https://link.springer.com/article/10.1140/epjc/s10052-020-8041-8"
    },
    {
        "title": "Expansion of Einstein-Yang-Mills theory by differential operators",
        "authors": "B Feng, X Li, K Zhou",
        "venue": "Physical Review D",
        "year": "2019",
        "url": "https://journals.aps.org/prd/abstract/10.1103/PhysRevD.100.125012"
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

# Create output directory if it doesn't exist
os.makedirs(out_dir, exist_ok=True)

# Generate markdown files
for item in pubs:
    pub_date = item['year'] + "-01-01"
    url_slug = get_slug(item['title'])
    
    md_filename = f"{pub_date}-{url_slug}.md"
    html_filename = f"{pub_date}-{url_slug}"
    
    citation = f"{item['authors']} ({item['year']}). &quot;{item['title']}&quot;. <i>{item['venue']}</i>."
    
    md = f"---\ntitle: \"{item['title']}\"\n"
    md += "collection: publications\n"
    md += f"permalink: /publication/{html_filename}\n"
    md += f"date: {pub_date}\n"
    md += f"venue: '{html_escape(item['venue'])}'\n"
    if item['url']:
        md += f"paperurl: '{item['url']}'\n"
    md += f"citation: '{html_escape(citation)}'\n"
    md += "---\n\n"
    
    if item['url']:
        md += f"<a href='{item['url']}'>Download paper here</a>\n\n"
        
    md += f"Recommended citation: {citation}\n"
    
    filepath = os.path.join(out_dir, md_filename)
    with open(filepath, 'w') as f:
        f.write(md)

print(f"Generated {len(pubs)} markdown files.")
