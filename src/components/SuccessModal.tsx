import { thankYouModal } from "@/libs/data";

interface SuccessModalProps {
  isActive: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isActive, onClose }: SuccessModalProps) {
  if (!isActive) {
    return null;
  }
  return (
    <article>
      <div className="size-10 bg-[url(/images/icon-check.svg)] bg-contain bg-no-repeat" />
      <h1 className="">{thankYouModal.h1}</h1>
      <p className="">{thankYouModal.bodyCopy}</p>
      <button onClick={onClose} className="bg-cp-moderate-cyan">
        Got it!
      </button>
    </article>
  );
}
