"use client";
import { useSmallScreen } from "@/hooks/useSmallScreen";
import { projectDetails } from "@/libs/data";
import { cn } from "@/libs/utils";

type ProductPageProps = {
  title: string;
};

export default function ProductPage({ title }: ProductPageProps) {
  const isSmallScreen = useSmallScreen();
  const project = projectDetails.find(
    (project) => project.title?.toLowerCase() === title.toLowerCase(),
  );

  if (!project) {
    return "Project not found";
  }

  // const { title, description, currentFunding, logo, targetFunding } = project;

  return (
    <main
      className={cn(
        "flex flex-col gap-8 items-center sm:items-start",
        "bg-top bg-no-repeat",
      )}
      style={
        isSmallScreen
          ? { backgroundImage: `url(${project.bgImage.mobile})` }
          : { backgroundImage: `url(${project.bgImage.desktop})` }
      }
    >
      <div
        style={{ backgroundImage: `url(${project.logo})` }} // Use inline styles for dynamic URL
      />
      <article>
        <h1 className="w-full font-bold text-xl">{project.title}</h1>
        <p className="">{project.description}</p>
        <div className="flex">
          <button className="bg-cp-moderate-cyan">Back this project</button>
          <button
            className="bg-[url(/images/icon-bookmark.svg)] size-10"
            aria-label="bookmark"
          ></button>
        </div>
        <section className="">
          <h3 className="flex flex-col">
            <span className="">${project.currentFunding}</span>
            <span className="">of ${project.targetFunding}</span>
          </h3>
          <h3 className="flex flex-col">
            <span className="">${project.totalBackers}</span>
            <span className="">total backers</span>
          </h3>
          <h3 className="flex flex-col">
            <span className="">{project.daysLeft}</span>
            <span className="">days left</span>
          </h3>
        </section>
        {/* TODO: dynamically render this */}
        <div className="w-full bg-cp-dark-cyan h-4">Progress bar</div>
        <section className="flex flex-col">
          <h2 className="font-bold">About this product</h2>
          {project.aboutCopy.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>
      </article>
      <article className="">
        {project.rewards.map((reward) => (
          <section className="" key={reward.title}>
            <div className="flex">
              <h3 className="">{reward.title}</h3>
              <p className="text-cp-moderate-cyan">
                Pledge ${reward.pledgeAmount} or more
              </p>
            </div>
            <p className="">{reward.description}</p>
            <div className="flex">
              <h4>
                <span className="font-bold">{reward.left}</span> left
              </h4>
              <button className="bg-cp-moderate-cyan">Select Reward</button>
            </div>
          </section>
        ))}
      </article>
      {/* Modal Back Project */}
      {/* TODO: extract this to its own component */}
      <article className="">
        <div className="">
          <h2 className="">{project.modal.backThisProjectTitle}</h2>
          <p className="">{project.modal.backThisProjectDescription}</p>
        </div>
        <div className="">
          {project.rewards.map((reward) => (
            <section
              className={cn("", reward.isOutOfStock && "opacity-50")}
              key={reward.title}
            >
              <div className="flex">
                <h3 className="">{reward.title}</h3>
                <p className="text-cp-moderate-cyan">
                  Pledge ${reward.pledgeAmount} or more
                </p>
                <h4>
                  <span className="font-bold">{reward.left}</span> left
                </h4>
              </div>
              <p className="">{reward.description}</p>
              <div className="flex">
                <p className="">Enter your pledge</p>
                <p className="">
                  <span>$ </span>
                  <span>{reward.pledgeAmount}</span>
                </p>
                <button className="bg-cp-moderate-cyan">Select Reward</button>
              </div>
            </section>
          ))}
        </div>
      </article>
      {/* Modal Success */}
      {/* TODO: extract this to its own component */}
      <article>
        <div className="size-10 bg-[url(/images/icon-check.svg)] bg-contain bg-no-repeat" />
        <h2 className="">Thanks for your support!</h2>
        <p className="">{project.modal.successMessage}</p>
        <button className="bg-cp-moderate-cyan">Got it!</button>
      </article>
    </main>
  );
}
