# Product images

**Images are not stored in the database.** The database only stores a path (e.g. `/images/1.png`). The actual files live here in `frontend/public/images/`.

## Using your own images

Copy your image files into this folder and name them to match the seeded product order:

| File     | Product                  |
|----------|--------------------------|
| `1.png`  | Wireless Headphones Pro  |
| `2.png`  | Running Shoes X3         |
| `3.png`  | Organic Coffee Blend     |
| `4.png`  | Yoga Mat Premium         |
| `5.png`  | Smart Water Bottle       |
| `6.png`  | Mechanical Keyboard      |
| `7.png`  | Stainless Steel Pan Set  |
| `8.png`  | Bamboo Desk Organizer    |
| `9.png`  | Protein Powder Vanilla   |
| `10.png` | USB-C Hub 7-in-1         |

No code or database changes needed. For custom filenames, put the files here and set each product’s `image_url` via the API (e.g. PATCH `/api/products/:id` with `image_url: '/images/yourfile.png'`).

`placeholder.svg` is used when a product has no image or the file is missing.
