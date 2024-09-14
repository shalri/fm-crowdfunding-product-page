"use client";
import { useSmallScreen } from "@/hooks/useSmallScreen";
import { projectDetails } from "@/libs/data";
import { cn } from "@/libs/utils";
// import SuccessModal from "./SuccessModal";
import BackProjectModal from "./BackProjectModal";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useOutSideClick from "@/hooks/useOutsideClick";

type ProductPageProps = {
  title: string;
};

export default function ProductPage({ title }: ProductPageProps) {
  const backProjectRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useSmallScreen();
  const [isBookmarked, setIsBookmarked] = useState(false);
  // TODO: change to false
  const [isModalBackProjectActive, setIsModalBackProjectActive] =
    useState(true); // code layout mode
  const project = projectDetails.find(
    (project) => project.title?.toLowerCase() === title.toLowerCase(),
  );

  useOutSideClick(backProjectRef, () => setIsModalBackProjectActive(false));

  useEffect(() => {
    const updateBodyClass = () => {
      if (isModalBackProjectActive) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    };
    updateBodyClass();

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isModalBackProjectActive]);

  if (!project) {
    return "Project not found";
  }

  const ProgressBar = ({
    currentFunding,
    targetFunding,
  }: {
    currentFunding: number;
    targetFunding: number;
  }) => {
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
  };

  const handleBackProjectModal = () => {
    setIsModalBackProjectActive((prev) => !prev);
  };

  return (
    <>
      <AnimatePresence>
        {isModalBackProjectActive && (
          <motion.div
            ref={backProjectRef}
            key="backProjectModal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BackProjectModal
              isActive={isModalBackProjectActive}
              onClose={() => setIsModalBackProjectActive(false)}
              title={project.modal.backThisProjectTitle}
              description={project.modal.backThisProjectDescription}
              rewards={project.rewards}
            />
          </motion.div>
        )}
      </AnimatePresence>
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
          <div className="flex w-full justify-center -mt-7 h-14">
            <div
              className="size-14 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${project.logo})` }}
            />
          </div>
          <h1 className="w-full font-bold text-xl text-center text-pretty px-2 mt-[24px] text-cp-black leading-[1.2]">
            {project.title}
          </h1>
          <p className="text-center mt-4 text-sm leading-[1.70] text-cp-dark-gray text-pretty">
            {project.description}
          </p>
          <div className="flex mt-6 w-full justify-between gap-x-2 max-w-[280px] mx-auto">
            <button
              className="bg-cp-moderate-cyan px-[46px] flex-shrink-0 py-4 font-semi-bold text-white rounded-full"
              onClick={handleBackProjectModal}
            >
              Back this project
            </button>
            <button
              className={cn(
                "bg-[url(/images/icon-bookmark.svg)] size-14 bg-no-repeat bg-contain",
                isBookmarked && "bg-[url(/images/icon-bookmarked.svg)]",
              )}
              aria-label="bookmark"
              onClick={() => {
                setIsBookmarked((prev) => !prev);
              }}
            ></button>
          </div>
          <section className="mt-[92px] flex flex-col gap-y-5">
            <h3 className="flex pb-6 flex-col relative text-center leading-0 after:content-[''] after:bottom-0 after:w-[74px] after:h-[2px] after:bg-gray-300 after:absolute after:left-1/2 after:transform after:-translate-x-1/2">
              <span className="text-cp-black font-bold text-[2rem]">
                ${project.currentFunding.toLocaleString()}
              </span>
              <span className="text-sm text-cp-dark-gray mt-1">
                of ${project.targetFunding.toLocaleString()} backed
              </span>
            </h3>
            <h3 className="flex pb-6 flex-col relative text-center leading-0 after:content-[''] after:bottom-0 after:w-[74px] after:h-[3px] after:bg-gray-300 after:absolute after:left-1/2 after:transform after:-translate-x-1/2">
              <span className="text-cp-black font-bold text-[2rem]">
                {project.totalBackers.toLocaleString()}
              </span>
              <span className="text-sm text-cp-dark-gray mt-1">
                total backers
              </span>
            </h3>
            <h3 className="flex pb-[10px] -mt-[2px] flex-col relative leading-0 self-center text-center">
              <span className="text-cp-black font-bold text-[2rem]">
                {project.daysLeft}
              </span>
              <span className="text-sm text-cp-dark-gray mt-1">days left</span>
            </h3>
            <ProgressBar
              currentFunding={project.currentFunding}
              targetFunding={project.targetFunding}
            />
          </section>
          <section className="flex flex-col mt-[92px]">
            <h2 className="font-bold text-lg mt-[9px]">About this project</h2>
            {project.aboutCopy.split("\n\n").map((paragraph, index) => (
              <p
                className="text-sm mt-[22px] leading-[1.725] text-cp-dark-gray"
                key={index}
              >
                {paragraph}
              </p>
            ))}
          </section>
        </article>
        <article className="relative px-6 flex flex-col items-center mt-9 gap-y-[25px] pb-20">
          {project.rewards.map((reward) => (
            <section
              className={cn(
                "w-full border px-6 pt-5 pb-6 border-gray-300 rounded-lg mx-6",
                reward.isOutOfStock && "opacity-60",
              )}
              key={reward.title}
            >
              <div className="flex flex-col text-sm">
                <h3 className="font-bold">{reward.title}</h3>
                <p className="mt-[6px] font-semi-bold text-cp-moderate-cyan">
                  Pledge ${reward.pledgeAmount} or more
                </p>
              </div>
              <p className="text-sm mt-[22px] leading-[1.725] text-cp-dark-gray">
                {reward.description}
              </p>
              <div className="flex mt-[26px] flex-col">
                <h4 className="flex items-center">
                  <span className="font-bold text-3xl">{reward.left}</span>{" "}
                  <span className="ml-3 text-cp-dark-gray text-[15px]">
                    {" "}
                    left
                  </span>
                </h4>
              </div>
              <button
                className={cn(
                  "bg-cp-moderate-cyan inline-block px-[32px] mt-6 py-[14px] font-semi-bold text-sm text-white rounded-full",
                  reward.isOutOfStock && "bg-gray-400 cursor-not-allowed",
                )}
                disabled={reward.isOutOfStock}
                onClick={handleBackProjectModal}
              >
                Select Reward
              </button>
            </section>
          ))}
        </article>
        {/* <div className="hidden"> */}
        {/*   <SuccessModal successMessage={project.modal.successMessage} /> */}
        {/* </div> */}
      </main>
    </>
  );
}
