import { AlertTriangle, Check, X } from "lucide-react";
import type { PendingApproval } from "../types";
import { formatWon } from "../utils/format";

interface ApprovalCardProps {
  approval: PendingApproval;
  onApprove: () => void;
  onDecline: () => void;
}

export default function ApprovalCard({
  approval,
  onApprove,
  onDecline,
}: ApprovalCardProps) {
  const isAnomaly = approval.isAnomaly;

  return (
    <section
      className={`animate-slide-up overflow-hidden rounded-[28px] border-2 shadow-[0_22px_48px_-20px_rgba(33,31,26,0.35)] ${
        isAnomaly ? "border-rust bg-[#FFF4EF]" : "border-toss bg-[#F8FBFF]"
      }`}
    >
      <div
        className={`flex items-center gap-2 px-5 py-3 text-[14px] font-black text-white ${
          isAnomaly ? "bg-rust" : "bg-toss"
        }`}
      >
        {isAnomaly ? (
          <>
            <AlertTriangle size={18} strokeWidth={2.5} />
            ⚠ 이상거래 의심
          </>
        ) : (
          <>
            <Check size={18} strokeWidth={2.5} />
            승인이 필요해요
          </>
        )}
      </div>

      <div className="p-5">
        <p
          className={`text-[15px] font-bold leading-relaxed ${
            isAnomaly ? "text-rust" : "text-toss"
          }`}
        >
          {isAnomaly
            ? "어머니가 ATM에서 2,000,000원 송금을 시도합니다."
            : `어머니가 ${approval.merchant}에서 ${formatWon(
                approval.amount,
              )} 결제를 요청했습니다.`}
        </p>
        <p className="mt-2 text-[36px] font-black leading-none text-ink">
          {formatWon(approval.amount)}
        </p>
        <p className="mt-2 text-[14px] font-bold text-muted">
          {approval.merchant} · {approval.type}
        </p>

        {isAnomaly ? (
          <div className="mt-4 rounded-[18px] bg-white/75 px-4 py-3 text-[14px] font-bold leading-relaxed text-rust">
            ATM 고액 송금이 감지되었습니다.
            <br />
            보이스피싱 가능성이 있어요. 확인 후 결정해주세요.
          </div>
        ) : null}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            className={`flex min-h-[54px] items-center justify-center gap-2 rounded-[18px] text-[16px] font-black transition active:scale-[0.98] ${
              isAnomaly
                ? "bg-white text-rust ring-1 ring-rust/25"
                : "bg-toss text-white"
            }`}
            onClick={onApprove}
          >
            <Check size={19} strokeWidth={2.6} />
            승인
          </button>
          <button
            type="button"
            className={`flex min-h-[54px] items-center justify-center gap-2 rounded-[18px] text-[16px] font-black transition active:scale-[0.98] ${
              isAnomaly ? "bg-rust text-white" : "bg-white text-ink"
            }`}
            onClick={onDecline}
          >
            <X size={19} strokeWidth={2.6} />
            거절
          </button>
        </div>
      </div>
    </section>
  );
}
