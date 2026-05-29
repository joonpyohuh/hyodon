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
    <div className="grid gap-3">
      {merchants.map((merchant) => {
        const Icon = iconByType[merchant.type];
        const selected = selectedMerchant?.id === merchant.id;

        return (
          <button
            key={merchant.id}
            type="button"
            className={`rounded-[24px] border bg-white p-4 text-left shadow-sm transition ${
              selected
                ? "border-sage ring-4 ring-sage/10"
                : "border-line hover:border-sage/30"
            }`}
            onClick={() => onSelect(merchant)}
          >
            <div className="flex items-start gap-3">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                  selected ? "bg-sage text-white" : "bg-soft text-sage"
                }`}
              >
                <Icon size={23} strokeWidth={2.2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-3">
                  <strong className="text-[19px] leading-tight text-ink">
                    {merchant.name}
                  </strong>
                  <span className="shrink-0 text-[17px] font-extrabold text-ink">
                    {formatWon(merchant.amount)}
                  </span>
                </span>
                <span className="mt-1 block text-[14px] font-semibold text-muted">
                  {merchant.expected}
                </span>
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
