# Images and media Leonor supplies

Drop the files below into this folder with these exact names. The page picks them up automatically. Until a file exists, the page shows a brand-coloured placeholder or the asset already published on leonors.com.

| File | Used where | Recommended |
|---|---|---|
| `logo-leonors-white.png` | Dark backgrounds | Horizontal wordmark, white, transparent PNG, 755 x 295 px. Supplied by Leonor on 15 October 2026 |
| `logo-leonors.png` | Header, footer | Same wordmark recoloured for light backgrounds: badge in brand pink `#e9a8a8`, text in ink `#333333`. Generated from the white file, pixel by pixel, keeping the transparency |
| `logo-emblem.png` | Not used on the page at the moment | Square emblem, 260 px. Supplied on 15 October 2026 |
| `guide-mockup.png` | Free guide section | Mockup of "Indulge in Wellness", transparent PNG. Supplied on 15 October 2026 |
| `hero-poster.jpg` | Hero, poster shown before the video plays | 1600 x 900 px, JPG, under 300 KB |
| `leonor-portrait.jpg` | About Leonor section | 1200 x 1500 px (4:5), JPG |
| `dessert-01.jpg` to `dessert-06.jpg` | Transformation and bonuses sections | 1200 x 1200 px, JPG, under 250 KB each |
| `testimonial-<firstname>.jpg` | Testimonials | 400 x 400 px, square |
| `og-image.jpg` (optional) | Link preview on social media | 1200 x 630 px. If missing, the page generates one |

## Photos in this folder (from Leonor's Drive, 12 October 2026)

| File | Source in Drive | Used where |
|---|---|---|
| `hero-poster.jpg` | Leonor + Cakes / Leonor_Strawberry Cake | Hero |
| `leonor-avatar.jpg` | Leonor / David Fernandes / PORTRAITS_Hi_RES / FUN_COLOUR / DW1_0141 | Small round photo on the hero card |
| `leonor-portrait.jpg` | Same folder / DW1_0110 | About Leonor |
| `leonor-kitchen.jpg` | Leonor + Cakes / Kiara / 3.jpg | Mentorship photo card |
| `leonor-cake-balls.jpg` | Leonor + Cakes / Leonor_Cake_Balls, cropped to 2:3 | Bonus 03 |
| `leonor-white-cake.jpg` | Photos / Leonor with Meringue cake3, cropped to 2:3 | Bonus 04 |
| `final-cta-cake.jpg` | Same photo, cropped to the cake only | Final call to action background |
| `dessert-lava-cake.jpg` | Recipes / Lava_Cake_leonor | Gallery |
| `dessert-cheesecake-slice.jpg` | Leonor + Cakes / Kiara / Capa(4), cropped to 4:5 | Pains section |
| `dessert-raspberry-chia.jpg` | Chia pudding shoot / LC3_9421 | Not used on the page at the moment (Leonor found it too simple for the modules section) |
| `ingredients-bowls.jpg` | Leonor + Cakes / Kiara / Capa(3), cropped square | Not used on the page at the moment (was the guide cover stand-in) |
| `dessert-cookies.jpg` | Leonor + Cakes / Kiara / 10.jpg | Gallery |
| `dessert-muffins.jpg` | Recipes / Muffins | Gallery |
| `dessert-cupcake.jpg` | Leonor + Cakes / Kiara / Capa(5) | Gallery |
| `dessert-banana-roll.jpg` | Recipes / DW1_9806 | Not used on the page at the moment |
| `dessert-roasted-chickpeas.jpg` | Recipes / LC3_9318 | Not used on the page at the moment |

All resized to 1600 px on the long side or less, JPEG quality 78.

## Stock photos (Unsplash License, free for commercial use, no attribution required)

| File | Used where | Photographer and source |
|---|---|---|
| `stock-plant-milk.jpg` | Bonus 01, DIY Recipes | Anna Jackowska, https://unsplash.com/photos/FhzlqJ-Pwv8 |
| `stock-melted-chocolate.jpg` | Bonus 02, Syrups, Fillings, Frostings and Creams | Ahmet Koç, https://unsplash.com/photos/5NoDogo8r9w |
| `stock-chocolate-cake.jpg` | Modules section, cropped to 16:10 | Jennifer Pallian, https://unsplash.com/photos/gRZYR210m0U |

Bonus images are shown in a 2:3 portrait box, like a book cover. Leonor can replace any of these with her own photo, keeping the file name; a 2:3 photo fills the box without cropping. Replace any file keeping the same name and the page updates on its own. On localhost, if an old image keeps showing after a replacement, delete `.next/dev/cache/images` and reload.

Video for the hero: either give the YouTube or Vimeo id (set `NEXT_PUBLIC_HERO_YOUTUBE_ID` or `NEXT_PUBLIC_HERO_VIMEO_ID` in `.env.local`) or place `hero.mp4` in `public/videos/` and set `HERO_VIDEO.file` in `src/config/site.ts`.

Testimonials in text go into the `testimonials` table in Supabase (name, text, highlight, photo_url, is_published). Until then the page shows the existing testimonials image.
