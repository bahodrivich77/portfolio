# Reference-led hero concept

Open `/concept.html` to review the proposed opening screen before the rest of the redesign changes. The existing portfolio entry point is separate. This concept uses an original composition inspired by the user-supplied Nova and Developer X references: generous spacing, bold personal introduction, a large portrait slot, blue accents, and supporting sidebar content. Reference template code, images, credentials, claims, and testimonials were not copied.

## Add your portrait

1. Put your photo at `public/images/portrait.webp` (recommended portrait ratio 4:5; about 1000px tall).
2. Set `portrait: "/images/portrait.webp"` in `src/concept/media.ts`.
3. Refresh `/concept.html`.

A transparent WebP or PNG cutout also works; the frame supplies its own background. The layout has a reserved image size and shows an intentional placeholder while the path is empty. Image loading errors fall back to that placeholder.

The screen includes Uzbek, English, and Russian copy, a light/dark toggle, a responsive navigation, and existing profile links. This is a hero design review, not a completed replacement of all portfolio sections. Links to About and Projects open the existing portfolio sections.
