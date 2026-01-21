'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function FooterLogo() {
  return (
    <Link
      href="/"
      className="flex-shrink-0 flex items-center justify-start w-full sm:w-auto"
      aria-label="Voltar à página inicial"
    >
      <Image
        src="/img/icons/logo.svg"
        width={120}
        height={120}
        alt="Logo"
        className="transition-transform duration-300 hover:scale-110 sm:w-[125px] sm:h-[125px]"
      />
    </Link>
  );
}
