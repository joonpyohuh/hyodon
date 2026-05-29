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
      <div className="min-h-full bg-[#FBFCFD] px-5 pt-16">
        <button
          type="button"
          className="mb-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-sm"
          onClick={onCancelConfirm}
          aria-label="뒤로 가기"
        >
          <ArrowLeft size={24} strokeWidth={2.4} />
        </button>

        <div className="rounded-[32px] bg-white p-6 shadow-card">
          <p className="text-[24px] font-extrabold leading-snug text-ink">
            {selectedMerchant.name}에서
          </p>
          <p className="mt-4 text-[42px] font-black leading-none text-ink">
            {formatWon(selectedMerchant.amount)}
          </p>
          <p className="mt-4 text-[26px] font-extrabold text-ink">
            맞으신가요?
          </p>
        </div>

        <div className="mt-6 grid gap-3">
          <button
            type="button"
            className="h-[64px] rounded-[22px] bg-sage text-[21px] font-extrabold text-white shadow-card transition hover:bg-[#43584C]"
            onClick={onConfirmPayment}
          >
            맞아요
          </button>
          <button
            type="button"
            className="h-[60px] rounded-[22px] bg-[#EEF1F3] text-[20px] font-extrabold text-ink transition hover:bg-line"
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
      <div className="flex min-h-full flex-col items-center justify-center bg-[#FBFCFD] px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 text-gold">
          <CreditCard size={38} strokeWidth={2.2} />
        </div>
        <h3 className="mt-8 text-[28px] font-black leading-tight text-ink">
          자녀 확인 중입니다.
        </h3>
        <p className="mt-3 text-[20px] font-bold text-muted">
          잠시만 기다려주세요.
        </p>
        <div className="mt-9 flex items-center justify-center gap-3">
          <span className="loading-dot h-3 w-3 rounded-full bg-gold" />
          <span className="loading-dot h-3 w-3 rounded-full bg-gold" />
          <span className="loading-dot h-3 w-3 rounded-full bg-gold" />
        </div>
      </div>
    );
  }

  if (seniorScreen === "done" && lastPayment) {
    return (
      <ResultScreen
        tone="success"
        icon={<CheckCircle2 size={44} strokeWidth={2.2} />}
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
        icon={<AlertCircle size={44} strokeWidth={2.2} />}
        title="거래가 처리되지 않았어요."
        amount={lastPayment.amount}
        description="다른 결제수단을 이용하시거나 잠시 후 다시 시도해주세요."
        onReturnHome={onReturnHome}
      />
    );
  }

  return (
    <div className="min-h-full bg-[#FBFCFD] px-5 pb-8 pt-14">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[19px] font-extrabold text-ink">김순자님</p>
          <h3 className="mt-2 text-[27px] font-black leading-tight text-ink">
            오늘도 안심하고
            <br />
            결제하세요
          </h3>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage/10 text-sage">
          <ShieldCheck size={27} strokeWidth={2.3} />
        </span>
      </header>

      <section className="mt-6 rounded-[32px] bg-white p-6 shadow-card">
        <p className="text-[17px] font-bold text-muted">안심지갑 잔액</p>
        <p className="mt-3 text-[42px] font-black leading-none text-ink">
          {formatWon(state.balance)}
        </p>
        <p className="mt-4 text-[15px] font-semibold text-sage">
          100,000원 이상은 가족 확인으로 더 안전하게
        </p>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-end justify-between">
          <h4 className="text-[19px] font-extrabold text-ink">어디서 결제할까요?</h4>
          <span className="text-[13px] font-bold text-muted">4개 시나리오</span>
        </div>
        <MerchantSelector
          merchants={merchants}
          selectedMerchant={state.selectedMerchant}
          onSelect={onSelectMerchant}
        />
      </section>

      <section className="mt-5 rounded-[26px] bg-white p-4 shadow-sm">
        <p className="text-[15px] font-bold text-muted">선택된 결제</p>
        <p className="mt-1 text-[20px] font-black text-ink">
          {selectedMerchant
            ? `${selectedMerchant.name} · ${formatWon(selectedMerchant.amount)}`
            : "가맹점을 선택해주세요"}
        </p>
      </section>

      <button
        type="button"
        className="mt-4 h-[66px] w-full rounded-[24px] bg-sage text-[22px] font-black text-white shadow-card transition enabled:hover:bg-[#43584C] disabled:cursor-not-allowed disabled:bg-[#CBD2D8]"
        disabled={!selectedMerchant}
        onClick={onStartPayment}
      >
        결제하기
      </button>

      <section className="mt-7">
        <h4 className="mb-3 text-[19px] font-extrabold text-ink">최근 사용 내역</h4>
        <TransactionList transactions={state.transactions} compact />
      </section>
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
    <div className="flex min-h-full flex-col justify-center bg-[#FBFCFD] px-6 text-center">
      <div
        className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full ${
          isSuccess ? "bg-sage/10 text-sage" : "bg-gold/12 text-gold"
        }`}
      >
        {icon}
      </div>
      <h3 className="mt-8 text-[29px] font-black leading-tight text-ink">{title}</h3>
      <p className="mt-5 text-[43px] font-black leading-none text-ink">
        {formatWon(amount)}
      </p>
      <p className="mx-auto mt-5 max-w-[280px] text-[18px] font-bold leading-relaxed text-muted">
        {description}
      </p>
      <button
        type="button"
        className={`mt-9 h-[64px] rounded-[24px] text-[21px] font-black text-white shadow-card transition ${
          isSuccess ? "bg-sage hover:bg-[#43584C]" : "bg-gold hover:bg-[#98723A]"
        }`}
        onClick={onReturnHome}
      >
        확인
      </button>
    </div>
  );
}
