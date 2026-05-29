import type { ReactNode } from "react";
import { Signal, Wifi } from "lucide-react";

interface PhoneFrameProps {
  title: string;
  subtitle: string;
  accent?: "sage" | "toss";
  children: ReactNode;
}

export default function PhoneFrame({
  title,
  subtitle,
  accent = "sage",
  children,
}: PhoneFrameProps) {
  const accentClass = accent === "sage" ? "bg-sage" : "bg-toss";

  return (
    <section className="w-full max-w-[350px]" aria-label={title}>
      <div className="mb-3 flex items-center gap-2.5 px-2">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full ${accentClass} text-[13px] font-black text-white`}
        >
          {accent === "sage" ? "효" : "돈"}
        </span>
        <div>
          <p className="text-sm font-semibold leading-tight text-muted">{subtitle}</p>
          <h2 className="text-xl font-black leading-tight text-ink">{title}</h2>
        </div>
      </div>

      <div className="relative mx-auto h-[620px] w-full rounded-[46px] bg-[#1C1B18] p-[10px] shadow-phone">
        <div className="relative h-full overflow-hidden rounded-[36px] bg-paper">
          <div className="absolute inset-x-0 top-0 z-30 flex h-11 items-center justify-between px-7 pt-1.5 text-[12px] font-black text-ink">
            <span>9:41</span>
            <div className="pointer-events-none absolute left-1/2 top-2 h-6 w-28 -translate-x-1/2 rounded-full bg-[#1C1B18]" />
            <div className="flex items-center gap-1.5">
              <Signal size={14} strokeWidth={2.5} />
              <Wifi size={14} strokeWidth={2.5} />
              <span className="relative h-3 w-6 rounded-[5px] border border-ink/45">
                <span className="absolute -right-1 top-1/2 h-1.5 w-0.5 -translate-y-1/2 rounded-r bg-ink/45" />
                <span className="absolute left-0.5 top-0.5 h-1.5 w-4 rounded-[3px] bg-ink" />
              </span>
            </div>
          </div>

          <div className="phone-scroll h-full overflow-y-auto pt-11 safe-bottom">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
