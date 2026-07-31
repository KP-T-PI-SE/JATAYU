import sys
try:
    from PIL import Image
except ImportError:
    print("Pillow not installed. Run 'pip install Pillow' first.")
    sys.exit(1)

def make_gold_transparent(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        # item is (R, G, B, A)
        # Calculate brightness
        brightness = sum(item[:3]) / 3
        
        # If it's very bright (white background), make it transparent
        if brightness > 220:
            new_data.append((255, 255, 255, 0))
        else:
            # Colorize the dark logo part to gold: rgb(232, 160, 32)
            # We can blend it based on how dark it is (anti-aliasing)
            intensity = (255 - brightness) / 255.0 # 1.0 for pure black, 0.0 for white
            r = int(232 * intensity)
            g = int(160 * intensity)
            b = int(32 * intensity)
            new_data.append((232, 160, 32, int(255 * intensity)))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved {output_path}")

make_gold_transparent(r"d:\jatayu\apps\storefront\public\jatayu-logo.jpeg", r"d:\jatayu\apps\storefront\public\jatayu-logo-gold.png")
make_gold_transparent(r"d:\jatayu\apps\storefront\public\jatayu-logo.jpeg", r"d:\jatayu\apps\admin\public\jatayu-logo-gold.png")
