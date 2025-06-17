'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link'; // Using Next.js Link for potential future client-side routing benefits

interface ScrollLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const ScrollLink: React.FC<ScrollLinkProps> = ({ href, children, className, onClick, ...props }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick();
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // If it's an internal anchor, use <a> for scrolling. Otherwise, use NextLink.
  if (href.startsWith('#')) {
    return (
      <a href={href} onClick={handleClick} className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} passHref legacyBehavior>
      <a onClick={handleClick} className={className} {...props}>
        {children}
      </a>
    </Link>
  );
};

export default ScrollLink;
