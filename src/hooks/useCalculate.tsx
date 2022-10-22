import {useSelector} from 'react-redux';
import {selectedGroupSelector} from '../redux/slice/gorupsSlice';
import {relatedPaymentSelector} from '../redux/slice/paymentSlice';
import {RootState} from '../redux/store';
import {GroupTypes} from '../types/shared/group';
import {PaymentTypes} from '../types/shared/payment';
import {
  calculate,
  NormalizedDataObjFormTypes,
  ResultObjTpyes,
} from '../utils/calculate';

const useCalculate = (
  id: Readonly<object | undefined>,
): {
  normalizedData?: NormalizedDataObjFormTypes;
  resultObj?: ResultObjTpyes;
} => {
  if (!id) {
    return {};
  }
  const selectedGorup: GroupTypes = useSelector((state: RootState) =>
    selectedGroupSelector(state, id),
  );

  const wholeParticipants = selectedGorup.participants;
  const paymentsId = selectedGorup.payments;

  const relatedPayments: PaymentTypes[] = useSelector((state: RootState) =>
    relatedPaymentSelector(state, paymentsId),
  );

  const neededData = relatedPayments.map(payment => {
    return {
      payer: payment.payer,
      amount: Number(payment.amount),
      participants: payment.participants,
    };
  });

  const inputData = {
    wholeParticipants,
    payments: neededData,
  };

  return calculate(inputData);
};

export default useCalculate;
