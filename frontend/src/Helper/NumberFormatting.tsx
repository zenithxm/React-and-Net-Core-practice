export const formatLargeNumber: any = (
  number: number,
  money: boolean = true
) => {
  if (isNaN(number)) return "-";
  if (number < 0) {
    return "-" + formatLargeNumber(-1 * number);
  }

  let formatNumber: string = "";
  if (number < 1000) {
    formatNumber = number + "";
  } else if (number >= 1000 && number < 1_000_000) {
    formatNumber = (number / 1000).toFixed(1) + "K";
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
    formatNumber = (number / 1_000_000).toFixed(1) + "M";
  } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
    formatNumber = (number / 1_000_000_000).toFixed(1) + "B";
  } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
    formatNumber = (number / 1_000_000_000_000).toFixed(1) + "T";
  }
  return (money ? "$" : "") + formatNumber
};

export const formatRatio = (ratio: number) => {
  if (isNaN(ratio)) return "-";
  return (Math.round(ratio * 100) / 100).toFixed(2);
};
