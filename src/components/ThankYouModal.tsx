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
      className="flex flex-col items-center justify-center pt-8 px-6 pb-10 bg-white rounded-xl shadow-3xl self-center mt-6 shadow-cp-black/50 shadow-lg sm:max-w-[538px] mx-auto sm:px-10 sm:pt-12 sm:pb-12"
    >
      <div className="size-16 bg-[url(/images/icon-check.svg)] bg-contain bg-no-repeat sm:size-[5.75rem]" />
      <h1 className="text-cp-black font-bold text-lg mt-5 sm:text-2xl text-pretty sm:mt-11">
        {thankYouModal.h1}
      </h1>
      <p className="mt-[22px] text-sm text-center leading-[1.725] text-cp-dark-gray w-full sm:text-base sm:leading-[1.85] sm:mt-4">
        {thankYouModal.bodyCopy}
      </p>
      <button
        onClick={onClose}
        className="hover:bg-cp-dark-cyan transition-all duration-300 mt-[30px] font-semibold text-white py-[14px] rounded-full px-8 text-sm bg-cp-moderate-cyan sm:mt-[32px]"
      >
        Got it!
      </button>
    </article>
  );
}
