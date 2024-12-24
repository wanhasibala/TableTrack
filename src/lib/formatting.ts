export const rupiahFormat = (amount: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "idr",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
