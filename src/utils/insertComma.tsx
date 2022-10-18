export const uncomma = (amount: string | number) => {
  amount = String(amount);
  return amount.toString().replace(/[^\d]+/g, '');
};
const insertComma = (amount: string | number | undefined) => {
  if (!amount) {
    return undefined;
  } else {
    const comma = (amount: string | number) => {
      amount = String(amount);
      return amount.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    };

    return comma(uncomma(amount));
  }
};

export default insertComma;
