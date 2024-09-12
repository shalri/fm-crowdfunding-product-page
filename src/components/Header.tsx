import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/libs/data";

export default function Header() {
  return (
    <header className="bg-gray-600 row-start-1 items-center sm:items-start place-self-start">
      <div className="h-8 w-16 font-bold text-4xl relative">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="crowdfund logo"
            fill
            className="object-contain"
          />
        </Link>
      </div>
      <nav className="">
        <ul className="">
          {navLinks.map((link) => (
            <li className="" key={link.label}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className="size-8 bg-[url(/images/icon-hamburger.svg)] bg-no-repeat"
        aria-label="Open Menu"
      ></button>
    </header>
  );
}
