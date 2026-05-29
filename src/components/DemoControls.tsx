import { RotateCcw, ShieldAlert, ShoppingBag, Sprout } from "lucide-react";
import type { Merchant } from "../types";
import { formatWon } from "../utils/format";

interface DemoControlsProps {
  merchants: Merchant[];
  selectedMerchant: Merchant | null;
  onSelectScenario: (merchantId: string) => void;
  onReset: () => void;
}

const scenarioMeta = [
  {
    merchantId: "happy-mart",
    step: "시나리오 1",
    label: "소액 결제",
    desc: "행복마트 35,000원",
    chip: "즉시 통과",
    tone: "sage",
    icon: ShoppingBag,
  },
  {
    merchantId: "health-store",
    step: "시나리오 2",
    label: "고액 승인",
    desc: "건강식품 380,000원",
    chip: "자녀 승인",
    tone: "gold",
    icon: Sprout,
  },
  {
    merchantId: "atm-transfer",
    step: "시나리오 3",
    label: "이상거래 차단",
    desc: "ATM 2,000,000원",
    chip: "긴급 경고",
    tone: "rust",
    icon: ShieldAlert,
  },
];

const toneClass = {
  sage: {
    active: "border-sage bg-sage/10",
    icon: "bg-sage text-white",
    chip: "bg-sage/10 text-sage",
  },
  gold: {
    active: "border-gold bg-gold/10",
    icon: "bg-gold text-white",
    chip: "bg-gold/12 text-gold",
  },
  rust: {
    active: "border-rust bg-rust/10",
    icon: "bg-rust text-white",
    chip: "bg-rust/10 text-rust",
  },
};

export default function DemoControls({
  merchants,
  selectedMerchant,
  onSelectScenario,
  onReset,
}: DemoControlsProps) {
  return (
    <div className="mx-auto mt-4 max-w-4xl">
      <div className="mb-3 flex items-center gap-3">
        <span className="text-[12px] font-black uppercase tracking-[0.14em] text-muted">
          데모 시나리오 빠른 실행
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
        {scenarioMeta.map(({ merchantId, step, label, desc, chip, tone, icon: Icon }) => {
          const merchant = merchants.find((item) => item.id === merchantId);
          const active = selectedMerchant?.id === merchantId;
          const classes = toneClass[tone as keyof typeof toneClass];

          return (
            <button
              key={merchantId}
              type="button"
            className={`rounded-[20px] border-2 bg-white p-3 text-left shadow-sm transition active:scale-[0.98] ${
                active ? classes.active : "border-white hover:border-line"
              }`}
              onClick={() => onSelectScenario(merchantId)}
              title={merchant ? `${merchant.name} ${formatWon(merchant.amount)}` : label}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl ${
                    active ? classes.icon : "bg-soft text-ink"
                  }`}
                >
                  <Icon size={20} strokeWidth={2.4} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[12px] font-black text-muted">{step}</span>
                  <strong className="mt-0.5 block text-[15px] font-black text-ink">
                    {label}
                  </strong>
                  <span className="mt-0.5 block text-[12px] font-bold text-muted">
                    {desc}
                  </span>
                  <span
                    className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-black ${classes.chip}`}
                  >
                    {chip}
                  </span>
                </span>
              </div>
            </button>
          );
        })}

        <button
          type="button"
          className="flex min-h-[88px] items-center justify-center gap-2 rounded-[20px] bg-ink px-5 text-[15px] font-black text-white shadow-card transition active:scale-[0.98]"
          onClick={onReset}
        >
          <RotateCcw size={18} strokeWidth={2.5} />
          초기화
        </button>
      </div>
    </div>
  );
}
