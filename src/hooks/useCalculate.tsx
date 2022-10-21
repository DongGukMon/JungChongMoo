import {useSelector} from 'react-redux';
import {selectedGroupSelector} from '../redux/slice/gorupsSlice';
import {relatedPaymentSelector} from '../redux/slice/paymentSlice';
import {RootState} from '../redux/store';
import {GroupTypes} from '../types/shared/group';
import {PaymentTypes} from '../types/shared/payment';

const useCalculate = (id: Readonly<object | undefined>) => {
  if (!id) {
    return {};
  }
  const selectedGorup: GroupTypes = useSelector((state: RootState) =>
    selectedGroupSelector(state, id ? id : ''),
  );

  const wholeParticipants = selectedGorup.participants;
  const paymentsId = selectedGorup.payments;

  const relatedPayments: PaymentTypes[] = useSelector((state: RootState) =>
    relatedPaymentSelector(state, paymentsId),
  );
  console.log(selectedGorup);
  console.log(relatedPayments);

  //   const neededData = relatedPayments.map(payment => {
  //     return {
  //       payer: payment.payer,
  //       amount: payment.amount,
  //       participants: payment.participants,
  //     };
  //   });

  //   const inputData = {
  //     wholeParticipants,
  //     payments: neededData,
  //   };
  //   return inputData;
};

export default useCalculate;