'use client'
import p5 from 'p5'
import { useEffectOnce } from "@/app/lib/utils"

export default function Pixelate () {
  useEffectOnce(() => {
    new p5(p5 => {
      let img;
      let pixelation_level = 30;
      const coords = []

      p5.preload = () => {
        img = p5.loadImage("map.png");
        // console.log(img)
      }

      p5.setup = () => {
        const imgScreenWidth = img.width * p5.windowHeight / img.height
        const imgScreenHeight = p5.windowHeight
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.pixelDensity(1);
        p5.image(img, 0, 0, imgScreenWidth, imgScreenHeight);
        // p5.filter(p5.THRESHOLD)
        p5.loadPixels();
        //print(pixels[0], pixels[1], pixels[2], pixels[3]);
        p5.noStroke();
        
      
        for (let y = 0; y < imgScreenHeight; y += pixelation_level) {
          coords.push([])
          for (let x = 0; x < imgScreenWidth; x += pixelation_level) {
            
            let i = (x + y * p5.width) * 4;

            let r = p5.pixels[i + 0];
            let g = p5.pixels[i + 1];
            let b = p5.pixels[i + 2];
            let a = p5.pixels[i + 3];

            const brightness = (r+g+b)/3

            if (brightness > 20) {
              p5.fill(255,255,255,255);
              coords[coords.length - 1].push(0)
            } else {
              p5.fill(r, g, b, a);
              // coords.y = 0
              coords[coords.length - 1].push(1)
            }
            p5.square(x, y, pixelation_level);
          }
        }

        console.log('[\n' + coords.map(row => ' [' + row.join(', ') + ']').join(',\n') + '\n]')
      }
    })
  }, [])

  return (
    <main></main>
  )
}