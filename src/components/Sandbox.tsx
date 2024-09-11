import Image from "next/image";

export default function Sandbox() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="w-full font-bold text-xl">きそ&middot; KISO</h1>
      <p className="">A basic NextJS template for Vercel deployment.</p>
      <Image
        src="/images/image-hero-desktop.jpg"
        width={500}
        height={300}
        alt="test"
      />
    </main>
  );
}
