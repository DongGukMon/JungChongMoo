interface PaymentTypes {
  participants: string[];
  amount: number;
  payer: string;
}

interface InputDataTypes {
  wholeParticipants: string[];
  payments: PaymentTypes[];
}

type NormalizedDataTypes = (string | number)[][];

export interface NormalizedDataObjFormTypes {
  [name: string]: number;
}

export interface ResultObjTpyes {
  [name: string]: {
    trades: {
      taker: string | number;
      giver: string | number;
      amount: string | number;
    }[];
    totalAmount: number;
    extra?: {
      type: 'plus' | 'minus';
      amount: number;
    };
  };
}

const updateResultObj = (
  taker: string,
  giver: string,
  amount: number,
  resultObj: ResultObjTpyes,
) => {
  return {
    ...resultObj[taker],
    trades: [...(resultObj[taker]?.trades || []), {taker, giver, amount}],
    totalAmount: resultObj[taker]?.totalAmount
      ? resultObj[taker]?.totalAmount + amount
      : amount,
  };
};

// 전체 paymnets를 분석해 {name:액수} 형태로 각각 얼마를 주거나 받아야하는지 데이터 재구조화
export const normalizeData = (
  inputData: InputDataTypes,
): {objForm: NormalizedDataObjFormTypes; arrForm: NormalizedDataTypes} => {
  //+는 받아야할 돈, -는 내야할 돈으로 정의

  const resultObj: {[name: string]: number} = {};
  inputData.wholeParticipants.map((name: string) => {
    resultObj[name] = 0;
  });

  inputData.payments.map((payment: PaymentTypes) => {
    const {participants, amount, payer} = payment;

    resultObj[payer] = resultObj[payer] + Number(amount);

    //participants가 0일수 없도록 정산 만들때 제한조건을 두어야함
    //일단 여기서는 그냥 진행
    const amountPerPerson = amount / participants.length;

    participants.map(name => {
      //10원단위 반올림
      resultObj[name] =
        Math.round((resultObj[name] - amountPerPerson) / 100) * 100;
    });
  });

  //arr형태로 변경
  const returnArr: NormalizedDataTypes = Object.keys(resultObj).map(name => {
    return [name, resultObj[name]];
  });

  //받아야할 금액 순서로 정렬
  return {objForm: resultObj, arrForm: returnArr.sort((a, b) => +b[1] - +a[1])};
};

const trade = (
  inputArr: NormalizedDataTypes,
  resultObj: ResultObjTpyes,
): ResultObjTpyes => {
  if (inputArr.length <= 1) {
    return resultObj;
  }

  //돈을 받는 사람
  const [taker, moneyToReceive] = inputArr[0];
  //돈을 주는 사람
  const [giver, moneyToGive] = inputArr[inputArr.length - 1];

  const difference = Number(moneyToReceive) + Number(moneyToGive);

  if (difference > 0) {
    inputArr[0] = [taker, difference];
    inputArr.splice(inputArr.length - 1, 1);
    resultObj[taker] = updateResultObj(
      taker.toString(),
      giver.toString(),
      Math.abs(Number(moneyToGive)),
      resultObj,
    );
  } else if (difference < 0) {
    inputArr[inputArr.length - 1] = [giver, difference];
    inputArr.splice(0, 1);
    resultObj[taker] = updateResultObj(
      taker.toString(),
      giver.toString(),
      Number(moneyToReceive),
      resultObj,
    );
  } else {
    inputArr.splice(inputArr.length - 1, 1);
    inputArr.splice(0, 1);
    resultObj[taker] = updateResultObj(
      taker.toString(),
      giver.toString(),
      Number(moneyToReceive),
      resultObj,
    );
  }

  return trade(inputArr, resultObj);
};

export const calculate = (inputData: InputDataTypes) => {
  const argInputData = {...inputData};
  const {objForm: normalizedDataObjForm, arrForm: normalizedData} =
    normalizeData(argInputData);

  const resultObj = trade(normalizedData, {});

  Object.keys(resultObj).map((name: string) => {
    const difference =
      normalizedDataObjForm[name] - resultObj[name]?.totalAmount;
    //원래 받아야할 돈 보다 덜 받았을 때
    if (difference > 0) {
      resultObj[name].extra = {type: 'minus', amount: difference};
    } else if (difference < 0) {
      resultObj[name].extra = {type: 'plus', amount: Math.abs(difference)};
    }
  });

  return {normalizedData: normalizedDataObjForm, resultObj};
};
