import { useMemo, forwardRef } from 'react';
import { cn } from '@/app/lib/utils';

// Avatar Component
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({ size = 'md', className, ...props }, ref) => {
  const sizeStyles = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  };

  return (
    <div
      ref={ref}
      className={cn('relative flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-medium overflow-hidden', sizeStyles[size], className)}
      {...props}
    />
  );
});
Avatar.displayName = 'Avatar';

// AvatarImage Component
type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement>

const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(({ className, ...props }, ref) => {
  return (
    <img
      ref={ref}
      className={cn('h-full w-full object-cover', className)}
      {...props}
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        if (e.currentTarget.nextElementSibling) {
          e.currentTarget.nextElementSibling.classList.remove('hidden');
        }
      }}
    />
  );
});
AvatarImage.displayName = 'AvatarImage';

// AvatarFallback Component
type AvatarFallbackProps = React.HTMLAttributes<HTMLSpanElement>

const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn('flex h-full w-full items-center justify-center', className)}
      {...props}
    />
  );
});
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };