// components/Avatar.tsx
import { useState } from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: number;
  fallback?: string;
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'busy' | 'away' | null;
  className?: string;
}

const Avatar = ({
  src = null,
  alt = 'User avatar',
  size = 12,
  fallback,
  shape = 'circle',
  status = null,
  className = '',
}: AvatarProps) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  const getFallbackText = () => {
    if (fallback) return fallback;
    if (alt) {
      const words = alt.split(' ');
      return words
        .slice(0, 2) // Take only first two words
        .map((word) => word[0] || '') // Get first letter of each word
        .join('')
        .toUpperCase();
    }
    return '??';
  };

  const sizeClasses = `h-${size} w-${size}`;
  const textSize = size < 8 ? 'text-xs' : size < 12 ? 'text-sm' : 'text-base';

  return (
    <div className={`relative inline-block  ${sizeClasses} ${className}`}>
      {src && !error ? (
        <Image
          src={src}
          alt={alt}
          width={size * 4}
          height={size * 4}
          className={`object-cover w-12 h-12 ${className} ${
            shape === 'circle' ? 'rounded-full' : 'rounded-md'
          }`}
          onError={handleError}
          loader={({ src }) => src}
        />
      ) : (
        <div
          className={`${shape === 'circle' ? 'rounded-full' : 'rounded-md'} 
          bg-gray-300 dark:bg-gray-600 flex items-center justify-center ${className} ${sizeClasses}`}
        >
          <span className={`font-medium text-gray-700 dark:text-gray-200 ${textSize}`}>
            {getFallbackText()}
          </span>
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 block rounded-full ${
            size < 8 ? 'h-2 w-2' : 'h-3 w-3'
          } ring-2 ring-white dark:ring-gray-800 ${
            status === 'online'
              ? 'bg-green-500'
              : status === 'offline'
              ? 'bg-gray-400'
              : status === 'busy'
              ? 'bg-red-500'
              : 'bg-yellow-500'
          }`}
        />
      )}
    </div>
  );
};

export default Avatar;