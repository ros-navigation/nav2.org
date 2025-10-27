import { useEffect, useRef } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  url: string;
}

interface Props {
  images: ImageProps[];
  direction?: 'up' | 'down';
}

export default function SwipeCarousel({ images, direction = 'up' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const content = container.children[0] as HTMLElement;
      const contentHeight = content.offsetHeight;
      
      // Set the animation duration based on content height
      const duration = Math.max(contentHeight * 40, 10000); // 10ms per pixel, minimum 10s
      
      const animationName = direction === 'down' ? 'scrollDown' : 'scrollUp';
      container.style.animation = `${animationName} ${duration}ms linear infinite`;
    }
  }, [direction]);

  return (
    <div className="md:h-screen h-[50vh] overflow-hidden">
      <style>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        
        @keyframes scrollDown {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }
        
        .scroll-container {
          display: flex;
          flex-direction: column;
        }
        
        .scroll-content {
          display: flex;
          flex-direction: column;
        }
      `}</style>
      <div 
        ref={containerRef}
        className="scroll-container"
      >
        <div className="scroll-content">
          {images.map((image, index) => (
            <div key={`${image.src}-${index}`} className="w-full mb-2">
              <a href={image.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-contain rounded-lg transition-transform duration-300"
                  loading="lazy"
                />
              </a>
            </div>
          ))}
          {/* Duplicate content for seamless loop */}
          {images.map((image, index) => (
            <div key={`${image.src}-duplicate-${index}`} className="w-full mb-2">
              <a href={image.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-contain rounded-lg transition-transform duration-300"
                  loading="lazy"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}