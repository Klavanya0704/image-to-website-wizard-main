import urllib.request
import urllib.parse
import os
import time
from PIL import Image

ai_products = [
    {
        "filename": "cnc-wooden-wall-panel.jpg",
        "title": "CNC Wooden Wall Panel",
        "prompt": "Studio e-commerce product photograph of a CNC carved wooden decorative wall panel made in a college makerspace. 3D geometric wave fluted texture carved into solid teak hardwood, isolated on pure white neutral background, realistic lighting, sharp focus, clean front three-quarter view, high resolution 8k",
        "seed": 101
    },
    {
        "filename": "cnc-cut-wooden-mandala.jpg",
        "title": "CNC Wooden Mandala",
        "prompt": "Studio e-commerce product photograph of a circular CNC carved wooden mandala wall art disk made in a college makerspace fabrication lab. Intricate floral geometric patterns milled into dark walnut wood, isolated on white neutral background, soft studio lighting, sharp detail, front view, e-commerce product photo",
        "seed": 102
    },
    {
        "filename": "cnc-cut-wooden-box.jpg",
        "title": "CNC Wooden Box",
        "prompt": "Studio e-commerce product photograph of a small CNC milled solid hardwood keepsake box with precision friction wooden lid, made in a college fabrication lab. Clean oak wood grain with chamfered edges, resting on white neutral background, studio lighting, crisp sharp focus, isolated e-commerce product photo",
        "seed": 103
    },
    {
        "filename": "cnc-wooden-name-plate.jpg",
        "title": "CNC Wooden Name Plate",
        "prompt": "Studio e-commerce product photograph of an angled desktop wooden name plate made using CNC router V-carving in a college lab. Solid walnut wood block with carved lettering and chamfered base, isolated on clean white background, soft studio lighting, front three-quarter view, high resolution",
        "seed": 104
    },
    {
        "filename": "cnc-wooden-relief-art.jpg",
        "title": "CNC Wooden Relief Carving",
        "prompt": "Studio e-commerce product photograph of a detailed 3D CNC carved wooden relief landscape panel made in a college fabrication lab. Multi-depth mountain contour carving in natural pine wood, isolated on white neutral background, crisp details, studio lighting, e-commerce product photograph",
        "seed": 105
    },
    {
        "filename": "cnc-wooden-key-holder.jpg",
        "title": "CNC Wooden Key Holder",
        "prompt": "Studio e-commerce product photograph of a CNC router cut wooden wall key holder with small top utility shelf and brass hooks, made in a college fabrication lab. Solid oak hardwood with smooth finish, isolated on white background, sharp focus, e-commerce product photo",
        "seed": 106
    },
    {
        "filename": "cnc-wooden-sign-board.jpg",
        "title": "CNC Wooden Sign Board",
        "prompt": "Studio e-commerce product photograph of a rectangular wooden signboard made with CNC router carving in a college lab. Deep V-groove carved typography with clean border on solid oak plank, isolated on white background, studio lighting, front view",
        "seed": 107
    },
    {
        "filename": "cnc-aluminium-bracket.jpg",
        "title": "CNC Aluminium Bracket",
        "prompt": "Studio e-commerce product photograph of a 90-degree CNC milled aluminium mounting corner bracket made in a college engineering lab. 6061 billet aluminum with chamfered edges and counterbored mounting holes, bead-blasted silver finish, isolated on white background, sharp focus, product photo",
        "seed": 108
    },
    {
        "filename": "cnc-aluminum-fixture-plate.jpg",
        "title": "CNC Aluminium Plate",
        "prompt": "Studio e-commerce product photograph of a small precision machined aluminium fixture plate with a grid of threaded holes, made in a college CNC workshop. Brushed metal finish, isolated on white neutral background, studio lighting, sharp focus, clean e-commerce product photo",
        "seed": 109
    },
    {
        "filename": "cnc-machined-gear.jpg",
        "title": "CNC Machined Gear",
        "prompt": "Studio e-commerce product photograph of a precision CNC machined steel spur gear with central keyed bore and teeth, made in a college engineering lab. Polished steel finish, isolated on white neutral background, crisp lighting, sharp focus, isolated product photo",
        "seed": 110
    },
    {
        "filename": "cnc-machined-shaft.jpg",
        "title": "CNC Machined Shaft",
        "prompt": "Studio e-commerce product photograph of a precision CNC turned metal drive shaft with ground steps and keyway slot, made in a college fabrication lab. Polished stainless steel cylinder, isolated on pure white background, studio lighting, sharp detail, e-commerce product photo",
        "seed": 111
    },
    {
        "filename": "cnc-machined-bushing.jpg",
        "title": "CNC Machined Bushing",
        "prompt": "Studio e-commerce product photograph of precision CNC turned cylindrical brass flanged sleeve bushings made in a college engineering lab. Shiny gold brass metal, isolated on pure white background, studio lighting, sharp focus, product photo",
        "seed": 112
    },
    {
        "filename": "cnc-machined-coupling.jpg",
        "title": "CNC Machined Coupling",
        "prompt": "Studio e-commerce product photograph of a CNC machined flexible spiral beam metal shaft coupling made in a college robotics lab. Single piece aluminium spiral slit cylinder, isolated on white background, studio lighting, sharp focus, product photo",
        "seed": 113
    },
    {
        "filename": "cnc-machined-pulley.jpg",
        "title": "CNC Machined Pulley",
        "prompt": "Studio e-commerce product photograph of a small CNC turned aluminium GT2 timing belt pulley with gear teeth and flange, made in a college engineering lab. Silver machined aluminium, isolated on pure white background, studio lighting, sharp focus, product photo",
        "seed": 114
    },
    {
        "filename": "cnc-machined-prototype-component.jpg",
        "title": "CNC Machined Prototype Part",
        "prompt": "Studio e-commerce product photograph of a complex 4-axis CNC milled billet aluminium robotics prototype component part made in a college engineering lab. Machined pockets, holes and chamfers in silver aluminum, isolated on white background, studio lighting, sharp focus, product photo",
        "seed": 115
    }
]

os.makedirs("public/products", exist_ok=True)
os.makedirs("scratch/ai_cnc", exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for idx, item in enumerate(ai_products):
    fname = item["filename"]
    title = item["title"]
    prompt = item["prompt"]
    seed = item["seed"]
    
    encoded = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=1024&height=1024&nologo=true&seed={seed}&model=flux"
    
    raw_path = os.path.join("scratch/ai_cnc", fname)
    public_path = os.path.join("public/products", fname)
    
    print(f"[{idx+1}/{len(ai_products)}] Generating AI photo for: '{title}' ({fname})...")
    
    success = False
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=60) as resp, open(raw_path, 'wb') as out:
                out.write(resp.read())
            
            im = Image.open(raw_path)
            # Ensure saved properly in public/products
            im.convert("RGB").save(public_path, "JPEG", quality=92)
            size = os.path.getsize(public_path)
            print(f"   -> Saved {public_path} ({size} bytes, dimensions={im.size})")
            success = True
            break
        except Exception as e:
            print(f"   Attempt {attempt+1} failed: {e}. Retrying in 2s...")
            time.sleep(2)
    
    if not success:
        print(f"   ERROR: Failed to generate {fname}")

print("\nAll 15 CNC AI product images generated successfully!")
