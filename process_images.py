from PIL import Image
import glob, os, hashlib

ASSETS = '/home/waka/WallyCyrus/assets'
OUT = '/home/waka/WallyCyrus/public/images'

# --- Logos -> transparent PNG ---
def make_transparent(src, dst, mode):
    im = Image.open(src).convert('RGBA')
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if mode == 'white_bg':  # remove near-white background, keep coloured mark
                if r > 205 and g > 205 and b > 205:
                    px[x, y] = (r, g, b, 0)
                else:
                    # keep mark, full opacity, slight edge cleanup
                    px[x, y] = (r, g, b, 255)
            elif mode == 'dark_bg':  # remove near-black background, keep white/light mark
                if r < 45 and g < 45 and b < 45:
                    px[x, y] = (r, g, b, 0)
                else:
                    # boost lightness to pure-ish white for crispness
                    px[x, y] = (255, 255, 255, 255)
    # trim transparent borders
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    im.save(dst)
    print('saved', dst, im.size)

make_transparent(f'{ASSETS}/2db955fb-f6f6-45f7-8517-871f14d25c3b.jpeg', f'{OUT}/logo-blue.png', 'white_bg')
make_transparent(f'{ASSETS}/f2e93820-066f-42e2-b4da-a9ed4700373e.jpeg', f'{OUT}/logo-white.png', 'dark_bg')

# --- Work photos -> optimized webp, dedupe by md5 ---
seen = {}
files = sorted(glob.glob(f'{ASSETS}/WhatsApp Image *.jpeg'))
for i, f in enumerate(files, 1):
    data = open(f, 'rb').read()
    h = hashlib.md5(data).hexdigest()
    if h in seen:
        print('dup skip', os.path.basename(f))
        continue
    seen[h] = f
    im = Image.open(f).convert('RGB')
    w, hgt = im.size
    maxw = 1600
    if w > maxw:
        nh = int(hgt * maxw / w)
        im = im.resize((maxw, nh), Image.LANCZOS)
    name = f'work/alzuri-{i:02d}.webp'
    im.save(f'{OUT}/{name}', 'WEBP', quality=82, method=6)
    print('saved', name, im.size)
print('DONE')
