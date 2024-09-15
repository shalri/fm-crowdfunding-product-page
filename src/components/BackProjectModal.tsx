import useOutSideClick from "@/hooks/useOutsideClick";
import { cn } from "@/libs/utils";
import { useRef } from "react";

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
  noRewardDescription: string;
  noRewardTitle: string;
  onClose: () => void;
  rewards: Reward[];
  selectReward: (rewardTitle: string | null) => void;
  selectedReward: string | null;
  title: string;
}

export default function BackProjectModal({
  description,
  isActive,
  noRewardDescription,
  noRewardTitle,
  onClose,
  rewards,
  selectReward,
  selectedReward,
  title,
}: BackProjectModalProps) {
  const backProjectRef = useRef<HTMLDivElement | null>(null);

  useOutSideClick(backProjectRef, () => {
    onClose();
  });

  if (!isActive) return null;

  return (
    <div className="fixed px-6 py-[120px] overflow-y-auto inset-0 bg-black/50 z-40 sm:flex items-center">
      <article
        ref={backProjectRef}
        className="rounded-lg bg-white px-6 flex-grow py-[30px] z-50 max-w-[730px] mx-auto"
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
          <label
            className={cn(
              "block rounded-lg border-2 border-cp-dark-gray/50 px-6 py-[30px] relative",
              selectedReward === "no-reward" &&
              "border-2 border-cp-moderate-cyan",
            )}
          >
            <input
              type="radio"
              name="reward"
              value="no-reward"
              checked={selectedReward === "no-reward"}
              onChange={() => selectReward("no-reward")}
              className="absolute opacity-0"
            />
            <div className="flex items-center">
              <div
                className={cn(
                  "w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center",
                  selectedReward === "no-reward" && "border-cp-moderate-cyan",
                )}
              >
                {selectedReward === "no-reward" && (
                  <div className="w-3 h-3 bg-cp-moderate-cyan rounded-full" />
                )}
              </div>
              <h3 className="text-sm font-bold ml-4">{noRewardTitle}</h3>
            </div>
            <p className="text-sm mt-8 leading-[1.725] text-cp-dark-gray">
              {noRewardDescription}
            </p>
          </label>
          {rewards.map((reward) => (
            <label
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
              {/* header rewards */}
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
                    <p className="mt-1 text-cp-moderate-cyan text-sm">
                      Pledge ${reward.pledgeAmount} or more
                    </p>
                  </div>
                </div>
                <h4 className="text-sm hidden sm:inline-block">
                  <span className="font-bold">{reward.left}</span> left
                </h4>
              </div>
              <p className="text-sm mt-6 leading-[1.725] text-cp-dark-gray">
                {reward.description}
              </p>
              <h4 className="mt-5 sm:hidden font-bold text-lg text-cp-black">
                {reward.left}{" "}
                <span className="text-[15px] ml-1 font-normal text-cp-dark-gray">
                  {" "}
                  left
                </span>
              </h4>
              {selectedReward === reward.title && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-cp-dark-gray/20">
                  <p className="text-sm text-cp-dark-gray">Enter your pledge</p>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">$</span>
                    <input
                      type="number"
                      defaultValue={reward.pledgeAmount}
                      min={reward.pledgeAmount}
                      className="w-20 px-3 py-1 border rounded-full text-center"
                    />
                    <button className="ml-4 bg-cp-moderate-cyan text-white px-6 py-2 rounded-full text-sm">
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </label>
          ))}
        </div>
      </article>
    </div>
  );
}
