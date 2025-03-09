'use client';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

const images = [
  {
    url: '/slider/img_001.jpg',
    title: 'Bem vindo ao nosso Blog',
    description: 'Descubra histórias e insights incríveis'
  },
  {
    url: '/slider/image2.jpg',
    title: 'Compartilhe suas ideias',
    description: 'Junte-se à nossa comunidade de escritores'
  },
  {
    url: '/slider/image3.jpg',
    title: 'Fique atualizado',
    description: 'Receba o conteúdo mais recente entregue a você'
  }
];

export default function ImageSlider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-[400px]">
            <Image
              src={image.url}
              alt={image.title}
              fill
              style={{ objectFit: 'cover' }}
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
              <h2 className="text-4xl font-bold mb-4">{image.title}</h2>
              <p className="text-xl">{image.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}