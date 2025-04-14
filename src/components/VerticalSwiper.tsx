import { useEffect, useRef } from 'react';

interface Props {
  images: {
    src: string;
    alt: string;
  }[];
  direction: 'up' | 'down';
}

export default function VerticalSwiper({ images, direction }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollHeight = container.scrollHeight;
      
      // Duplicate the content to create seamless loop
      const content = container.innerHTML;
      container.innerHTML = content + content;
      
      const scroll = () => {
        if (direction === 'down') {
          container.scrollTop += 1;
          if (container.scrollTop >= scrollHeight) {
            container.scrollTop = 0;
          }
        } else {
          container.scrollTop -= 1;
          if (container.scrollTop <= 0) {
            container.scrollTop = scrollHeight;
          }
        }
        requestAnimationFrame(scroll);
      };
      
      requestAnimationFrame(scroll);
    }
  }, [direction]);

  return (
    <div className="h-screen overflow-hidden">
      <div 
        ref={containerRef}
        className="h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ scrollBehavior: 'auto' }}
      >
        {images.map((image) => (
          <div key={image.src} className="h-[30vh] mb-2">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
} 