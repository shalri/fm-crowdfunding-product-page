"use client";

import { projectDetails } from "@/libs/data";
import { cn } from "@/libs/utils";
import Image from "next/image";

type ProductPageProps = {
  title: string;
};

export default function ProductPage({ title }: ProductPageProps) {
  console.log(title);
  const project = projectDetails.find(
    (project) => project.title?.toLowerCase() === title.toLowerCase(),
  );

  if (!project) {
    return "Project not found";
  }

  // const { title, description, currentFunding, logo, targetFunding } = project;

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div
        className="size-20 bg-no-repeat"
        style={{ backgroundImage: `url(${project.logo})` }} // Use inline styles for dynamic URL
      />
      <h1 className="w-full font-bold text-xl">{project.title}</h1>
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
