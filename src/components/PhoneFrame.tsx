import type { ReactNode } from "react";

interface PhoneFrameProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function PhoneFrame({ title, subtitle, children }: PhoneFrameProps) {
  return (
    <section className="w-full max-w-[350px]" aria-label={title}>
      <div className="mb-3 px-3">
        <p className="text-sm font-semibold text-muted">{subtitle}</p>
        <h2 className="text-xl font-bold text-ink">{title}</h2>
      </div>

      <div className="relative mx-auto h-[640px] w-full rounded-[42px] border border-white/80 bg-[#111318] p-[10px] shadow-phone">
        <div className="absolute left-1/2 top-[18px] z-20 h-[25px] w-[112px] -translate-x-1/2 rounded-full bg-[#111318] shadow-inner" />
        <div className="relative h-full overflow-hidden rounded-[34px] bg-soft">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-white/95 to-white/0" />
          <div className="phone-scroll h-full overflow-y-auto safe-bottom">{children}</div>
        </div>
      </div>
    </section>
  );
}
