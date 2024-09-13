"use client";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/libs/data";
import { useMobileNav } from "@/hooks/useMobileNavigation";
import { useSmallScreen } from "@/hooks/useSmallScreen";
import { useRef } from "react";
import { cn } from "@/libs/utils";

function Logo() {
  return (
    <div className="h-8 w-[130px] font-bold text-4xl relative">
      <Link href="/">
        <Image
          src="/images/logo.svg"
          alt="crowdfund logo"
          fill
          className="object-contain"
        />
      </Link>
    </div>
  );
}

function NavContent() {
  return (
    <ul className="">
      {navLinks.map((link) => (
        <li className="" key={link.label}>
          <Link href={link.href}>{link.label}</Link>
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
        "size-4 bg-[url(/images/icon-hamburger.svg)] bg-no-repeat",
        isMobileNavActive && "bg-[url(/images/icon-close-menu.svg)]",
      )}
      aria-label="Open Menu"
      onClick={toggleMobileNav}
    ></button>
  );
}

export default function Header() {
  const isSmallScreen = useSmallScreen();
  const navRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isMobileNavActive, toggleMobileNav, closeMobileNav } = useMobileNav(
    navRef,
    isSmallScreen,
  );
  return (
    <header className="w-full pt-[26px] absolute px-6 flex items-center justify-between">
      <Logo />
      <nav className="hidden">
        <NavContent />
      </nav>
      <MenuButton
        isMobileNavActive={isMobileNavActive}
        toggleMobileNav={toggleMobileNav}
      />
    </header>
  );
}
