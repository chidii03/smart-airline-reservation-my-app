'use client';

import { Button } from '@/app/components/ui/button';
import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { cn } from '@/app/lib/utils';

interface SocialLoginProps {
  onGoogleLogin: () => void;
  onFacebookLogin: () => void;
  onTwitterLogin: () => void;
  onGithubLogin: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function SocialLogin({
  onGoogleLogin,
  onFacebookLogin,
  onTwitterLogin,
  onGithubLogin,
  isLoading = false,
  disabled = false,
}: SocialLoginProps) {
  const socialButtons = [
    {
      provider: 'google',
      label: 'Continue with Google',
      icon: FaGoogle,
      onClick: onGoogleLogin,
      color: 'hover:bg-red-50 border-red-200 text-red-600',
    },
    {
      provider: 'facebook',
      label: 'Continue with Facebook',
      icon: FaFacebook,
      onClick: onFacebookLogin,
      color: 'hover:bg-blue-50 border-blue-200 text-blue-600',
    },
    {
      provider: 'x',
      label: 'Continue with X',
      icon: BsTwitterX,
      onClick: onTwitterLogin,
      color: 'hover:bg-gray-50 border-gray-200 text-gray-900',
    },
    {
      provider: 'github',
      label: 'Continue with GitHub',
      icon: FaGithub,
      onClick: onGithubLogin,
      color: 'hover:bg-gray-50 border-gray-200 text-gray-800',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {socialButtons.map((button) => {
          const Icon = button.icon;
          return (
            <Button
              key={button.provider}
              variant="outline"
              onClick={button.onClick}
              disabled={disabled || isLoading}
              className={cn(
                "w-full justify-start transition-colors",
                button.color,
                "border-2"
              )}
              type="button"
            >
              <Icon className="w-5 h-5 mr-2" />
              {button.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}