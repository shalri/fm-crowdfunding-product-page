import useOutSideClick from "@/hooks/useOutsideClick";
import { thankYouModal } from "@/libs/data";
import { useRef } from "react";

interface ThankYouModalProps {
  isActive: boolean;
  onClose: () => void;
}

export default function ThankYouModal({
  isActive,
  onClose,
}: ThankYouModalProps) {
  const thankYouRef = useRef<HTMLDivElement | null>(null);

  useOutSideClick(thankYouRef, onClose);

  if (!isActive) {
    return null;
  }

  return (
    <article ref={thankYouRef}>
      <div className="size-10 bg-[url(/images/icon-check.svg)] bg-contain bg-no-repeat" />
      <h1 className="">{thankYouModal.h1}</h1>
      <p className="">{thankYouModal.bodyCopy}</p>
      <button onClick={onClose} className="bg-cp-moderate-cyan">
        Got it!
      </button>
    </article>
  );
}
