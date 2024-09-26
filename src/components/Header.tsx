"use client";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/libs/data";
import { useMobileNav } from "@/hooks/useMobileNavigation";
import { useSmallScreen } from "@/hooks/useSmallScreen";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/libs/utils";
import { AnimatePresence, motion } from "framer-motion";

function Logo() {
  return (
    <div className="z-50 h-8 w-[130px] font-bold text-4xl relative sm:h-6 sm:mb-[2px]">
      <Link href="/">
        <Image
          src="/images/logo.svg"
          alt="crowdfund logo"
          fill
          className="object-contain z-20"
        />
      </Link>
    </div>
  );
}

function NavContent({
  handleLinkClink,
}: {
  handleLinkClink: (e: React.MouseEvent) => void;
}) {
  return (
    <ul className="flex flex-col divide-y divide-gray-200 gap-y-[22px] sm:flex-row sm:divide-none sm:gap-x-[1.92rem] sm:gap-y-0">
      {navLinks.map((link) => (
        <li
          className="px-6 pt-[20px] last:pb-6 sm:px-0 sm:last:pb-0 sm:pt-[18px]"
          key={link.label}
        >
          <Link
            href={link.href}
            className="text-lg font-semi-bold text-cp-black sm:text-[0.840rem] sm:text-white"
            onClick={handleLinkClink}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MenuButton({
  isMobileNavActive,
  toggleMobileNav,
}: {
  isMobileNavActive: boolean;
  toggleMobileNav: () => void;
}) {
  return (
    <button
      className={cn(
        "size-4 bg-[url(/images/icon-hamburger.svg)] bg-no-repeat sm:hidden",
        isMobileNavActive && "bg-[url(/images/icon-close-menu.svg)] z-50",
      )}
      aria-label="Open Menu"
      onClick={toggleMobileNav}
    ></button>
  );
}

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const isSmallScreen = useSmallScreen();
  const navRef = useRef<HTMLDivElement>(null);
  const { isMobileNavActive, toggleMobileNav, closeMobileNav } = useMobileNav(
    navRef,
    isSmallScreen,
  );
  const mobileAnimationWrapper = useCallback(
    (children: React.ReactNode) => {
      return (
        <AnimatePresence>
          {isMobileNavActive && (
            <motion.div
              layout
              key="mobile-nav"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ height: 0 }}
              className="z-50 fixed bg-white right-6 left-6 top-[88px] rounded-lg overflow-hidden"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      );
    },
    [isMobileNavActive],
  );

  const handleLinkClink = () => {
    if (isSmallScreen) {
      closeMobileNav();
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isMobileNavActive && isSmallScreen && (
          <motion.div
            key={"mobileNav"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-10"
          />
        )}
      </AnimatePresence>
      <header className="w-full pt-[26px] absolute px-6 flex items-center justify-between sm:max-w-[1158px] sm:mx-auto sm:left-[50%] sm:transform sm:-translate-x-1/2  sm:items-end">
        <Logo />
        {mounted && (
          <nav className="relative" ref={navRef}>
            {isSmallScreen ? (
              mobileAnimationWrapper(
                <NavContent handleLinkClink={handleLinkClink} />,
              )
            ) : (
              <NavContent handleLinkClink={handleLinkClink} />
            )}
          </nav>
        )}
        <MenuButton
          isMobileNavActive={isMobileNavActive}
          toggleMobileNav={toggleMobileNav}
        />
      </header>
    </>
  );
}
