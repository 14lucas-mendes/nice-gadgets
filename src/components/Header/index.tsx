'use client';

import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';
import MenuButton from './MenuButton';
import HeaderActions from './HeaderActions';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  //hook customizado para gerenciar o scroll quando o menu mobile está aberto
  useBodyScrollLock(isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="w-full h-12 flex items-center justify-between bg-[var(--header-bg)] border-b border-[var(--header-border)]">
      {/* Logo */}
      <div className="flex items-center sm:px-2 sm:py-4">
        <Link href="/" aria-label="Página inicial">
          <Image
            src="/img/icons/logo.svg"
            alt="Logo"
            width={120}
            height={120}
            className="sm:w-[150px] sm:h-[150px] md:hover:scale-110 transition-all duration-300 ease-in-out"
            priority
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <DesktopNav pathname={pathname} />

      {/* Mobile Menu */}
      {isMenuOpen && <MobileMenu pathName={pathname} onClose={closeMenu} />}

      {/* Mobile Menu Button */}
      <div className="flex items-center px-4 py-4">
        <MenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
      </div>

      {/* Desktop Actions */}
      <HeaderActions />
    </header>
  );
}
