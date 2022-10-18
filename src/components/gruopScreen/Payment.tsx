import {PaymentTypes} from '../../types/shared/payment';
import insertComma from '../../utils/insertComma';
import {
  Card,
  FatDescription,
  Padding,
  Row,
  SizedBox,
  TitleText,
} from '../shared/Common';

interface PaymentPropTypes {
  data: PaymentTypes;
  onPress: () => void;
}

const Payment = ({onPress: goBack, data}: PaymentPropTypes) => {
  return (
    <Card onPress={goBack}>
      <SizedBox height={10} />
      <Padding padding={16}>
        <TitleText fontSize={22}>{data?.name}</TitleText>
        <SizedBox height={5} />

        <SizedBox height={20} />
        <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
          <TitleText fontSize={24}>{data.payer}</TitleText>
          <Row style={{alignItems: 'center'}}>
            <FatDescription fontSize={24}>
              {insertComma(data?.amount)}원 {'   /   '}
            </FatDescription>
            <FatDescription fontSize={20}>
              {data?.participants?.length}명
            </FatDescription>
          </Row>
        </Row>
      </Padding>
      <SizedBox height={10} />
    </Card>
  );
};

export default Payment;
