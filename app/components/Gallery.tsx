'use client'
import Splide from "@splidejs/splide";
import { Intersection } from '@splidejs/splide-extension-intersection';
import { useEffectOnce } from "../lib/utils";
import fadeScaleTransition from "./transition";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import '@splidejs/splide/css/core';

const images: { src: string, description: string }[] = [
  {
    src: '/hero1.jpg',
    description: ''
  },
  {
    src: '/hero1.jpg',
    description: ''
  },
  {
    src: '/hero2.jpg',
    description: ''
  },
  {
    src: '/hero2.jpg',
    description: ''
  },
]

export default function Gallery () {
  useEffectOnce(() => {
    var splide = new Splide('.splide', {
      rewind: true,
      padding: '10%',
      interval: 4000,
      autoplay: 'pause',
      intersection: {
        inView: {
          autoplay: true,
        },
        outView: {
          autoplay: false,
        },
      },
    });
    splide.mount({ Intersection }, fadeScaleTransition)
  }, [])

  return (
    <div className="splide" role="group" aria-label="Gallery carousel">
      <div className="splide__arrows sm:hidden">
        <button className="splide__arrow splide__arrow--prev flex w-10 h-10 bg-background-secondary rounded-full text-text-secondary hover:text-text-primary transition border border-border absolute left-[-18px] top-1/2 translate-y-[-50%] z-10">
          <ChevronLeftIcon className="m-auto w-7 pr-0.5"></ChevronLeftIcon>
        </button>
        <button className="splide__arrow splide__arrow--next flex w-10 h-10 bg-background-secondary rounded-full text-text-secondary hover:text-text-primary transition border border-border absolute right-[-18px] top-1/2 translate-y-[-50%] z-10">
          <ChevronRightIcon className="m-auto w-7 pl-0.5"></ChevronRightIcon>
        </button>
      </div>
    
      <div className="splide__track rounded-md">
        <ul className="splide__list">
          {images.map((item, index) => (
            <li className="splide__slide" key={index}>
              <Image
                className="rounded-2xl object-cover w-full h-full max-h-[500px]"
                src={item.src}
                width={300}
                height={200}
                alt={item.description}
              ></Image>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}