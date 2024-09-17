import useOutSideClick from "@/hooks/useOutsideClick";
import { cn } from "@/libs/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import ThankYouModal from "./ThankYouModal";

interface Reward {
  description: string;
  isOutOfStock: boolean;
  left: number;
  pledgeAmount: number;
  title: string;
}

interface BackProjectModalProps {
  description: string;
  isActive: boolean;
  onClose: () => void;
  rewards: Reward[];
  selectReward: (rewardTitle: string | null) => void;
  selectedReward: string | null;
  title: string;
}

export default function BackProjectModal({
  description,
  isActive,
  onClose,
  rewards,
  selectReward,
  selectedReward,
  title,
}: BackProjectModalProps) {
  const [isThankYouModalActive, setIsThankYouModalActive] = useState(false);
  const [isThankYouConfirmed, setIsThankYouConfirmed] = useState(false);
  const backProjectRef = useRef<HTMLDivElement | null>(null);

  useOutSideClick(backProjectRef, () => {
    onClose();
  });

  if (!isActive) return null;

  return (
    <div
      className={cn(
        "fixed px-6 py-[120px] overflow-y-auto inset-0 bg-black/50 z-40 sm:flex items-center transition-all",
        isThankYouModalActive && "backdrop-blur-[2px] bg-black/30",
      )}
    >
      {!isThankYouModalActive ? (
        <article
          ref={backProjectRef}
          className={cn(
            "rounded-lg bg-white px-6 flex-grow py-[30px] z-50 max-w-[730px] mx-auto",
            isThankYouConfirmed && "hidden",
          )}
        >
          <div className="mb-6">
            <div className="flex justify-between items-baseline">
              <h2 className="font-bold text-lg text-cp-black">{title}</h2>
              <button
                aria-label="Close Rewards Selection"
                className="bg-[url(/images/icon-close-modal.svg)] bg-contain bg-no-repeat size-4"
                onClick={onClose}
              ></button>
            </div>
            <p className="text-sm mt-[22px] leading-[1.725] text-cp-dark-gray">
              {description}
            </p>
          </div>
          <div className="space-y-6">
            {rewards.map((reward) => (
              <motion.label
                className={cn(
                  "block rounded-lg border-2 border-cp-dark-gray/50 px-6 pt-5 pb-7 relative",
                  reward.isOutOfStock && "opacity-50",
                  selectedReward === reward.title &&
                    "border-2 border-cp-moderate-cyan",
                )}
                key={reward.title}
              >
                <input
                  type="radio"
                  name="reward"
                  value={reward.title}
                  checked={selectedReward === reward.title}
                  onChange={() => selectReward(reward.title)}
                  disabled={reward.isOutOfStock}
                  className="absolute opacity-0"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center",
                        selectedReward === reward.title &&
                          "border-cp-moderate-cyan",
                      )}
                    >
                      {selectedReward === reward.title && (
                        <div className="w-3 h-3 bg-cp-moderate-cyan rounded-full" />
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-bold">{reward.title}</h3>
                      {reward.title === "Pledge with no reward" ? null : (
                        <p className="mt-1 text-cp-moderate-cyan text-sm">
                          Pledge ${reward.pledgeAmount} or more
                        </p>
                      )}
                    </div>
                  </div>
                  <h4 className="text-sm hidden sm:inline-block">
                    <span className="font-bold">{reward.left}</span> left
                  </h4>
                </div>
                <p className="text-sm mt-6 leading-[1.725] text-cp-dark-gray">
                  {reward.description}
                </p>
                {reward.title === "Pledge with no reward" ? null : (
                  <h4 className="mt-5 sm:hidden font-bold text-lg text-cp-black">
                    {reward.left}{" "}
                    <span className="text-[15px] ml-1 font-normal text-cp-dark-gray">
                      {" "}
                      left
                    </span>
                  </h4>
                )}
                <AnimatePresence>
                  {selectedReward === reward.title && (
                    <motion.div
                      layout
                      // key={reward.title}
                      initial="collapse"
                      animate="open"
                      exit="collapse"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapse: { opacity: 0, height: 0 },
                      }}
                      transition={{
                        duration: 0.075,
                        // ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                      className="grid grid-cols-2 mt-6 pt-6 border-t border-cp-dark-gray/20 overflow-hidden"
                    >
                      {reward.title === "Pledge with no reward" ? null : (
                        <p className="cols-start-1 pb-4 text-sm text-cp-dark-gray w-full text-center row-start-1 col-span-2">
                          Enter your pledge
                        </p>
                      )}
                      <div className="grid grid-cols-2 col-span-2 row-start-2">
                        <div className="col-span-1 relative">
                          {reward.title === "Pledge with no reward" ? null : (
                            <>
                              <span className="text-sm mr-2 absolute top-[14px] left-5 text-cp-dark-gray">
                                $
                              </span>
                              <input
                                type="number"
                                defaultValue={reward.pledgeAmount}
                                min={reward.pledgeAmount}
                                max={1000}
                                className="w-[80%] pl-3 pr-3 py-[12px] font-bold text-[15px] border border-cp-dark-gray/50 rounded-full text-center"
                                onInput={(e) => {
                                  const input = e.target as HTMLInputElement;
                                  if (input.value.length > 4) {
                                    input.value = input.value.slice(0, 4); // Limit to 4 digits
                                  }
                                }}
                              />
                            </>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setIsThankYouModalActive(true);
                            setIsThankYouConfirmed(true);
                          }}
                          className="col-span-1 bg-cp-moderate-cyan text-white px-6 py-[14px] rounded-full text-sm"
                        >
                          Continue
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.label>
            ))}
          </div>
        </article>
      ) : (
        <AnimatePresence>
          <motion.div
            key="thankyou-modal"
            initial={{ opacity: 0, y: "-20%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex-grow items-center justify-center"
          >
            <ThankYouModal
              onClose={() => {
                setIsThankYouModalActive(false);
                onClose();
              }}
              isActive={isThankYouModalActive}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
