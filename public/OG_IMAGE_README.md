# OG Image Requirements for Tech Edge SEO

## Required Images

### 1. og-image.jpg (Open Graph Image)
- **Size**: 1200 x 630 pixels
- **Format**: JPG (optimized for web)
- **Location**: `/public/og-image.jpg`
- **Content**: 
  - Tech Edge logo prominently displayed
  - Tagline: "Digital Transformation & IT Solutions"
  - Clean, professional background
  - Brand colors: #2563eb (primary blue)

### 2. Favicon Set
Place in `/public/icons/`:

| File | Size | Format |
|------|------|--------|
| favicon-16x16.png | 16x16 | PNG |
| favicon-32x32.png | 32x32 | PNG |
| apple-touch-icon.png | 180x180 | PNG |
| icon-72x72.png | 72x72 | PNG |
| icon-96x96.png | 96x96 | PNG |
| icon-128x128.png | 128x128 | PNG |
| icon-144x144.png | 144x144 | PNG |
| icon-152x152.png | 152x152 | PNG |
| icon-192x192.png | 192x192 | PNG |
| icon-384x384.png | 384x384 | PNG |
| icon-512x512.png | 512x512 | PNG |
| safari-pinned-tab.svg | any | SVG (monochrome) |

### 3. Microsoft Tiles
Place in `/public/icons/`:

| File | Size |
|------|------|
| mstile-70x70.png | 70x70 |
| mstile-150x150.png | 150x150 |
| mstile-310x150.png | 310x150 |
| mstile-310x310.png | 310x310 |

### 4. favicon.ico
- **Location**: `/public/favicon.ico`
- **Sizes**: Multi-resolution (16x16, 32x32, 48x48)

## Tools to Generate

### Option 1: RealFaviconGenerator
1. Go to https://realfavicongenerator.net/
2. Upload your logo (512x512 or larger)
3. Configure each platform
4. Download and extract to `/public/`

### Option 2: Favicon.io
1. Go to https://favicon.io/
2. Upload your logo
3. Download all generated files

### Option 3: PWA Asset Generator
```bash
npx pwa-asset-generator logo.png ./public/icons --background "#ffffff" --splash-only false
```

## Design Guidelines

### Brand Colors
- Primary: #2563eb (Blue)
- Secondary: #1e40af (Dark Blue)
- Background: #f9f8f6 (Light Gray)
- Text: #1a1a1a (Near Black)

### Typography
- Headings: Crimson Text
- Body: DM Sans
- Code: Roboto Mono

### Logo Requirements
- Use vector format (SVG) for source
- Maintain aspect ratio
- Include adequate padding (10-15%)
- Test on both light and dark backgrounds
