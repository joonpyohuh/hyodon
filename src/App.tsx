import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BellRing,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MessageCircle,
  Pause,
  Phone,
  Play,
  Radar,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

type DemoStep = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const steps: Array<{
  id: DemoStep;
  eyebrow: string;
  title: string;
  meaning: string;
}> = [
  {
    id: 0,
    eyebrow: "00 Everyday autonomy",
    title: "소액 결제는 그대로 지나갑니다",
    meaning: "효돈은 부모님의 일상을 불필요하게 확인하지 않습니다.",
  },
  {
    id: 1,
    eyebrow: "01 Transfer attempt",
    title: "부모님이 송금을 누르기 직전",
    meaning: "사기는 평범한 송금 화면에서 시작됩니다.",
  },
  {
    id: 2,
    eyebrow: "02 Hyodon detection",
    title: "효돈이 평소와 다름을 감지",
    meaning: "은행 앱은 송금만 처리하지만, 효돈은 맥락을 봅니다.",
  },
  {
    id: 3,
    eyebrow: "03 Family alert",
    title: "가족에게 즉시 연결",
    meaning: "부모님의 모든 결제가 아니라, 위험한 순간만 알려줍니다.",
  },
  {
    id: 4,
    eyebrow: "04 Conversation",
    title: "가족이 함께 확인",
    meaning: "통제가 아니라 대화로 위험을 멈춥니다.",
  },
  {
    id: 5,
    eyebrow: "05 Resolution",
    title: "거절이 아닌 보류",
    meaning: "자존감을 해치지 않는 언어로 피해를 막습니다.",
  },
  {
    id: 6,
    eyebrow: "06 Result",
    title: "일상은 그대로, 위험만 멈춤",
    meaning: "작은 결제는 자유롭게 지나가고, 의심 송금은 가족과 확인합니다.",
  },
];

const riskSignals = [
  "처음 송금하는 계좌",
  "평소보다 18배 큰 금액",
  "투자 관련 키워드 감지",
];

const amount = "5,300,000원";
const recipient = "김민수 대리 (투자지원센터)";

function App() {
  const [step, setStep] = useState<DemoStep>(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [endingLine, setEndingLine] = useState<0 | 1>(0);

  const activeStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  useEffect(() => {
    if (!autoPlay) return undefined;

    const timer = window.setTimeout(() => {
      setStep((current) => (current === 6 ? 0 : ((current + 1) as DemoStep)));
    }, step === 6 ? 4200 : 3900);

    return () => window.clearTimeout(timer);
  }, [autoPlay, step]);

  useEffect(() => {
    if (step !== 6) {
      setEndingLine(0);
      return undefined;
    }

    const timer = window.setTimeout(() => setEndingLine(1), 1700);
    return () => window.clearTimeout(timer);
  }, [step]);

  const nextStep = () => setStep((current) => (current === 6 ? 6 : ((current + 1) as DemoStep)));
  const prevStep = () => setStep((current) => (current === 0 ? 0 : ((current - 1) as DemoStep)));
  const reset = () => {
    setAutoPlay(false);
    setStep(0);
  };

  const storyCopy = useMemo(() => {
    if (step === 0) return "행복마트 35,000원. 가족에게 알림 없이 바로 승인됩니다.";
    if (step === 1) return "기존 은행 앱이라면 여기서 송금은 그대로 진행됩니다.";
    if (step === 2) return "효돈은 금액, 수취인, 문맥을 함께 보고 위험도를 계산합니다.";
    if (step === 3) return "부모님의 일상 결제는 조용히 지나가고, 위험한 송금만 가족에게 도착합니다.";
    if (step === 4) return "가족은 버튼 하나로 전화하고, 대화의 핵심만 확인합니다.";
    if (step === 5) return "부모님 화면에는 ‘거절’이 아니라 ‘잠시 보류’로 표시됩니다.";
    return "효돈은 모든 결제를 확인하지 않습니다. 필요한 순간에만 멈춥니다.";
  }, [step]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F9FC] text-ink">
      <section className="relative min-h-screen px-5 py-5 sm:px-8 lg:px-10">
        <div className="premium-grid absolute inset-0" />
        <div className="blue-halo absolute left-1/2 top-[-24rem] h-[48rem] w-[48rem] -translate-x-1/2 rounded-full" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-40px)] max-w-7xl flex-col">
          <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/hyodon-logo.png"
                alt="효돈 로고"
                className="h-12 w-12 rounded-[18px] object-cover shadow-[0_16px_34px_-18px_rgba(49,130,246,0.85)] ring-1 ring-white"
              />
              <div>
                <p className="text-[18px] font-black leading-tight">효돈 Hyo-Don</p>
                <p className="text-[12px] font-bold text-muted">소액은 자유롭게, 위험한 고액만 가족이</p>
              </div>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              {steps.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStep(item.id)}
                  className={`h-2.5 rounded-full transition-all ${
                    item.id === step ? "w-9 bg-[#3182F6]" : "w-2.5 bg-[#D6E4F8]"
                  }`}
                  aria-label={`${item.id + 1}번 장면으로 이동`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setAutoPlay((current) => !current)}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-black text-ink shadow-sm ring-1 ring-line transition hover:-translate-y-0.5"
            >
              {autoPlay ? <Pause size={16} /> : <Play size={16} />}
              {autoPlay ? "일시정지" : "30초 시연"}
            </button>
          </header>

          <section className="grid flex-1 items-center gap-8 py-6 lg:grid-cols-[0.92fr_1.55fr] lg:py-8">
            <aside className="order-2 lg:order-1">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12px] font-black text-[#3182F6] shadow-sm ring-1 ring-[#D6E4F8]">
                  <Sparkles size={15} />
                  Startup competition demo
                </div>

                <div key={step} className="mt-5 animate-keynote-copy">
                  <p className="text-[13px] font-black uppercase tracking-[0.16em] text-[#3182F6]">
                    {activeStep.eyebrow}
                  </p>
                  <h1 className="mt-3 max-w-[620px] text-[42px] font-black leading-[1.04] tracking-[-0.02em] text-ink sm:text-[58px] lg:text-[64px]">
                    {activeStep.title}
                  </h1>
                  <p className="mt-5 max-w-lg text-[18px] font-bold leading-relaxed text-muted sm:text-[20px]">
                    {storyCopy}
                  </p>
                </div>

                <div className="mt-8 rounded-[28px] border border-white bg-white/78 p-5 shadow-[0_24px_60px_-36px_rgba(25,31,40,0.35)] backdrop-blur">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[13px] font-black text-muted">핵심 가치</p>
                      <p className="mt-1 text-[20px] font-black text-ink">
                        {activeStep.meaning}
                      </p>
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] bg-[#E8F3FF] text-[#3182F6]">
                      <ShieldCheck size={25} strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#E8F3FF]">
                    <div
                      className="h-full rounded-full bg-[#3182F6] transition-all duration-700 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </aside>

            <section className="order-1 lg:order-2">
              <div
                className={`relative mx-auto grid max-w-[780px] items-center gap-5 transition-all duration-700 ${
                  step === 6 ? "lg:grid-cols-1" : "sm:grid-cols-[1fr_88px_1fr]"
                }`}
              >
                {step === 6 ? (
                  <EndingScene endingLine={endingLine} />
                ) : (
                  <>
                    <PhoneShell label="Senior app" name="김순자님 · 72세">
                      <SeniorStory step={step} onTransfer={() => setStep(2)} />
                    </PhoneShell>

                    <InterventionRail step={step} />

                    <PhoneShell label="Family app" name="이지현님 · 딸">
                      <FamilyStory step={step} onNext={nextStep} />
                    </PhoneShell>
                  </>
                )}
              </div>
            </section>
          </section>

          <footer className="relative z-10 flex flex-col gap-3 border-t border-[#DCE7F6] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {steps.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStep(item.id)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-black transition ${
                    item.id === step
                      ? "bg-[#3182F6] text-white shadow-[0_16px_30px_-18px_rgba(49,130,246,0.9)]"
                      : "bg-white text-muted ring-1 ring-line hover:text-ink"
                  }`}
                >
                  {item.id + 1}. {item.title}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 0}
                className="inline-flex h-11 items-center gap-1.5 rounded-full bg-white px-4 text-[13px] font-black text-ink ring-1 ring-line transition disabled:opacity-35"
              >
                <ChevronLeft size={17} />
                이전
              </button>
              <button
                type="button"
                onClick={step === 6 ? reset : nextStep}
                className="inline-flex h-11 items-center gap-1.5 rounded-full bg-[#191F28] px-4 text-[13px] font-black text-white shadow-sm transition hover:-translate-y-0.5"
              >
                {step === 6 ? "처음으로" : "다음"}
                {step === 6 ? null : <ChevronRight size={17} />}
              </button>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}

function PhoneShell({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[336px]">
      <div className="mb-3 flex items-center gap-2 px-2">
        <img src="/hyodon-logo.png" alt="" className="h-8 w-8 rounded-xl object-cover" />
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.08em] text-[#3182F6]">
            {label}
          </p>
          <p className="text-[13px] font-bold text-muted">{name}</p>
        </div>
      </div>
      <div className="relative h-[620px] overflow-hidden rounded-[46px] bg-[#111827] p-[10px] shadow-[0_42px_90px_-36px_rgba(25,31,40,0.55)]">
        <div className="absolute left-1/2 top-[18px] z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-[#111827]" />
        <div className="h-full overflow-hidden rounded-[36px] bg-white">
          <div className="flex h-11 items-center justify-between px-7 pt-1 text-[12px] font-black text-ink">
            <span>9:41</span>
            <span>5G</span>
          </div>
          <div className="h-[calc(100%-44px)] overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
}

function SeniorStory({ step, onTransfer }: { step: DemoStep; onTransfer: () => void }) {
  if (step === 0) return <SmallPaymentScreen />;
  if (step === 2) return <RiskDetectionScreen />;
  if (step === 4) return <CallConnectedScreen />;
  if (step === 5) return <ResolutionScreen />;

  return (
    <div key={step} className="flex h-full flex-col bg-[#F7F8FA] px-5 pb-6 pt-4 animate-phone-scene">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[14px] font-bold text-muted">송금</p>
          <h2 className="mt-1 text-[24px] font-black">받는 분 확인</h2>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8F3FF] text-[#3182F6]">
          <ShieldCheck size={23} />
        </div>
      </div>

      <div className="mt-8 rounded-[28px] bg-white p-5 shadow-[0_18px_48px_-34px_rgba(25,31,40,0.45)]">
        <p className="text-[13px] font-black text-muted">받는 분</p>
        <p className="mt-2 text-[21px] font-black leading-snug">{recipient}</p>
        <div className="mt-5 h-px bg-line" />
        <p className="mt-5 text-[13px] font-black text-muted">송금 금액</p>
        <p className="mt-2 text-[42px] font-black leading-none tracking-[-0.03em] text-ink">
          {amount}
        </p>
      </div>

      <div className="mt-4 rounded-[24px] bg-[#FFF7ED] p-4 text-[#9A5B10] ring-1 ring-[#F7D9AC]">
        <div className="flex items-center gap-2 text-[14px] font-black">
          <TriangleAlert size={18} />
          투자지원센터
        </div>
        <p className="mt-1 text-[13px] font-bold leading-relaxed">
          전화로 안내받은 계좌라면 한 번 더 확인이 필요합니다.
        </p>
      </div>

      <div className="mt-auto">
        <button
          type="button"
          onClick={onTransfer}
          className="group flex h-[66px] w-full items-center justify-center gap-2 rounded-[24px] bg-[#3182F6] text-[22px] font-black text-white shadow-[0_18px_38px_-18px_rgba(49,130,246,0.85)] transition hover:-translate-y-0.5 active:scale-[0.98]"
        >
          송금하기
          <ArrowRight size={25} className="transition group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

function SmallPaymentScreen() {
  return (
    <div className="flex h-full flex-col bg-[#F7F8FA] px-5 pb-6 pt-4 animate-phone-scene">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[14px] font-bold text-muted">간편 결제</p>
          <h2 className="mt-1 text-[24px] font-black">행복마트</h2>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8F8EE] text-[#17994F]">
          <CheckCircle2 size={24} strokeWidth={2.4} />
        </div>
      </div>

      <div className="mt-8 rounded-[30px] bg-white p-5 shadow-[0_18px_48px_-34px_rgba(25,31,40,0.45)]">
        <p className="text-[13px] font-black text-muted">결제 금액</p>
        <p className="mt-2 text-[44px] font-black leading-none tracking-[-0.03em]">
          35,000원
        </p>
        <div className="mt-5 rounded-[22px] bg-[#E8F8EE] px-4 py-3 text-[#17994F]">
          <div className="flex items-center gap-2 text-[15px] font-black">
            <CheckCircle2 size={19} strokeWidth={2.5} />
            바로 승인되었습니다
          </div>
          <p className="mt-1 text-[13px] font-bold leading-relaxed">
            기준 금액보다 낮아 가족 확인 없이 조용히 처리됐어요.
          </p>
        </div>
      </div>

      <div className="mt-auto rounded-[24px] bg-[#E8F3FF] p-4 text-[#1B64DA]">
        <p className="text-[14px] font-black">효돈의 기본값</p>
        <p className="mt-1 text-[14px] font-bold leading-relaxed">
          작은 결제는 부모님이 직접 결정합니다.
        </p>
      </div>
    </div>
  );
}

function RiskDetectionScreen() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#101828] px-5 pb-6 pt-5 text-white animate-phone-scene">
      <div className="risk-radar absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full" />
      <div className="relative z-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-[#F04438] text-white shadow-[0_18px_48px_-20px_rgba(240,68,56,0.85)] animate-alert-pop">
          <AlertTriangle size={34} strokeWidth={2.5} />
        </div>
        <h2 className="mt-7 text-[32px] font-black leading-tight tracking-[-0.02em]">
          평소와 다른
          <br />
          고액 송금입니다
        </h2>
        <p className="mt-3 text-[15px] font-bold leading-relaxed text-white/62">
          효돈이 송금 맥락을 분석하고 가족 확인이 필요한 거래로 판단했습니다.
        </p>
      </div>

      <div className="relative z-10 mt-7 rounded-[28px] bg-white/10 p-5 backdrop-blur-xl ring-1 ring-white/10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[13px] font-black text-white/55">Risk score</p>
            <p className="mt-1 text-[48px] font-black leading-none">87</p>
          </div>
          <span className="pb-1 text-[18px] font-black text-white/45">/100</span>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/12">
          <div className="h-full w-[87%] rounded-full bg-[#F04438] animate-risk-fill" />
        </div>
      </div>

      <div className="relative z-10 mt-4 grid gap-2.5">
        {riskSignals.map((signal, index) => (
          <div
            key={signal}
            className="flex items-center gap-3 rounded-[20px] bg-white/8 px-4 py-3 ring-1 ring-white/8"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F04438]/18 text-[#FFB4AC]">
              <Radar size={17} />
            </span>
            <span className="text-[14px] font-black">{signal}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FamilyStory({ step, onNext }: { step: DemoStep; onNext: () => void }) {
  if (step < 3) return <QuietFamilyScreen smallPayment={step === 0} />;
  if (step === 3) return <FamilyAlertScreen onNext={onNext} />;
  if (step === 4) return <ConversationScreen onNext={onNext} />;
  return <FamilyResolutionScreen />;
}

function QuietFamilyScreen({ smallPayment = false }: { smallPayment?: boolean }) {
  return (
    <div className="flex h-full flex-col bg-[#F7F8FA] px-5 pb-6 pt-4 animate-phone-scene">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[14px] font-bold text-muted">가족 안심 모드</p>
          <h2 className="mt-1 text-[24px] font-black">어머니 지갑</h2>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8F3FF] text-[#3182F6]">
          <BellRing size={23} />
        </span>
      </div>

      <div className="mt-8 rounded-[30px] bg-white p-5 shadow-[0_18px_48px_-34px_rgba(25,31,40,0.45)]">
        <p className="text-[13px] font-black text-muted">오늘의 상태</p>
        <p className="mt-3 text-[30px] font-black leading-tight">
          {smallPayment ? "알림 없음" : "조용합니다"}
        </p>
        <p className="mt-3 text-[15px] font-bold leading-relaxed text-muted">
          {smallPayment
            ? "행복마트 35,000원 결제는 자녀 확인 없이 통과했습니다."
            : "일상 결제는 알림 없이 지나갑니다. 위험 신호가 있을 때만 알려드려요."}
        </p>
      </div>

      <div className="mt-auto rounded-[24px] bg-[#E8F3FF] p-4 text-[#1B64DA]">
        <p className="text-[14px] font-black">
          {smallPayment ? "소액은 자유롭게" : "효돈의 원칙"}
        </p>
        <p className="mt-1 text-[14px] font-bold leading-relaxed">
          {smallPayment
            ? "가족 앱에는 승인 요청이 뜨지 않습니다."
            : "부모님의 모든 소비를 감시하지 않습니다."}
        </p>
      </div>
    </div>
  );
}

function FamilyAlertScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex h-full flex-col bg-[#F7F8FA] px-5 pb-6 pt-4 animate-phone-scene">
      <div className="rounded-[30px] bg-[#F04438] p-5 text-white shadow-[0_22px_56px_-24px_rgba(240,68,56,0.75)] animate-alert-pop">
        <div className="flex items-center gap-2 text-[14px] font-black">
          <BellRing size={19} />
          긴급 확인 요청
        </div>
        <h2 className="mt-5 text-[30px] font-black leading-tight tracking-[-0.02em]">
          어머님이
          <br />
          530만원 송금을
          <br />
          시도하고 있습니다
        </h2>
      </div>

      <div className="mt-4 rounded-[26px] bg-white p-5 shadow-sm">
        <p className="text-[13px] font-black text-muted">받는 분</p>
        <p className="mt-2 text-[19px] font-black">{recipient}</p>
        <div className="mt-4 h-px bg-line" />
        <p className="mt-4 text-[13px] font-black text-muted">위험도</p>
        <p className="mt-1 text-[32px] font-black text-[#F04438]">87/100</p>
      </div>

      <div className="mt-auto grid gap-3">
        <button
          type="button"
          onClick={onNext}
          className="flex h-[58px] items-center justify-center gap-2 rounded-[22px] bg-[#191F28] text-[17px] font-black text-white"
        >
          <Phone size={21} />
          전화하기
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex h-[58px] items-center justify-center gap-2 rounded-[22px] bg-[#E8F3FF] text-[17px] font-black text-[#1B64DA]"
        >
          <MessageCircle size={21} />
          확인하기
        </button>
      </div>
    </div>
  );
}

function ConversationScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex h-full flex-col bg-white px-5 pb-6 pt-4 animate-phone-scene">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F3FF] text-[#3182F6]">
          <Phone size={24} />
        </div>
        <div>
          <p className="text-[14px] font-bold text-muted">통화 요약</p>
          <h2 className="text-[22px] font-black">Daughter contacted parent</h2>
        </div>
      </div>

      <div className="mt-8 grid gap-3">
        <SummaryBubble icon={<CheckCircle2 size={20} />} text="어머님과 직접 통화했습니다" />
        <SummaryBubble icon={<MessageCircle size={20} />} text="투자 사기 가능성을 함께 확인했습니다" />
        <SummaryBubble icon={<Clock3 size={20} />} text="지금 송금하지 않기로 했습니다" />
      </div>

      <div className="mt-auto rounded-[28px] bg-[#F7F8FA] p-5">
        <p className="text-[13px] font-black text-muted">효돈 제안</p>
        <p className="mt-2 text-[24px] font-black leading-tight">
          송금을 잠시 보류하고
          <br />
          가족 확인을 남깁니다
        </p>
        <button
          type="button"
          onClick={onNext}
          className="mt-5 flex h-[58px] w-full items-center justify-center gap-2 rounded-[22px] bg-[#3182F6] text-[17px] font-black text-white"
        >
          보류로 안내하기
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

function FamilyResolutionScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[#F7F8FA] px-6 text-center animate-phone-scene">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#E8F8EE] text-[#17994F] animate-pop">
        <BadgeCheck size={48} strokeWidth={2.3} />
      </div>
      <h2 className="mt-8 text-[30px] font-black leading-tight">피해를 막았습니다</h2>
      <p className="mt-4 text-[16px] font-bold leading-relaxed text-muted">
        가족은 부모님의 결정을 대신하지 않았습니다. 위험한 정보만 함께 확인했습니다.
      </p>
    </div>
  );
}

function CallConnectedScreen() {
  return (
    <div className="flex h-full flex-col bg-[#F7F8FA] px-5 pb-6 pt-4 text-center animate-phone-scene">
      <div className="mt-10 flex justify-center">
        <div className="relative">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#3182F6]/15" />
          <img
            src="/hyodon-logo.png"
            alt=""
            className="relative h-24 w-24 rounded-[34px] object-cover shadow-[0_20px_50px_-24px_rgba(49,130,246,0.9)]"
          />
        </div>
      </div>
      <h2 className="mt-10 text-[30px] font-black leading-tight">가족과 확인 중입니다</h2>
      <p className="mt-4 text-[18px] font-bold leading-relaxed text-muted">
        안전한 송금인지 함께 확인하고 있어요.
      </p>
      <div className="mt-auto rounded-[24px] bg-white p-4 text-left shadow-sm">
        <p className="text-[13px] font-black text-muted">송금 요청</p>
        <p className="mt-1 text-[20px] font-black">{amount}</p>
        <p className="mt-1 text-[14px] font-bold text-muted">{recipient}</p>
      </div>
    </div>
  );
}

function ResolutionScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[#F7F8FA] px-6 pb-6 text-center animate-phone-scene">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#E8F8EE] text-[#17994F] animate-pop">
        <CheckCircle2 size={50} strokeWidth={2.2} />
      </div>
      <h2 className="mt-9 text-[30px] font-black leading-tight">
        이번 송금은
        <br />
        잠시 보류되었습니다
      </h2>
      <p className="mt-5 text-[18px] font-bold leading-relaxed text-muted">
        필요시 가족과 다시 확인할 수 있습니다.
      </p>
      <div className="mt-8 rounded-full bg-white px-4 py-2 text-[13px] font-black text-muted shadow-sm">
        중립적인 안내
      </div>
    </div>
  );
}

function SummaryBubble({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[24px] bg-[#F7F8FA] p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E8F3FF] text-[#3182F6]">
        {icon}
      </span>
      <span className="text-left text-[16px] font-black leading-snug">{text}</span>
    </div>
  );
}

function InterventionRail({ step }: { step: DemoStep }) {
  const active = step >= 2;
  return (
    <div className="hidden flex-col items-center justify-center sm:flex">
      <div className={`h-3 w-3 rounded-full ${active ? "bg-[#F04438]" : "bg-[#D6E4F8]"}`} />
      <div className={`my-3 h-28 w-px ${active ? "bg-[#F04438]/35" : "bg-[#D6E4F8]"}`} />
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-[24px] shadow-sm transition-all duration-500 ${
          active ? "bg-[#F04438] text-white animate-alert-pop" : "bg-white text-muted"
        }`}
      >
        {step >= 5 ? <CheckCircle2 size={28} /> : <ShieldCheck size={28} />}
      </div>
      <div className={`my-3 h-28 w-px ${step >= 3 ? "bg-[#3182F6]/35" : "bg-[#D6E4F8]"}`} />
      <div className={`h-3 w-3 rounded-full ${step >= 3 ? "bg-[#3182F6]" : "bg-[#D6E4F8]"}`} />
    </div>
  );
}

function EndingScene({ endingLine }: { endingLine: 0 | 1 }) {
  return (
    <div className="relative mx-auto flex min-h-[620px] w-full max-w-[780px] flex-col items-center justify-center overflow-hidden rounded-[44px] bg-[#08111F] px-8 text-center text-white shadow-[0_42px_100px_-36px_rgba(25,31,40,0.7)]">
      <div className="ending-glow absolute inset-0" />
      <img
        src="/hyodon-logo.png"
        alt=""
        className="relative z-10 h-24 w-24 rounded-[34px] object-cover shadow-[0_28px_70px_-30px_rgba(49,130,246,1)]"
      />
      <div
        className={`relative z-10 mt-10 transition-all duration-700 ${
          endingLine === 1 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-95"
        }`}
      >
        <p className="text-[18px] font-black text-white/55">오늘의 결과</p>
        <h2 className="mt-4 text-[34px] font-black leading-tight tracking-[-0.02em] sm:text-[52px]">
          일상 결제는 그대로,
          <br />
          의심 송금은 잠시 보류
        </h2>
      </div>
      <div className="relative z-10 mt-10 grid w-full max-w-xl gap-3 sm:grid-cols-3">
        <ResultPill label="35,000원" value="즉시 승인" />
        <ResultPill label="5,300,000원" value="위험 감지" />
        <ResultPill label="가족 확인" value="송금 보류" />
      </div>
    </div>
  );
}

function ResultPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] bg-white/10 px-4 py-4 text-left ring-1 ring-white/10 backdrop-blur">
      <p className="text-[13px] font-black text-white/45">{label}</p>
      <p className="mt-1 text-[18px] font-black text-white">{value}</p>
    </div>
  );
}

export default App;
