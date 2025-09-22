import { keyframes } from '@emotion/react'

// Keyframe animations
export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

export const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

export const slideInFromTop = keyframes`
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

export const slideInFromBottom = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

export const slideInFromLeft = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`

export const slideInFromRight = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`

export const slideOutToTop = keyframes`
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-100%); opacity: 0; }
`

export const slideOutToBottom = keyframes`
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(100%); opacity: 0; }
`

export const slideOutToLeft = keyframes`
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(-100%); opacity: 0; }
`

export const slideOutToRight = keyframes`
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
`

export const scaleIn = keyframes`
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`

export const scaleOut = keyframes`
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(0.9); opacity: 0; }
`

export const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translate3d(0, 0, 0); }
  40%, 43% { transform: translate3d(0, -8px, 0); }
  70% { transform: translate3d(0, -4px, 0); }
  90% { transform: translate3d(0, -2px, 0); }
`

export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

export const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`

export const flip = keyframes`
  from { transform: perspective(400px) rotate3d(0, 1, 0, -360deg); opacity: 0; }
  to { transform: perspective(400px); opacity: 1; }
`

export const zoomIn = keyframes`
  from { transform: scale3d(0.3, 0.3, 0.3); opacity: 0; }
  50% { opacity: 1; }
`

export const zoomOut = keyframes`
  from { opacity: 1; }
  50% { transform: scale3d(0.3, 0.3, 0.3); opacity: 0; }
  to { opacity: 0; }
`

// Animation presets
export const animationPresets = {
  // Page transitions
  pageEnter: {
    animation: `${slideInFromRight} 0.3s ease-out forwards`,
  },
  pageExit: {
    animation: `${slideOutToLeft} 0.3s ease-in forwards`,
  },
  
  // Modal animations
  modalEnter: {
    animation: `${scaleIn} 0.2s ease-out forwards`,
  },
  modalExit: {
    animation: `${scaleOut} 0.2s ease-in forwards`,
  },
  
  // Toast notifications
  toastEnter: {
    animation: `${slideInFromTop} 0.3s ease-out forwards`,
  },
  toastExit: {
    animation: `${slideOutToTop} 0.3s ease-in forwards`,
  },
  
  // Loading states
  loadingSpin: {
    animation: `${spin} 1s linear infinite`,
  },
  loadingPulse: {
    animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
  },
  
  // Attention grabbers
  attentionBounce: {
    animation: `${bounce} 1s infinite`,
  },
  attentionPulse: {
    animation: `${pulse} 2s infinite`,
  },
  
  // Error states
  errorShake: {
    animation: `${shake} 0.5s ease-in-out`,
  }
}

// Animation timing constants
export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 1000
} as const

export const ANIMATION_EASING = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
} as const

// Utility functions
export const createAnimation = (
  keyframes: string,
  duration: number = ANIMATION_DURATIONS.normal,
  easing: string = ANIMATION_EASING.easeInOut,
  fillMode: string = 'forwards'
) => {
  return {
    animation: `${keyframes} ${duration}ms ${easing} ${fillMode}`
  }
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Hook-like animation utilities
export const useAnimation = () => {
  const animate = async (element: HTMLElement, animation: string) => {
    return new Promise<void>((resolve) => {
      element.style.animation = animation
      const duration = parseInt(animation.match(/\d+/)?.[0] || '300')
      
      setTimeout(() => {
        resolve()
      }, duration)
    })
  }

  return { animate }
}

// CSS transition utilities
export const transitions = {
  // Basic transitions
  opacity: 'opacity 0.3s ease-in-out',
  transform: 'transform 0.3s ease-in-out',
  all: 'all 0.3s ease-in-out',
  
  // Component specific
  button: 'all 0.15s ease-in-out',
  card: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  input: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  
  // Complex transitions
  theme: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
  layout: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
}

// Animation classes for Tailwind CSS
export const animationClasses = {
  // Enter animations
  enter: 'animate-in',
  enterFromTop: 'animate-in slide-in-from-top',
  enterFromBottom: 'animate-in slide-in-from-bottom',
  enterFromLeft: 'animate-in slide-in-from-left',
  enterFromRight: 'animate-in slide-in-from-right',
  enterFade: 'animate-in fade-in',
  enterZoom: 'animate-in zoom-in',
  
  // Exit animations
  exit: 'animate-out',
  exitToTop: 'animate-out slide-out-to-top',
  exitToBottom: 'animate-out slide-out-to-bottom',
  exitToLeft: 'animate-out slide-out-to-left',
  exitToRight: 'animate-out slide-out-to-right',
  exitFade: 'animate-out fade-out',
  exitZoom: 'animate-out zoom-out',
  
  // Special animations
  spin: 'animate-spin',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  ping: 'animate-ping',
  
  // Animation durations
  duration75: 'duration-75',
  duration100: 'duration-100',
  duration150: 'duration-150',
  duration200: 'duration-200',
  duration300: 'duration-300',
  duration500: 'duration-500',
  duration700: 'duration-700',
  duration1000: 'duration-1000',
  
  // Animation timing functions
  easeLinear: 'ease-linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out'
}

export default {
  // Keyframes
  fadeIn,
  fadeOut,
  slideInFromTop,
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
  slideOutToTop,
  slideOutToBottom,
  slideOutToLeft,
  slideOutToRight,
  scaleIn,
  scaleOut,
  bounce,
  pulse,
  spin,
  shake,
  flip,
  zoomIn,
  zoomOut,
  
  // Presets
  animationPresets,
  
  // Constants
  ANIMATION_DURATIONS,
  ANIMATION_EASING,
  
  // Utilities
  createAnimation,
  delay,
  useAnimation,
  transitions,
  animationClasses
}