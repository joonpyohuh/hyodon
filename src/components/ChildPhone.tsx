import { Bell, Shield, WalletCards } from "lucide-react";
import ApprovalCard from "./ApprovalCard";
import ReportCard from "./ReportCard";
import TransactionList from "./TransactionList";
import type { Activity, AppState } from "../types";
import { formatShortWon, formatTime, formatWon } from "../utils/format";

interface ChildPhoneProps {
  state: AppState;
  onApprove: () => void;
  onDecline: () => void;
  onAdjustThreshold: (delta: number) => void;
  onSetThreshold: (threshold: number) => void;
  onToggleFrozen: () => void;
}

const activityToneClass = {
  neutral: "bg-soft text-muted",
  success: "bg-sage/10 text-sage",
  warning: "bg-gold/10 text-gold",
  danger: "bg-rust/10 text-rust",
};

const MIN_THRESHOLD = 50000;
const MAX_THRESHOLD = 500000;
const STEP_THRESHOLD = 50000;

export default function ChildPhone({
  state,
  onApprove,
  onDecline,
  onAdjustThreshold,
  onSetThreshold,
  onToggleFrozen,
}: ChildPhoneProps) {
  return (
    <div className="min-h-full bg-[#F7F8FA] px-5 pb-8 pt-4">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[14px] font-bold text-muted">보호자 모드</p>
          <h3 className="mt-1 text-[25px] font-black leading-tight text-ink">
            이지현님
          </h3>
        </div>
        <span className="relative flex items-center gap-2 rounded-full bg-toss/10 px-3 py-2 text-toss">
          <span className="h-2 w-2 rounded-full bg-toss" />
          <span className="text-[13px] font-black">실시간 연동</span>
          <Bell size={17} strokeWidth={2.4} />
          {state.pendingApproval ? (
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-rust ring-2 ring-white" />
          ) : null}
        </span>
      </header>

      {state.pendingApproval ? (
        <section className="mt-5">
          <ApprovalCard
            approval={state.pendingApproval}
            onApprove={onApprove}
            onDecline={onDecline}
          />
        </section>
      ) : null}

      <section className="mt-5 rounded-[28px] bg-white p-5 shadow-[0_12px_30px_-18px_rgba(33,31,26,0.35)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[14px] font-bold text-muted">어머니 안심지갑</p>
            <p className="mt-2 text-[34px] font-black leading-none text-ink">
              {formatWon(state.balance)}
            </p>
          </div>
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              state.cardFrozen ? "bg-rust/10 text-rust" : "bg-sage/10 text-sage"
            }`}
          >
            <WalletCards size={25} strokeWidth={2.3} />
          </span>
        </div>
      </section>

      <section className="mt-4 rounded-[28px] bg-white p-5 shadow-[0_12px_30px_-18px_rgba(33,31,26,0.35)]">
        <div>
          <p className="text-[16px] font-black text-ink">승인 기준 금액</p>
          <p className="mt-1 text-[13px] font-bold leading-relaxed text-muted">
            이 금액 이상이면 자녀 확인이 필요해요
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <StepButton
            label="-"
            onClick={() => onAdjustThreshold(-STEP_THRESHOLD)}
            disabled={state.threshold <= MIN_THRESHOLD}
          />
          <div className="min-w-0 text-center">
            <p className="text-[28px] font-black leading-none text-ink">
              {formatWon(state.threshold)}
            </p>
            <p className="mt-1 text-[12px] font-black text-toss">
              {formatShortWon(state.threshold)} 기준
            </p>
          </div>
          <StepButton
            label="+"
            onClick={() => onAdjustThreshold(STEP_THRESHOLD)}
            disabled={state.threshold >= MAX_THRESHOLD}
          />
        </div>

        <input
          type="range"
          min={MIN_THRESHOLD}
          max={MAX_THRESHOLD}
          step={STEP_THRESHOLD}
          value={state.threshold}
          onChange={(event) => onSetThreshold(Number(event.target.value))}
          aria-label="승인 기준 금액"
          className="mt-4 w-full accent-[#3182F6]"
        />
        <div className="mt-1 flex justify-between text-[11px] font-bold text-muted">
          <span>5만원</span>
          <span>50만원</span>
        </div>
      </section>

      <section className="mt-4 flex items-center justify-between rounded-[28px] bg-white p-5 shadow-[0_12px_30px_-18px_rgba(33,31,26,0.35)]">
        <div>
          <p className="text-[16px] font-black text-ink">안심카드 일시정지</p>
          <p className="mt-1 text-[13px] font-bold text-muted">
            {state.cardFrozen ? "현재 결제가 막혀 있어요" : "위험할 때 바로 멈출 수 있어요"}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={state.cardFrozen}
          className={`relative h-8 w-14 shrink-0 rounded-full transition ${
            state.cardFrozen ? "bg-rust" : "bg-line"
          }`}
          onClick={onToggleFrozen}
        >
          <span
            className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${
              state.cardFrozen ? "left-7" : "left-1"
            }`}
          />
        </button>
      </section>

      {!state.pendingApproval ? (
        <section className="mt-4 rounded-[24px] border border-line bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sage/10 text-sage">
              <Shield size={22} strokeWidth={2.3} />
            </span>
            <div>
              <p className="text-[16px] font-black text-ink">
                필요한 결제만 알려드려요
              </p>
              <p className="mt-1 text-[13px] font-bold leading-relaxed text-muted">
                {formatShortWon(state.threshold)} 미만의 일상 결제는 조용히 통과합니다.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mt-5">
        <h4 className="mb-3 text-[18px] font-black text-ink">최근 활동</h4>
        <ActivityFeed activities={state.activities} />
      </section>

      <section className="mt-5">
        <h4 className="mb-3 text-[18px] font-black text-ink">거래내역</h4>
        <TransactionList
          transactions={state.transactions}
          compact
          emptyLabel="아직 확인할 거래가 없어요"
        />
      </section>

      <section className="mt-5">
        <ReportCard />
      </section>
    </div>
  );
}

function StepButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F2F4F6] text-[24px] font-black text-ink transition active:scale-[0.96] disabled:opacity-40"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

function ActivityFeed({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) {
    return (
      <div className="rounded-[22px] border border-dashed border-line bg-white/80 p-4 text-[14px] font-bold text-muted">
        고액 결제나 설정 변경이 있으면 여기에 보여요.
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {activities.slice(0, 4).map((activity) => (
        <div
          key={activity.id}
          className="flex items-center gap-3 rounded-[22px] bg-white p-3 shadow-sm"
        >
          <span
            className={`h-3 w-3 shrink-0 rounded-full ${activityToneClass[activity.tone]}`}
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-black text-ink">
              {activity.title}
            </p>
            <p className="truncate text-[13px] font-bold text-muted">
              {activity.description}
            </p>
          </div>
          <span className="shrink-0 text-[12px] font-bold text-muted">
            {formatTime(activity.ts)}
          </span>
        </div>
      ))}
    </div>
  );
}
