import { Bell, Pause, Play, Shield, WalletCards } from "lucide-react";
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
  onToggleFrozen: () => void;
}

const activityToneClass = {
  neutral: "bg-soft text-muted",
  success: "bg-sage/10 text-sage",
  warning: "bg-gold/10 text-gold",
  danger: "bg-rust/10 text-rust",
};

export default function ChildPhone({
  state,
  onApprove,
  onDecline,
  onAdjustThreshold,
  onToggleFrozen,
}: ChildPhoneProps) {
  return (
    <div className="min-h-full bg-[#F7F8FA] px-5 pb-8 pt-14">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[17px] font-extrabold text-ink">이지현님</p>
          <h3 className="mt-1 text-[25px] font-black leading-tight text-ink">
            어머니 안심지갑
          </h3>
        </div>
        <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-toss shadow-sm">
          <Bell size={24} strokeWidth={2.3} />
          {state.pendingApproval ? (
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rust" />
          ) : null}
        </span>
      </header>

      <section className="mt-6 rounded-[30px] bg-white p-5 shadow-card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[14px] font-bold text-muted">잔액</p>
            <p className="mt-1 text-[34px] font-black text-ink">
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

        <div className="mt-5 rounded-[22px] bg-soft p-4">
          <p className="text-[14px] font-bold text-muted">승인 기준 금액</p>
          <p className="mt-1 text-[18px] font-extrabold text-ink">
            {formatWon(state.threshold)} 이상은 확인이 필요해요
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              className="h-11 rounded-[16px] bg-white text-[15px] font-extrabold text-ink shadow-sm transition hover:bg-[#F2F4F6]"
              onClick={() => onAdjustThreshold(-50000)}
            >
              -5만원
            </button>
            <button
              type="button"
              className="h-11 rounded-[16px] bg-white text-[15px] font-extrabold text-ink shadow-sm transition hover:bg-[#F2F4F6]"
              onClick={() => onAdjustThreshold(50000)}
            >
              +5만원
            </button>
          </div>
        </div>

        <button
          type="button"
          className={`mt-4 flex h-[58px] w-full items-center justify-between rounded-[20px] px-4 text-left transition ${
            state.cardFrozen
              ? "bg-rust text-white"
              : "bg-[#EEF1F3] text-ink hover:bg-[#E5E8EB]"
          }`}
          onClick={onToggleFrozen}
        >
          <span>
            <span className="block text-[16px] font-extrabold">
              안심카드 일시정지
            </span>
            <span
              className={`block text-[12px] font-bold ${
                state.cardFrozen ? "text-white/82" : "text-muted"
              }`}
            >
              {state.cardFrozen ? "현재 결제가 막혀 있어요" : "위험할 때 바로 멈출 수 있어요"}
            </span>
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink">
            {state.cardFrozen ? (
              <Pause size={18} strokeWidth={2.5} />
            ) : (
              <Play size={18} strokeWidth={2.5} />
            )}
          </span>
        </button>
      </section>

      <section className="mt-5">
        {state.pendingApproval ? (
          <ApprovalCard
            approval={state.pendingApproval}
            onApprove={onApprove}
            onDecline={onDecline}
          />
        ) : (
          <div className="rounded-[28px] border border-line bg-white p-5 shadow-card">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage/10 text-sage">
                <Shield size={23} strokeWidth={2.3} />
              </span>
              <div>
                <p className="text-[18px] font-extrabold text-ink">
                  필요한 결제만 알려드려요
                </p>
                <p className="mt-1 text-[14px] font-semibold leading-relaxed text-muted">
                  {formatShortWon(state.threshold)} 미만의 일상 결제는 조용히 통과합니다.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="mt-6">
        <h4 className="mb-3 text-[18px] font-extrabold text-ink">최근 활동</h4>
        <ActivityFeed activities={state.activities} />
      </section>

      <section className="mt-6">
        <h4 className="mb-3 text-[18px] font-extrabold text-ink">거래내역</h4>
        <TransactionList
          transactions={state.transactions}
          compact
          emptyLabel="아직 확인할 거래가 없어요"
        />
      </section>

      <section className="mt-6">
        <ReportCard />
      </section>
    </div>
  );
}

function ActivityFeed({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) {
    return (
      <div className="rounded-[22px] border border-dashed border-line bg-white/80 p-4 text-[14px] font-semibold text-muted">
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
            <p className="truncate text-[15px] font-extrabold text-ink">
              {activity.title}
            </p>
            <p className="truncate text-[13px] font-semibold text-muted">
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
