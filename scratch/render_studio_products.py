import math
import os
import hashlib
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageFont
import numpy as np

OUTPUT_DIR = r"public\products"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def create_studio_background(w=1024, h=1024, bg_type="clean_studio"):
    """Create high-end studio lighting backdrop with soft radial vignette and studio pedestal/ground shadow."""
    img = Image.new("RGBA", (w, h), (248, 250, 252, 255))
    draw = ImageDraw.Draw(img)
    
    # Soft radial gradient center highlight
    center_x, center_y = w // 2, h // 2
    for r in range(w, 0, -8):
        alpha = int(18 * (1 - r / w))
        draw.ellipse([center_x - r, center_y - r * 0.8, center_x + r, center_y + r * 0.8], fill=(255, 255, 255, alpha))
        
    # Soft bottom drop floor plane
    for y in range(h // 2, h):
        factor = (y - h // 2) / (h // 2)
        shade = int(245 - 15 * factor)
        draw.line([(0, y), (w, y)], fill=(shade, shade + 2, shade + 5, 255))
        
    return img

def add_contact_shadow(draw, center_x, ground_y, width, height, blur_radius=20, opacity=90):
    """Draw realistic soft contact drop shadow on the studio floor."""
    shadow_img = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow_img)
    sdraw.ellipse(
        [center_x - width // 2, ground_y - height // 2, center_x + width // 2, ground_y + height // 2],
        fill=(15, 23, 42, opacity)
    )
    sdraw.ellipse(
        [center_x - width // 3, ground_y - height // 3, center_x + width // 3, ground_y + height // 3],
        fill=(15, 23, 42, int(opacity * 1.5))
    )
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(blur_radius))
    return shadow_img

print("Renderer framework ready.")
