import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import MerchantSelector from "./MerchantSelector";
import TransactionList from "./TransactionList";
import type { AppState, Merchant } from "../types";
import { formatWon } from "../utils/format";

interface SeniorPhoneProps {
  state: AppState;
  merchants: Merchant[];
  onSelectMerchant: (merchant: Merchant) => void;
  onStartPayment: () => void;
  onConfirmPayment: () => void;
  onCancelConfirm: () => void;
  onReturnHome: () => void;
}

export default function SeniorPhone({
  state,
  merchants,
  onSelectMerchant,
  onStartPayment,
  onConfirmPayment,
  onCancelConfirm,
  onReturnHome,
}: SeniorPhoneProps) {
  const { selectedMerchant, seniorScreen, lastPayment } = state;

  if (seniorScreen === "confirm" && selectedMerchant) {
    return (
      <div className="flex min-h-full flex-col bg-paper px-5 pb-7 pt-5 animate-rise">
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-sm"
          onClick={onCancelConfirm}
          aria-label="뒤로 가기"
        >
          <ArrowLeft size={24} strokeWidth={2.4} />
        </button>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-[30px] bg-white text-sage shadow-[0_12px_30px_-14px_rgba(33,31,26,0.4)]">
            <CreditCard size={48} strokeWidth={2.1} />
          </div>
          <p className="mt-8 text-[23px] font-bold text-muted">
            {selectedMerchant.name}에서
          </p>
          <p className="mt-2 text-[46px] font-black leading-none text-ink">
            {formatWon(selectedMerchant.amount)}
          </p>
          <p className="mt-6 text-[27px] font-black text-ink">맞으신가요?</p>
        </div>

        <div className="grid gap-3">
          <button
            type="button"
            className="h-[66px] rounded-[22px] bg-sage text-[22px] font-black text-white shadow-[0_14px_28px_-12px_rgba(81,104,90,0.6)] transition active:scale-[0.98]"
            onClick={onConfirmPayment}
          >
            맞아요
          </button>
          <button
            type="button"
            className="h-[60px] rounded-[22px] bg-[#F2EDE2] text-[20px] font-black text-muted transition active:scale-[0.98]"
            onClick={onCancelConfirm}
          >
            취소
          </button>
        </div>
      </div>
    );
  }

  if (seniorScreen === "waiting") {
    return (
      <div className="flex min-h-full flex-col items-center justify-center bg-paper px-6 pb-8 text-center animate-rise">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <span className="absolute h-full w-full animate-pulse-ring rounded-full bg-gold/15" />
          <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gold/15 text-gold">
            <CreditCard size={44} strokeWidth={2.1} />
          </span>
        </div>
        <h3 className="mt-10 text-[28px] font-black leading-tight text-ink">
          자녀 확인 중입니다.
        </h3>
        <p className="mt-3 text-[20px] font-bold text-muted">
          잠시만 기다려주세요.
        </p>
        {state.pendingApproval ? (
          <div className="mt-8 w-full rounded-[22px] bg-white px-5 py-4 text-left shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[15px] font-bold text-muted">
                {state.pendingApproval.merchant}
              </span>
              <span className="text-[18px] font-black text-ink">
                {formatWon(state.pendingApproval.amount)}
              </span>
            </div>
          </div>
        ) : null}
        <div className="mt-8 flex items-center gap-2 text-[14px] font-bold text-gold">
          <span className="loading-dot h-2.5 w-2.5 rounded-full bg-gold" />
          <span className="loading-dot h-2.5 w-2.5 rounded-full bg-gold" />
          <span className="loading-dot h-2.5 w-2.5 rounded-full bg-gold" />
          <span className="ml-1">확인 요청을 보냈어요</span>
        </div>
      </div>
    );
  }

  if (seniorScreen === "done" && lastPayment) {
    return (
      <ResultScreen
        tone="success"
        icon={<CheckCircle2 size={48} strokeWidth={2.2} />}
        title="결제가 완료되었습니다."
        amount={lastPayment.amount}
        description={`${lastPayment.merchant} 결제가 안전하게 처리되었어요.`}
        onReturnHome={onReturnHome}
      />
    );
  }

  if (seniorScreen === "declined" && lastPayment) {
    return (
      <ResultScreen
        tone="warning"
        icon={<AlertCircle size={48} strokeWidth={2.2} />}
        title="거래가 처리되지 않았어요."
        amount={lastPayment.amount}
        description="다른 결제수단을 이용하시거나 잠시 후 다시 시도해주세요."
        onReturnHome={onReturnHome}
      />
    );
  }

  return (
    <div className="min-h-full bg-paper px-5 pb-2 pt-4">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[17px] font-bold text-muted">안녕하세요</p>
          <h3 className="mt-1 text-[27px] font-black leading-tight text-ink">
            김순자님
          </h3>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage/12 text-sage">
          <ShieldCheck size={27} strokeWidth={2.3} />
        </span>
      </header>

      <section className="mt-4 rounded-[28px] bg-sage px-5 py-5 text-white shadow-[0_18px_36px_-16px_rgba(81,104,90,0.65)]">
        <p className="text-[16px] font-bold text-white/75">안심지갑 잔액</p>
        <p className="mt-2 text-[38px] font-black leading-none">
          {formatWon(state.balance)}
        </p>
        <div className="mt-3 inline-flex rounded-full bg-white/15 px-3 py-1.5 text-[13px] font-black text-white/90">
          {state.cardFrozen
            ? "카드가 일시정지되어 있어요"
            : `${formatWon(state.threshold)} 이상은 가족이 함께 확인`}
        </div>
      </section>

      <section className="mt-4">
        <div className="mb-3 flex items-end justify-between">
          <h4 className="text-[20px] font-black text-ink">어디서 결제할까요?</h4>
          <span className="text-[13px] font-black text-muted">4개 시나리오</span>
        </div>
        <MerchantSelector
          merchants={merchants}
          selectedMerchant={state.selectedMerchant}
          onSelect={onSelectMerchant}
        />
      </section>

      <section className="mt-5">
        <h4 className="mb-3 text-[18px] font-black text-ink">최근 사용 내역</h4>
        <TransactionList transactions={state.transactions} compact />
      </section>

      <div className="sticky bottom-0 -mx-5 mt-5 bg-gradient-to-t from-paper via-paper to-paper/20 px-5 pb-4 pt-6">
        <div className="mb-3 rounded-[20px] bg-white/90 px-4 py-3 shadow-sm">
          <p className="text-[13px] font-black text-muted">선택된 결제</p>
          <p className="mt-0.5 text-[18px] font-black text-ink">
            {selectedMerchant
              ? `${selectedMerchant.name} · ${formatWon(selectedMerchant.amount)}`
              : "가맹점을 선택해주세요"}
          </p>
        </div>
        <button
          type="button"
          className="h-[66px] w-full rounded-[24px] bg-ink text-[22px] font-black text-white shadow-[0_14px_28px_-12px_rgba(33,31,26,0.6)] transition enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#D5D0C4] disabled:text-white"
          disabled={!selectedMerchant}
          onClick={onStartPayment}
        >
          {selectedMerchant
            ? `${formatWon(selectedMerchant.amount)} 결제하기`
            : "결제할 곳을 골라주세요"}
        </button>
      </div>
    </div>
  );
}

interface ResultScreenProps {
  tone: "success" | "warning";
  icon: React.ReactNode;
  title: string;
  amount: number;
  description: string;
  onReturnHome: () => void;
}

function ResultScreen({
  tone,
  icon,
  title,
  amount,
  description,
  onReturnHome,
}: ResultScreenProps) {
  const isSuccess = tone === "success";

  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-paper px-6 pb-8 text-center animate-rise">
      <div
        className={`flex h-28 w-28 animate-pop items-center justify-center rounded-full ${
          isSuccess ? "bg-sage/12 text-sage" : "bg-[#F2EDE2] text-gold"
        }`}
      >
        {icon}
      </div>
      <h3 className="mt-9 text-[29px] font-black leading-tight text-ink">{title}</h3>
      <p className="mt-5 text-[43px] font-black leading-none text-ink">
        {formatWon(amount)}
      </p>
      <p className="mx-auto mt-5 max-w-[280px] text-[18px] font-bold leading-relaxed text-muted">
        {description}
      </p>
      <button
        type="button"
        className="mt-10 h-[64px] w-full rounded-[24px] bg-ink text-[21px] font-black text-white shadow-[0_14px_28px_-12px_rgba(33,31,26,0.6)] transition active:scale-[0.98]"
        onClick={onReturnHome}
      >
        확인
      </button>
    </div>
  );
}
