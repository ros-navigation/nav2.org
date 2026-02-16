import type { ImageMetadata } from 'astro';
import { useEffect, useRef } from 'react';

interface ImageProps {
  src: string | ImageMetadata;
  alt: string;
  url: string;
}

interface Props {
  images: ImageProps[];
  direction?: 'left' | 'right';
  className?: string;
  itemClassName?: string;
}

export default function SwipeCarousel({
  images,
  direction = 'left',
  className,
  itemClassName,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper function to get image src string from ImageMetadata or string
  const getImageSrc = (src: string | ImageMetadata): string => {
    return typeof src === 'string' ? src : src.src;
  };

  // Helper function to get a unique key for images
  const getImageKey = (src: string | ImageMetadata, index: number): string => {
    const srcString = typeof src === 'string' ? src : src.src;
    return `${srcString}-${index}`;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const content = container.children[0] as HTMLElement | undefined;
    if (!content) return;

    const updateRowHeight = () => {
      // Measure only the non-duplicate images to avoid double counting.
      const imgs = Array.from(
        container.querySelectorAll<HTMLImageElement>(
          'img[data-carousel-img="true"][data-duplicate="false"]'
        )
      );

      const heights = imgs
        .map((img) => img.getBoundingClientRect().height)
        .filter((h) => Number.isFinite(h) && h > 0);

      if (heights.length === 0) return;

      const minHeight = Math.min(...heights);
      // Use the minimum height, but never less than 160px base minimum
      const finalHeight = Math.max(minHeight, 160);

      container.style.setProperty(
        '--row-image-height',
        `${Math.round(finalHeight)}px`
      );
    };

    const applyAnimation = () => {
      // Use scrollWidth so we include overflow content (more stable than offsetWidth here)
      const contentWidth = content.scrollWidth;

      // Set the animation duration based on content width
      const duration = Math.max(contentWidth * 10, 1000); // 10ms per pixel, minimum 1s

      const animationName = direction === 'right' ? 'scrollRight' : 'scrollLeft';

      // Set initial position for scrollRight to ensure seamless loop
      if (direction === 'right') {
        container.style.transform = 'translateX(-50%)';
      } else {
        container.style.transform = 'translateX(0)';
      }

      container.style.animation = `${animationName} ${duration}ms linear infinite`;
    };

    applyAnimation();
    updateRowHeight();

    // Recompute height as images load in.
    const onImgLoad = () => updateRowHeight();
    const imgsAll = Array.from(
      container.querySelectorAll<HTMLImageElement>('img[data-carousel-img="true"]')
    );
    imgsAll.forEach((img) => img.addEventListener('load', onImgLoad));

    // Recompute when images load / layout changes
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => {
        applyAnimation();
        updateRowHeight();
      });
      ro.observe(content);
      return () => {
        ro.disconnect();
        imgsAll.forEach((img) => img.removeEventListener('load', onImgLoad));
      };
    }

    return () => {
      imgsAll.forEach((img) => img.removeEventListener('load', onImgLoad));
    };
  }, [direction]);

  return (
    <div className={className ?? 'w-full overflow-x-hidden'}>
      <style>{`
        @keyframes scrollLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scrollRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .scroll-container {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          width: max-content;
        }
        
        .scroll-content {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          width: max-content;
        }

        .carousel-img {
          height: var(--row-image-height, 160px);
        }
      `}</style>
      <div 
        ref={containerRef}
        className="scroll-container"
      >
        <div className="scroll-content">
          {images.map((image, index) => (
            <div
              key={getImageKey(image.src, index)}
              className={itemClassName ?? 'flex-none w-40 sm:w-48 md:w-56 lg:w-64 mr-3'}
            >
              <a href={image.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={getImageSrc(image.src)}
                  alt={image.alt}
                  data-carousel-img="true"
                  data-duplicate="false"
                  className="carousel-img block mx-auto max-w-full w-auto h-auto object-contain rounded-lg transition-transform duration-300"
                  loading="lazy"
                />
              </a>
            </div>
          ))}
          {/* Duplicate content for seamless loop */}
          {images.map((image, index) => (
            <div
              key={getImageKey(image.src, index) + '-duplicate'}
              className={itemClassName ?? 'flex-none w-40 sm:w-48 md:w-56 lg:w-64 mr-3'}
            >
              <a href={image.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={getImageSrc(image.src)}
                  alt={image.alt}
                  data-carousel-img="true"
                  data-duplicate="true"
                  className="carousel-img block mx-auto max-w-full w-auto h-auto object-contain rounded-lg transition-transform duration-300"
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