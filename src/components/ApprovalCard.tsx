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
      className={`rounded-[28px] border p-5 shadow-card transition ${
        isAnomaly
          ? "border-rust/30 bg-[#FFF6F2]"
          : "border-toss/15 bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
            isAnomaly ? "bg-rust text-white" : "bg-toss text-white"
          }`}
        >
          {isAnomaly ? (
            <AlertTriangle size={23} strokeWidth={2.3} />
          ) : (
            <Check size={23} strokeWidth={2.5} />
          )}
        </span>
        <div>
          <p
            className={`text-[18px] font-extrabold ${
              isAnomaly ? "text-rust" : "text-ink"
            }`}
          >
            {isAnomaly ? "⚠ 이상거래 의심" : "승인이 필요해요"}
          </p>
          <p className="mt-2 text-[15px] font-semibold leading-relaxed text-ink">
            {isAnomaly
              ? approval.type === "ATM_이체"
                ? "어머니가 ATM에서 2,000,000원 송금을 시도합니다."
                : `어머니가 ${approval.merchant}에서 ${formatWon(
                    approval.amount,
                  )} 결제를 요청했습니다.`
              : `어머니가 ${approval.merchant}에서 ${formatWon(
                  approval.amount,
                )} 결제를 요청했습니다.`}
          </p>
          {isAnomaly ? (
            <>
              <p className="mt-2 text-[15px] font-extrabold text-rust">
                ATM 고액 송금이 감지되었습니다.
              </p>
              <p className="mt-1 text-[14px] font-semibold leading-relaxed text-muted">
                보이스피싱 가능성이 있어요. 확인 후 결정해주세요.
              </p>
            </>
          ) : null}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          className={`flex h-13 min-h-[52px] items-center justify-center gap-2 rounded-[18px] text-[16px] font-extrabold transition ${
            isAnomaly
              ? "bg-white text-rust ring-1 ring-rust/25 hover:bg-rust/5"
              : "bg-toss text-white hover:bg-[#1B6FE0]"
          }`}
          onClick={onApprove}
        >
          <Check size={19} strokeWidth={2.5} />
          승인
        </button>
        <button
          type="button"
          className={`flex h-13 min-h-[52px] items-center justify-center gap-2 rounded-[18px] text-[16px] font-extrabold transition ${
            isAnomaly
              ? "bg-rust text-white hover:bg-[#8D4230]"
              : "bg-[#F2F4F6] text-ink hover:bg-[#E5E8EB]"
          }`}
          onClick={onDecline}
        >
          <X size={19} strokeWidth={2.5} />
          거절
        </button>
      </div>
    </section>
  );
}
