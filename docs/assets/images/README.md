# Image Assets

This directory contains image assets for the blog including favicons, logos, and social media images.

## Required Images

To complete the SEO setup, please add the following images to this directory:

### Favicons
- `favicon-16x16.png` - 16x16px favicon
- `favicon-32x32.png` - 32x32px favicon
- `apple-touch-icon.png` - 180x180px for Apple devices

### Social Media Images
- `og-image.png` - 1200x630px for Open Graph (Facebook, LinkedIn)
- `twitter-card.png` - 1200x600px for Twitter cards

### Branding
- `logo.png` - Your blog logo (recommended: 200x200px or larger, transparent background)

## Tools to Create Favicons

You can create favicons using these free tools:

1. **Favicon.io** - https://favicon.io/
   - Generate from text, image, or emoji
   - Automatically creates all required sizes

2. **Real Favicon Generator** - https://realfavicongenerator.net/
   - Comprehensive favicon generator
   - Supports all platforms and sizes

3. **Canva** - https://www.canva.com/
   - Create custom logos and social media images
   - Free templates available

## Social Media Image Guidelines

### Open Graph (Facebook/LinkedIn)
- Size: 1200x630px
- Format: PNG or JPG
- Keep text and important elements in the center
- Avoid placing content near edges

### Twitter Card
- Size: 1200x600px (2:1 ratio)
- Format: PNG or JPG
- File size: < 5MB
- Similar design to Open Graph but slightly different ratio

## Quick Setup with Emoji (Temporary)

If you want a quick placeholder, you can:
1. Go to https://favicon.io/emoji-favicons/
2. Choose an emoji that represents your blog (e.g., 🧠 for AI/tech)
3. Download the generated files
4. Place them in this directory

## Adding Logo to MkDocs

Once you have a logo, add it to `mkdocs.yml`:

```yaml
theme:
  name: material
  logo: assets/images/logo.png
  favicon: assets/images/favicon-32x32.png
```

## Current Status

📋 Awaiting images to be added to this directory.
