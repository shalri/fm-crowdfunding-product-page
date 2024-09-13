"use client";
import { useSmallScreen } from "@/hooks/useSmallScreen";
import { projectDetails } from "@/libs/data";
import { cn } from "@/libs/utils";
import SuccessModal from "./SuccessModal";
import BackProjectModal from "./BackProjectModal";

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
  function ProgressBar({
    currentFunding,
    targetFunding,
  }: {
    currentFunding: number;
    targetFunding: number;
  }) {
    const progress = Math.min((currentFunding / targetFunding) * 100, 100);

    return (
      <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
        {/* TODO: show stats on hover i.e. 4434/10000 */}
        <div
          className="bg-cp-moderate-cyan h-full rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  }

  return (
    <main
      className={cn(
        "flex flex-col items-center sm:items-start",
        "bg-top bg-no-repeat bg-contain pt-[244px] px-6",
      )}
      style={
        isSmallScreen
          ? { backgroundImage: `url(${project.bgImage.mobile})` }
          : { backgroundImage: `url(${project.bgImage.desktop})` }
      }
    >
      <article className="bg-white/10 rounded-lg px-6 backdrop-blur-lg">
        <div className="flex w-full justify-center -mt-7">
          <div
            className="size-14 bg-contain"
            style={{ backgroundImage: `url(${project.logo})` }}
          />
        </div>
        <h1 className="w-full font-bold text-xl text-center text-pretty px-2 mt-[24px] text-cp-black leading-[1.2]">
          {project.title}
        </h1>
        <p className="text-center mt-4 text-sm leading-[1.70] text-cp-dark-gray">
          {project.description}
        </p>
        <div className="flex mt-6 w-full justify-between gap-x-2">
          <button className="bg-cp-moderate-cyan px-[46px] flex-shrink-0 py-4 font-bold text-white rounded-full">
            Back this project
          </button>
          <button
            className="bg-[url(/images/icon-bookmark.svg)] size-14 bg-no-repeat bg-contain"
            aria-label="bookmark"
          ></button>
        </div>
        <section className="">
          <h3 className="flex flex-col">
            <span className="">${project.currentFunding.toLocaleString()}</span>
            <span className="">
              of ${project.targetFunding.toLocaleString()}
            </span>
          </h3>
          <h3 className="flex flex-col">
            <span className="">${project.totalBackers.toLocaleString()}</span>
            <span className="">total backers</span>
          </h3>
          <h3 className="flex flex-col">
            <span className="">{project.daysLeft}</span>
            <span className="">days left</span>
          </h3>
          <ProgressBar
            currentFunding={project.currentFunding}
            targetFunding={project.targetFunding}
          />
        </section>
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
      <div className="hidden">
        <BackProjectModal
          title={project.modal.backThisProjectTitle}
          description={project.modal.backThisProjectDescription}
          rewards={project.rewards}
        />
        <SuccessModal successMessage={project.modal.successMessage} />
      </div>
    </main>
  );
}
