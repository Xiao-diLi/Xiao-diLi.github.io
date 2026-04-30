# Content Management Guide

This guide explains how to manage content on your academic homepage.

## Adding Publications

Create a Markdown file in `_publications/` named `YYYY-MM-DD-short-title.md`:

```markdown
---
title: "Your Paper Title"
collection: publications
category: manuscripts
permalink: /publication/YYYY-short-title
excerpt: 'Brief description.'
date: YYYY-MM-DD
venue: 'Journal Name'
paperurl: 'https://link-to-paper'
citation: 'Authors. (Year). "Title." Journal. Vol, Pages.'
---
```

Categories: `manuscripts`, `conferences`, `books`. You can also use `markdown_generator/` for batch generation.

## Adding Blog Posts

Create a file in `_posts/` named `YYYY-MM-DD-post-title.md`:

```markdown
---
title: 'Post Title'
date: YYYY-MM-DD
permalink: /posts/YYYY/MM/post-title/
tags:
  - quantum computing
---
Your content here.
```

## Adding Talks

Create a file in `_talks/` named `YYYY-MM-DD-talk-title.md`:

```markdown
---
title: "Talk Title"
collection: talks
type: "Talk"
permalink: /talks/YYYY-talk-title
venue: "Conference Name"
date: YYYY-MM-DD
location: "City, Country"
---
```

## Updating Personal Information

- Edit `_config.yml` for sidebar info (name, bio, links)
- Edit `_pages/about.md` for the main About page

## Building External Links (Important for SEO)

Add your homepage URL to these platforms to help Google discover your site:

1. **Google Scholar** — Edit profile, add homepage URL
2. **ORCID** — Add website in your profile
3. **GitHub** — Add website in profile settings
4. **ResearchGate / arXiv** — Add personal website link

## SEO Checklist

- [ ] Submit sitemap at [Google Search Console](https://search.google.com/search-console): `https://xiao-dili.github.io/sitemap.xml`
- [ ] Request indexing via URL Inspection tool
- [ ] Add homepage URL to Google Scholar, ORCID, GitHub profiles
- [ ] Replace all placeholder content with real data
- [ ] Add real publications with proper titles and venues
