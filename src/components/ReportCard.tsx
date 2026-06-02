import { BarChart3 } from "lucide-react";
import { formatWon } from "../utils/format";

const reportRows = [
  { label: "마트", amount: 35000, color: "bg-toss" },
  { label: "약국", amount: 12000, color: "bg-toss" },
  { label: "건강/기타", amount: 95000, color: "bg-[#1B64DA]" },
];

export default function ReportCard() {
  return (
    <section className="rounded-[28px] bg-white p-5 shadow-[0_12px_30px_-18px_rgba(33,31,26,0.35)]">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-toss/10 text-toss">
          <BarChart3 size={21} strokeWidth={2.3} />
        </span>
        <div>
          <p className="text-[17px] font-black text-ink">이번 달 리포트</p>
          <p className="text-[13px] font-bold text-muted">정기 사용 패턴</p>
        </div>
      </div>

      <p className="mt-5 text-[30px] font-black leading-none text-ink">
        {formatWon(142000)}
      </p>
      <p className="mt-1 text-[14px] font-bold text-muted">이번 달 사용</p>

      <div className="mt-5 grid gap-3">
        {reportRows.map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${row.color}`} />
            <span className="flex-1 text-[14px] font-bold text-muted">
              {row.label}
            </span>
            <span className="text-[14px] font-black text-ink">
              {formatWon(row.amount)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
