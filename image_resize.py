from PIL import Image
import glob

w = []
h = []

for item in glob.glob("img/agent_choices_piechart/*.png"):
    im = Image.open(item)
    w.append(im.size[0])
    h.append(im.size[1])


for item in glob.glob("img/agent_choices_piechart/*.png"):
    im = Image.open(item)
    new_img = im.resize((min(w),min(h)))
    new_img.save(item.split('\\')[1], "PNG", optimize=True)

# print(min(w), min(h), max(w), max(h))