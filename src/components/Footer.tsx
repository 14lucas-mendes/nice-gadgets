'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CircleChevronUp } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-[var(--footer-bg)] inset-shadow-gray-400 w-full border-t border-[var(--header-border)] md:h-24">
      <div className="flex flex-col items-start justify-center w-full gap-4 px-6 sm:px-8 sm:flex-row sm:flex-nowrap sm:items-center sm:justify-between h-full">
        <Link href="/" className="flex-shrink-0 flex items-center justify-start w-full sm:w-auto">
          <Image
            src="/img/icons/logo.svg"
            width={120}
            height={120}
            alt="logo"
            className="md:hover:scale-110 transition-all duration-300 ease-in-out sm:w-[125px] sm:h-[125px]"
          />
        </Link>

        <div className="text-sm sm:text-base md:text-lg text-[var(--text-muted)] font-bold flex flex-col items-start justify-center gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Link
            className="md:hover:text-black md:cursor-pointer md:transition-colors md:duration-300 md:ease-in-out lg:hover:text-black lg:cursor-pointer lg:transition-colors lg:duration-300 lg:ease-in-out"
            href="https://github.com/14lucas-mendes"
          >
            GitHub
          </Link>
          <Link
            className="md:hover:text-black md:cursor-pointer md:transition-colors md:duration-300 md:ease-in-out lg:hover:text-black lg:cursor-pointer lg:transition-colors lg:duration-300 lg:ease-in-out"
            href="https://www.linkedin.com/in/lucas-silva-mendes-5318101a7/"
          >
            Contacts
          </Link>
          <Link
            className="md:hover:text-black md:cursor-pointer md:transition-colors md:duration-300 md:ease-in-out lg:hover:text-black lg:cursor-pointer lg:transition-colors lg:duration-300 lg:ease-in-out"
            href="https://www.linkedin.com/in/lucas-silva-mendes-5318101a7/"
          >
            Rights
          </Link>
        </div>

        <div className="flex w-full items-center justify-center flex-shrink-0 sm:w-auto">
          <button
            onClick={handleScrollToTop}
            className="font-bold md:font-bold text-[#89939A] w-[170px] text-sm sm:text-base flex flex-row items-center justify-center gap-2 md:cursor-pointer md:transition-colors md:duration-300 md:ease-in-out"
            aria-label="Back to top"
          >
            Back to top
            <span className="flex items-center justify-center">
              <CircleChevronUp className="w-8 h-8 sm:w-10 sm:h-10" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
