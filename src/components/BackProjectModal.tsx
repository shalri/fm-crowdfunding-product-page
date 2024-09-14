import { cn } from "@/libs/utils";

interface Reward {
  title: string;
  pledgeAmount: number;
  left: number;
  description: string;
  isOutOfStock: boolean;
}

interface BackProjectModalProps {
  title: string;
  description: string;
  rewards: Reward[];
  isActive: boolean;
  onClose: () => void;
}

export default function BackProjectModal({
  title,
  description,
  rewards,
  isActive,
  onClose,
}: BackProjectModalProps) {
  if (!isActive) return null;

  return (
    <div className="fixed px-6 py-[120px] overflow-y-auto inset-0 bg-black/50 z-30 sm:flex items-center">
      <article className="bg-white px-6 flex-grow">
        <div className="">
          <div className="">
            <h2 className="">{title}</h2>
            <button className="" onClick={onClose}>
              close modal
            </button>
          </div>
          <p className="">{description}</p>
        </div>
        <div className="">
          {rewards.map((reward) => (
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
      </article>{" "}
    </div>
  );
}
