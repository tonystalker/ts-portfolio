import Image from "next/image";
import React, { useState } from "react";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* Skeleton loader */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-700/50 animate-pulse rounded-lg" />
      )}

      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 bg-gray-800/50 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-sm">Image not available</span>
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default OptimizedImage;
