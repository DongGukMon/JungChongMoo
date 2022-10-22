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
import ThreeDots from '../shared/ThreeDots';

interface PaymentPropTypes {
  data: PaymentTypes;
  onPress: () => void;
  groupId: Readonly<object | undefined>;
}

const Payment = ({onPress: goBack, data, groupId}: PaymentPropTypes) => {
  return (
    <Card onPress={goBack}>
      <SizedBox height={10} />
      <Padding padding={16}>
        <TitleText fontSize={22}>{data?.name}</TitleText>
        <SizedBox height={25} />
        <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
          <TitleText fontSize={24}>{data.payer}</TitleText>
          <Row style={{alignItems: 'center'}}>
            <FatDescription fontSize={24}>
              {insertComma(data.amount)}원 {'   /   '}
            </FatDescription>
            <FatDescription fontSize={20}>
              {data?.participants?.length}명
            </FatDescription>
          </Row>
        </Row>
      </Padding>
      <SizedBox height={10} />
      <ThreeDots type="payment" id={data.id} groupId={groupId} />
    </Card>
  );
};

export default Payment;
