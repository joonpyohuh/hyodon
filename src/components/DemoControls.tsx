import { RotateCcw, ShieldAlert, ShoppingBag, Sprout } from "lucide-react";
import type { Merchant } from "../types";

interface DemoControlsProps {
  merchants: Merchant[];
  onSelectScenario: (merchantId: string) => void;
  onReset: () => void;
}

const scenarioMeta = [
  {
    merchantId: "happy-mart",
    label: "소액 결제 시연",
    icon: ShoppingBag,
  },
  {
    merchantId: "health-store",
    label: "고액 승인 시연",
    icon: Sprout,
  },
  {
    merchantId: "atm-transfer",
    label: "이상거래 차단 시연",
    icon: ShieldAlert,
  },
];

export default function DemoControls({
  merchants,
  onSelectScenario,
  onReset,
}: DemoControlsProps) {
  return (
    <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-3">
      {scenarioMeta.map(({ merchantId, label, icon: Icon }) => {
        const merchant = merchants.find((item) => item.id === merchantId);

        return (
          <button
            key={merchantId}
            type="button"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-white px-5 text-[15px] font-bold text-ink shadow-card transition hover:-translate-y-0.5 hover:border-sage/35 hover:bg-[#FAFBFC]"
            onClick={() => onSelectScenario(merchantId)}
            title={merchant ? merchant.expected : label}
          >
            <Icon size={18} strokeWidth={2.4} />
            {label}
          </button>
        );
      })}
      <button
        type="button"
        className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-5 text-[15px] font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-[#2B3440]"
        onClick={onReset}
      >
        <RotateCcw size={18} strokeWidth={2.4} />
        초기화
      </button>
    </div>
  );
}
