const insertComma = (amount: string | number | undefined) => {
  if (!amount) {
    return undefined;
  } else {
    const comma = (amount: string | number) => {
      amount = String(amount);
      return amount.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    };
    const uncomma = (amount: string | number) => {
      amount = String(amount);
      return amount.toString().replace(/[^\d]+/g, '');
    };
    return comma(uncomma(amount));
  }
};

export default insertComma;

// const inputPriceFormat = (str) => {
//     console.log("s", str);
//     const comma = (str) => {
//       str = String(str);
//       return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
//     };
//     const uncomma = (str) => {
//       str = String(str);
//       return str.replace(/[^\d]+/g, "");
//     };
//     return comma(uncomma(str));
//   };
