"use client";
import BackProjectModal from "./BackProjectModal";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/libs/utils";
import { projectDetails } from "@/libs/data";
import { useEffect, useState } from "react";
import { useSmallScreen } from "@/hooks/useSmallScreen";

type ProductPageProps = {
  title: string;
};

export default function ProductPage({ title }: ProductPageProps) {
  const isSmallScreen = useSmallScreen();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [isModalBackProjectActive, setIsModalBackProjectActive] =
    useState(false);
  const project = projectDetails.find(
    (project) => project.title?.toLowerCase() === title.toLowerCase(),
  );

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
    className,
  }: {
    currentFunding: number;
    targetFunding: number;
    className?: string;
  }) => {
    const progress = Math.min((currentFunding / targetFunding) * 100, 100);

    return (
      <div
        className={cn(
          "w-full bg-gray-300 h-3 rounded-full overflow-hidden",
          className,
        )}
      >
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

  const handleSelectReward = (rewardTitle: string | null) => {
    if (rewardTitle === null) {
      setIsModalBackProjectActive(false);
    }
    setSelectedReward(rewardTitle);
    setIsModalBackProjectActive(true);
  };

  return (
    <>
      <AnimatePresence>
        {isModalBackProjectActive && (
          <motion.div
            key="back-project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed flex z-30"
          >
            <BackProjectModal
              isActive={isModalBackProjectActive}
              onClose={() => {
                setIsModalBackProjectActive(false);
                setSelectedReward(null);
              }}
              title={project.modal.backThisProjectTitle}
              description={project.modal.backThisProjectDescription}
              rewards={project.rewards}
              selectedReward={selectedReward}
              selectReward={handleSelectReward}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <main
        className={cn(
          "flex flex-col items-center sm:items-start",
          "bg-top bg-no-repeat bg-contain pt-[244px] px-6 sm:pt-[308px]",
        )}
        style={
          isSmallScreen
            ? { backgroundImage: `url(${project.bgImage.mobile})` }
            : { backgroundImage: `url(${project.bgImage.desktop})` }
        }
      >
        <article className="sm:max-w-[730px] sm:mx-auto bg-white/10 rounded-lg px-6 backdrop-blur-lg sm:px-12">
          <div className="flex w-full justify-center -mt-7 h-14 ">
            <div
              className="size-14 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${project.logo})` }}
            />
          </div>
          <h1 className="w-full font-bold text-xl text-center text-pretty px-2 mt-6 text-cp-black leading-[1.2] sm:mt-[1.8rem] sm:text-[1.750rem]">
            {project.title}
          </h1>
          <p className="text-center mt-4 text-sm leading-[1.70] text-cp-dark-gray text-pretty sm:text-base sm:mt-[0.90rem]">
            {project.description}
          </p>
          <div className="flex mt-6 w-full justify-between gap-x-2 max-w-[280px] mx-auto sm:max-w-full sm:mt-9">
            <button
              className="bg-cp-moderate-cyan px-[46px] flex-shrink-0 py-4 font-semi-bold text-white rounded-full sm:px-[42px] hover:bg-cp-dark-cyan transition-color duration-300"
              onClick={handleBackProjectModal}
            >
              Back this project
            </button>
            <button
              className="flex items-center text-sm text-cp-dark-gray jusfity-center"
              aria-label="bookmark"
              onClick={() => {
                setIsBookmarked((prev) => !prev);
              }}
            >
              <div
                className={cn(
                  "bg-[url(/images/icon-bookmark.svg)] size-[3.5rem] bg-no-repeat bg-contain",
                  isBookmarked && "bg-[url(/images/icon-bookmarked.svg)]",
                )}
              />
              <span className="hidden font-semibold sm:inline-block sm:pr-6 sm:pl-4 sm:text-base">
                Bookmark
              </span>
            </button>
          </div>
          <section className="mt-[92px] flex flex-col gap-y-5 sm:mt-[116px] sm:gap-y-3">
            <div className="sm:flex sm:max-w-[514px] justify-between gap-x-12">
              <h3 className="flex pb-6 flex-col relative text-center leading-0 after:content-[''] after:bottom-0 after:w-[74px] after:h-[2px] after:bg-gray-300 after:absolute after:left-1/2 after:transform after:-translate-x-1/2 sm:after:content-none sm:text-left">
                <span className="text-cp-black font-bold text-[2rem]">
                  ${project.currentFunding.toLocaleString()}
                </span>
                <span className="text-sm text-cp-dark-gray mt-1 sm:text-[0.95rem]">
                  of ${project.targetFunding.toLocaleString()} backed
                </span>
              </h3>
              <h3 className="flex pb-6 flex-col relative text-center leading-0 after:content-[''] after:bottom-0 after:w-[74px] after:h-[3px] after:bg-gray-300 after:absolute after:left-1/2 after:transform after:-translate-x-1/2 sm:after:content-none sm:text-left sm:pr-12">
                <span className="text-cp-black font-bold text-[2rem]">
                  {project.totalBackers.toLocaleString()}
                </span>
                <span className="text-sm text-cp-dark-gray mt-1 sm:text-[0.95rem]">
                  total backers
                </span>
              </h3>
              <h3 className="flex pb-[10px] -mt-[2px] flex-col sm:text-left relative leading-0 self-center text-center sm:self-start sm:mt-0">
                <span className="text-cp-black font-bold text-[2rem]">
                  {project.daysLeft}
                </span>
                <span className="text-sm text-cp-dark-gray mt-1 sm:text-[0.95rem]">
                  days left
                </span>
              </h3>
            </div>
            <div className="w-full sm:max-w-[552px]">
              <ProgressBar
                currentFunding={project.currentFunding}
                targetFunding={project.targetFunding}
              />
            </div>
          </section>
          <section className="flex flex-col mt-[92px]">
            <h2 className="font-bold text-lg mt-[9px] sm:text-xl sm:mt-[26px]">
              About this project
            </h2>
            {project.aboutCopy.split("\n\n").map((paragraph, index) => (
              <p
                className="text-sm mt-[22px] leading-[1.725] text-cp-dark-gray sm:text-base sm:mt-[32px] sm:leading-[1.88]"
                key={index}
              >
                {paragraph}
              </p>
            ))}
          </section>
        </article>
        <article className="relative px-6 flex flex-col items-center mt-9 gap-y-[25px] pb-20 sm:max-w-[700px] sm:mx-auto sm:px-8 sm:gap-y-[20px]">
          {project.rewards.map(
            (reward) =>
              reward.title !== "Pledge with no reward" && (
                <section
                  className={cn(
                    "w-full border px-6 pt-5 pb-6 border-gray-300 rounded-lg mx-6 sm:px-8 sm:pt-10 sm:pb-8",
                    reward.isOutOfStock && "opacity-60",
                  )}
                  key={reward.title}
                >
                  <div className="flex flex-col text-sm sm:flex-row sm:text-[1.140rem] sm:justify-between">
                    <h3 className="font-bold">{reward.title}</h3>
                    <p className="mt-[6px] font-semibold text-cp-moderate-cyan sm:mt-0 sm:text-[15px]">
                      Pledge ${reward.pledgeAmount} or more
                    </p>
                  </div>
                  <p className="text-sm mt-[22px] leading-[1.725] text-cp-dark-gray sm:text-base sm:mt-[26px] sm:leading-[1.825]">
                    {reward.description}
                  </p>
                  <div className="sm:flex justify-between items-center sm:mt-[26px]">
                    <div className="flex mt-[26px] flex-col sm:mt-0">
                      <h4 className="flex items-center">
                        <span className="font-bold text-3xl">
                          {reward.left}
                        </span>{" "}
                        <span className="ml-3 text-cp-dark-gray text-[15px]">
                          {" "}
                          left
                        </span>
                      </h4>
                    </div>
                    <button
                      className={cn(
                        "bg-cp-moderate-cyan inline-block px-[32px] mt-6 py-[14px] font-semi-bold text-sm text-white rounded-full sm:mt-0",
                        reward.isOutOfStock && "bg-gray-400 cursor-not-allowed",
                      )}
                      disabled={reward.isOutOfStock}
                      onClick={() => handleSelectReward(reward.title)}
                    >
                      Select Reward
                    </button>
                  </div>
                </section>
              ),
          )}
        </article>
      </main>
    </>
  );
}
