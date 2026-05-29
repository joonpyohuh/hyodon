import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import type { Transaction } from "../types";
import { formatTime, formatWon } from "../utils/format";

interface TransactionListProps {
  transactions: Transaction[];
  compact?: boolean;
  emptyLabel?: string;
}

const statusMeta = {
  approved: {
    label: "승인 완료",
    icon: CheckCircle2,
    className: "text-sage bg-sage/10",
  },
  declined: {
    label: "처리 안 됨",
    icon: XCircle,
    className: "text-rust bg-rust/10",
  },
  pending: {
    label: "확인 중",
    icon: Clock3,
    className: "text-gold bg-gold/10",
  },
};

export default function TransactionList({
  transactions,
  compact = false,
  emptyLabel = "아직 사용 내역이 없어요",
}: TransactionListProps) {
  const visibleTransactions = transactions.slice(0, compact ? 3 : 5);

  return (
    <div className="grid gap-2">
      {visibleTransactions.length === 0 ? (
        <div className="rounded-[22px] border border-dashed border-line bg-white/75 p-4 text-[15px] font-bold text-muted">
          {emptyLabel}
        </div>
      ) : (
        visibleTransactions.map((transaction) => {
          const meta = statusMeta[transaction.status];
          const Icon = meta.icon;

          return (
            <div
              key={transaction.id}
              className="flex items-center gap-3 rounded-[22px] bg-white p-3 shadow-sm"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${meta.className}`}
              >
                <Icon size={20} strokeWidth={2.3} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[16px] font-black text-ink">
                  {transaction.merchant}
                </p>
                <p className="text-[13px] font-bold text-muted">
                  {meta.label} · {formatTime(transaction.ts)}
                </p>
              </div>
              <p
                className={`shrink-0 text-[15px] font-black ${
                  transaction.status === "declined" ? "text-muted line-through" : "text-ink"
                }`}
              >
                {formatWon(transaction.amount)}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}
