interface SuccessModalProps {
  successMessage: string;
}

export default function SuccessModal({ successMessage }: SuccessModalProps) {
  return (
    <article>
      <div className="size-10 bg-[url(/images/icon-check.svg)] bg-contain bg-no-repeat" />
      <h2 className="">Thanks for your support!</h2>
      <p className="">{successMessage}</p>
      <button className="bg-cp-moderate-cyan">Got it!</button>
    </article>
  );
}
