export const formatWon = (amount: number) =>
  `${new Intl.NumberFormat("ko-KR").format(amount)}원`;

export const formatShortWon = (amount: number) => {
  if (amount >= 10000 && amount % 10000 === 0) {
    return `${amount / 10000}만원`;
  }

  return formatWon(amount);
};

export const formatTime = (ts: number) =>
  new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(ts);
