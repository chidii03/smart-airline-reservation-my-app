// components/ui/popover.tsx
import { useState, useRef, useEffect, forwardRef } from 'react';
import { cn } from '@/app/lib/utils';

interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>(({ children, isOpen: controlledIsOpen, onOpenChange, className, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(controlledIsOpen ?? false);

  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);

  return (
    <div ref={ref} className={cn('popover-container', className)} {...props}>
      <PopoverContext.Provider value={{ isOpen, setIsOpen, onOpenChange }}>
        {children}
      </PopoverContext.Provider>
    </div>
  );
});
Popover.displayName = 'Popover';

type PopoverTriggerProps = React.HTMLAttributes<HTMLDivElement>

const PopoverTrigger = forwardRef<HTMLDivElement, PopoverTriggerProps>(({ children, className, ...props }, ref) => {
  const { setIsOpen, onOpenChange } = usePopoverContext();

  const handleClick = () => {
    const newOpen = true;
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <div ref={ref} className={cn('popover-trigger', className)} onClick={handleClick} {...props}>
      {children}
    </div>
  );
});
PopoverTrigger.displayName = 'PopoverTrigger';

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(({ children, position = 'bottom', className, ...props }, ref) => {
  const { isOpen, setIsOpen, onOpenChange } = usePopoverContext();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen, onOpenChange]);

  const positionStyles = {
    top: 'popover-position-top',
    bottom: 'popover-position-bottom',
    left: 'popover-position-left',
    right: 'popover-position-right',
  };

  if (!isOpen) return null;

  return (
    <div
      ref={contentRef}
      className={cn('popover-content', positionStyles[position], className)}
      {...props}
    >
      {children}
    </div>
  );
});
PopoverContent.displayName = 'PopoverContent';

import { createContext, useContext } from 'react';

interface PopoverContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onOpenChange?: (open: boolean) => void;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('PopoverTrigger and PopoverContent must be used within a Popover');
  }
  return context;
}

export { Popover, PopoverTrigger, PopoverContent };