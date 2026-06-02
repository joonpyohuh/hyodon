import { Building2, Landmark, Pill, ShoppingCart } from "lucide-react";
import type { Merchant } from "../types";
import { formatWon } from "../utils/format";

interface MerchantSelectorProps {
  merchants: Merchant[];
  selectedMerchant: Merchant | null;
  onSelect: (merchant: Merchant) => void;
}

const iconByType = {
  grocery: ShoppingCart,
  medical: Pill,
  retail: Building2,
  ATM_이체: Landmark,
};

export default function MerchantSelector({
  merchants,
  selectedMerchant,
  onSelect,
}: MerchantSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {merchants.map((merchant) => {
        const Icon = iconByType[merchant.type];
        const selected = selectedMerchant?.id === merchant.id;

        return (
          <button
            key={merchant.id}
            type="button"
            className={`min-h-[104px] rounded-[22px] border-2 bg-white p-3 text-left shadow-sm transition active:scale-[0.98] ${
              selected
                ? "border-toss bg-[#F8FBFF] shadow-[0_16px_32px_-20px_rgba(49,130,246,0.55)]"
                : "border-line hover:border-toss/35 hover:shadow-card"
            }`}
            onClick={() => onSelect(merchant)}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-2xl ${
                selected ? "bg-toss text-white" : "bg-[#E8F3FF] text-toss"
              }`}
            >
                <Icon size={20} strokeWidth={2.3} />
              </span>
            <strong className="mt-2 block text-[16px] leading-tight text-ink">
              {merchant.name}
            </strong>
            <span className="mt-1 block text-[14px] font-black text-ink">
              {formatWon(merchant.amount)}
            </span>
            <span className="mt-1 block text-[12px] font-bold leading-snug text-muted">
              {merchant.expected}
            </span>
          </button>
        );
      })}
    </div>
  );
}
