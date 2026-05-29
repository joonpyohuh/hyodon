import { useMemo, useState } from "react";
import ChildPhone from "./components/ChildPhone";
import DemoControls from "./components/DemoControls";
import PhoneFrame from "./components/PhoneFrame";
import SeniorPhone from "./components/SeniorPhone";
import type {
  Activity,
  AppState,
  Merchant,
  PendingApproval,
  Transaction,
} from "./types";
import { formatWon } from "./utils/format";
import { speakKorean } from "./utils/speech";

const INITIAL_BALANCE = 600000;
const INITIAL_THRESHOLD = 100000;

const merchants: Merchant[] = [
  {
    id: "happy-mart",
    name: "행복마트",
    amount: 35000,
    type: "grocery",
    category: "장보기",
    expected: "즉시 통과",
  },
  {
    id: "pharmacy",
    name: "우리약국",
    amount: 12000,
    type: "medical",
    category: "의료",
    expected: "즉시 통과",
  },
  {
    id: "health-store",
    name: "○○건강식품",
    amount: 380000,
    type: "retail",
    category: "건강식품",
    expected: "자녀 승인 요청",
  },
  {
    id: "atm-transfer",
    name: "ATM 계좌이체",
    amount: 2000000,
    type: "ATM_이체",
    category: "송금",
    expected: "이상거래 경고",
  },
];

const createInitialState = (): AppState => ({
  threshold: INITIAL_THRESHOLD,
  balance: INITIAL_BALANCE,
  cardFrozen: false,
  selectedMerchant: merchants[0],
  pendingApproval: null,
  transactions: [],
  activities: [],
  seniorScreen: "home",
  lastPayment: null,
});

const createId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random()}`;

const isAnomaly = (merchant: Pick<Merchant, "amount" | "type">) =>
  merchant.amount >= 1000000 || merchant.type === "ATM_이체";

function App() {
  const [state, setState] = useState<AppState>(() => createInitialState());

  const heroStats = useMemo(
    () => [
      { label: "기본 승인 기준", value: formatWon(state.threshold) },
      { label: "안심지갑 잔액", value: formatWon(state.balance) },
      { label: "연결 상태", value: state.pendingApproval ? "확인 중" : "실시간 연결" },
    ],
    [state.balance, state.pendingApproval, state.threshold],
  );

  const addActivity = (
    activity: Omit<Activity, "id" | "ts">,
    at: number = Date.now(),
  ): Activity => ({
    ...activity,
    id: createId("activity"),
    ts: at,
  });

  const addTransaction = (
    transaction: Omit<Transaction, "id" | "ts">,
    at: number = Date.now(),
  ): Transaction => ({
    ...transaction,
    id: createId("transaction"),
    ts: at,
  });

  const selectMerchant = (merchant: Merchant) => {
    setState((current) => ({
      ...current,
      selectedMerchant: merchant,
      pendingApproval: null,
      seniorScreen: "home",
      lastPayment: null,
    }));
  };

  const selectScenario = (merchantId: string) => {
    const merchant = merchants.find((item) => item.id === merchantId);

    if (!merchant) return;
    selectMerchant(merchant);
  };

  const startPayment = () => {
    setState((current) => {
      if (!current.selectedMerchant) return current;

      return {
        ...current,
        pendingApproval: null,
        seniorScreen: "confirm",
        lastPayment: null,
      };
    });
  };

  const confirmPayment = () => {
    let speechMessage: string | null = null;

    setState((current) => {
      const merchant = current.selectedMerchant;
      const now = Date.now();

      if (!merchant) return current;

      if (current.cardFrozen) {
        const transaction = addTransaction(
          {
            merchant: merchant.name,
            amount: merchant.amount,
            type: merchant.type,
            status: "declined",
            isAnomaly: isAnomaly(merchant),
          },
          now,
        );
        const activity = addActivity(
          {
            title: "카드 일시정지로 처리 안 됨",
            description: `${merchant.name} · ${formatWon(merchant.amount)}`,
            tone: "warning",
          },
          now,
        );

        speechMessage = "거래가 처리되지 않았어요.";

        return {
          ...current,
          seniorScreen: "declined",
          pendingApproval: null,
          transactions: [transaction, ...current.transactions],
          activities: [activity, ...current.activities],
          lastPayment: {
            merchant: merchant.name,
            amount: merchant.amount,
            status: "declined",
            isAnomaly: transaction.isAnomaly,
          },
        };
      }

      if (merchant.amount < current.threshold) {
        const transaction = addTransaction(
          {
            merchant: merchant.name,
            amount: merchant.amount,
            type: merchant.type,
            status: "approved",
            isAnomaly: false,
          },
          now,
        );

        speechMessage = `결제가 완료되었습니다. ${formatWon(merchant.amount)}`;

        return {
          ...current,
          balance: Math.max(0, current.balance - merchant.amount),
          seniorScreen: "done",
          pendingApproval: null,
          transactions: [transaction, ...current.transactions],
          lastPayment: {
            merchant: merchant.name,
            amount: merchant.amount,
            status: "approved",
            isAnomaly: false,
          },
        };
      }

      const pendingApproval: PendingApproval = {
        merchant: merchant.name,
        amount: merchant.amount,
        type: merchant.type,
        isAnomaly: isAnomaly(merchant),
        ts: now,
      };
      const activity = addActivity(
        {
          title: pendingApproval.isAnomaly ? "이상거래 확인 필요" : "고액 결제 확인 필요",
          description: `${merchant.name} · ${formatWon(merchant.amount)}`,
          tone: pendingApproval.isAnomaly ? "danger" : "warning",
        },
        now,
      );

      return {
        ...current,
        pendingApproval,
        activities: [activity, ...current.activities],
        seniorScreen: "waiting",
      };
    });

    if (speechMessage) {
      speakKorean(speechMessage);
    }
  };

  const cancelConfirm = () => {
    setState((current) => ({
      ...current,
      seniorScreen: "home",
    }));
  };

  const approvePending = () => {
    let speechMessage: string | null = null;

    setState((current) => {
      if (!current.pendingApproval) return current;

      const approval = current.pendingApproval;
      const now = Date.now();
      const transaction = addTransaction(
        {
          merchant: approval.merchant,
          amount: approval.amount,
          type: approval.type,
          status: "approved",
          isAnomaly: approval.isAnomaly,
        },
        now,
      );
      const activity = addActivity(
        {
          title: "승인 완료",
          description: `${approval.merchant} · ${formatWon(approval.amount)}`,
          tone: "success",
        },
        now,
      );

      speechMessage = `결제가 완료되었습니다. ${formatWon(approval.amount)}`;

      return {
        ...current,
        balance: Math.max(0, current.balance - approval.amount),
        pendingApproval: null,
        seniorScreen: "done",
        transactions: [transaction, ...current.transactions],
        activities: [activity, ...current.activities],
        lastPayment: {
          merchant: approval.merchant,
          amount: approval.amount,
          status: "approved",
          isAnomaly: approval.isAnomaly,
        },
      };
    });

    if (speechMessage) {
      speakKorean(speechMessage);
    }
  };

  const declinePending = () => {
    let speechMessage: string | null = null;

    setState((current) => {
      if (!current.pendingApproval) return current;

      const approval = current.pendingApproval;
      const now = Date.now();
      const transaction = addTransaction(
        {
          merchant: approval.merchant,
          amount: approval.amount,
          type: approval.type,
          status: "declined",
          isAnomaly: approval.isAnomaly,
        },
        now,
      );
      const activity = addActivity(
        {
          title: approval.isAnomaly ? "이상거래 처리 안 됨" : "고액 결제 처리 안 됨",
          description: `${approval.merchant} · ${formatWon(approval.amount)}`,
          tone: approval.isAnomaly ? "danger" : "neutral",
        },
        now,
      );

      speechMessage = "거래가 처리되지 않았어요.";

      return {
        ...current,
        pendingApproval: null,
        seniorScreen: "declined",
        transactions: [transaction, ...current.transactions],
        activities: [activity, ...current.activities],
        lastPayment: {
          merchant: approval.merchant,
          amount: approval.amount,
          status: "declined",
          isAnomaly: approval.isAnomaly,
        },
      };
    });

    if (speechMessage) {
      speakKorean(speechMessage);
    }
  };

  const adjustThreshold = (delta: number) => {
    setState((current) => {
      const threshold = Math.min(500000, Math.max(50000, current.threshold + delta));
      const activity = addActivity({
        title: "기준 금액 변경",
        description: `${formatWon(threshold)} 이상 확인`,
        tone: "neutral",
      });

      return {
        ...current,
        threshold,
        activities: [activity, ...current.activities],
      };
    });
  };

  const toggleFrozen = () => {
    setState((current) => {
      const nextFrozen = !current.cardFrozen;
      const activity = addActivity({
        title: nextFrozen ? "카드 일시정지" : "카드 다시 사용",
        description: nextFrozen ? "모든 결제가 잠시 멈췄어요" : "결제를 다시 받을 수 있어요",
        tone: nextFrozen ? "warning" : "success",
      });

      return {
        ...current,
        cardFrozen: nextFrozen,
        activities: [activity, ...current.activities],
      };
    });
  };

  const returnHome = () => {
    setState((current) => ({
      ...current,
      seniorScreen: "home",
      lastPayment: null,
    }));
  };

  const resetDemo = () => {
    setState(createInitialState());
  };

  return (
    <main className="min-h-screen px-5 py-6 sm:px-8 lg:px-10">
      <section className="mx-auto max-w-6xl text-center">
        <p className="text-[15px] font-extrabold text-sage">효돈 Hyo-Don</p>
        <h1 className="mt-2 text-[40px] font-black leading-tight text-ink sm:text-[48px]">
          소액은 자유롭게, 고액만 자녀가.
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-[18px] font-semibold leading-relaxed text-muted sm:text-[19px]">
          시니어의 일상은 지키고, 고액 사기는 가족이 막는 차등 승인 결제 서비스
        </p>

        <div className="mx-auto mt-5 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[22px] border border-white/80 bg-white/82 px-4 py-3 shadow-sm backdrop-blur"
            >
              <p className="text-[13px] font-bold text-muted">{stat.label}</p>
              <p className="mt-1 text-[18px] font-black text-ink">{stat.value}</p>
            </div>
          ))}
        </div>

        <DemoControls
          merchants={merchants}
          onSelectScenario={selectScenario}
          onReset={resetDemo}
        />
      </section>

      <section className="mx-auto mt-7 flex max-w-6xl flex-col items-center justify-center gap-8 lg:flex-row lg:items-start">
        <PhoneFrame title="시니어 앱" subtitle="김순자님 · 72세">
          <SeniorPhone
            state={state}
            merchants={merchants}
            onSelectMerchant={selectMerchant}
            onStartPayment={startPayment}
            onConfirmPayment={confirmPayment}
            onCancelConfirm={cancelConfirm}
            onReturnHome={returnHome}
          />
        </PhoneFrame>

        <div className="hidden min-h-[660px] w-[70px] flex-col items-center justify-center lg:flex">
          <div className="h-2 w-2 rounded-full bg-sage" />
          <div className="my-3 h-32 w-px bg-sage/25" />
          <div
            className={`rounded-full px-3 py-2 text-center text-[12px] font-black ${
              state.pendingApproval
                ? "bg-gold/12 text-gold"
                : "bg-sage/10 text-sage"
            }`}
          >
            {state.pendingApproval ? "승인 요청" : "실시간 연결"}
          </div>
          <div className="my-3 h-32 w-px bg-sage/25" />
          <div className="h-2 w-2 rounded-full bg-sage" />
        </div>

        <PhoneFrame title="자녀 앱" subtitle="이지현님 · 42세">
          <ChildPhone
            state={state}
            onApprove={approvePending}
            onDecline={declinePending}
            onAdjustThreshold={adjustThreshold}
            onToggleFrozen={toggleFrozen}
          />
        </PhoneFrame>
      </section>
    </main>
  );
}

export default App;
