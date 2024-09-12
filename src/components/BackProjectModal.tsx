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
}

export default function BackProjectModal({
  title,
  description,
  rewards,
}: BackProjectModalProps) {
  return (
    <article className="">
      <div className="">
        <h2 className="">{title}</h2>
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
    </article>
  );
}
