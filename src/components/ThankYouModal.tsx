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
    <article
      ref={thankYouRef}
      className="flex flex-col items-center justify-center pt-8 px-6 pb-10 bg-white rounded-xl shadow-3xl self-center mt-6 shadow-cp-black/50 shadow-lg"
    >
      <div className="size-16 bg-[url(/images/icon-check.svg)] bg-contain bg-no-repeat" />
      <h1 className="text-cp-black font-bold text-lg mt-5">
        {thankYouModal.h1}
      </h1>
      <p className="mt-[22px] text-sm text-center leading-[1.725] text-cp-dark-gray w-full">
        {thankYouModal.bodyCopy}
      </p>
      <button
        onClick={onClose}
        className="mt-[30px] font-semibold text-white py-[14px] rounded-full px-8 text-sm bg-cp-moderate-cyan"
      >
        Got it!
      </button>
    </article>
  );
}
