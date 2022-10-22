import {GroupTypes} from '../../types/shared/group';
import insertComma from '../../utils/insertComma';
import {
  Card,
  FatDescription,
  Padding,
  Row,
  SizedBox,
  SubTitle,
  TitleText,
} from '../shared/Common';
import ThreeDots from '../shared/ThreeDots';

interface PrevGroup {
  data: GroupTypes;
  onPress: (id: string) => void;
}

const PrevGroup = ({data, onPress: goToGroupDetail}: PrevGroup) => {
  return (
    <Card onPress={() => goToGroupDetail(data.id)}>
      <SizedBox height={10} />
      <Padding padding={16}>
        <TitleText fontSize={22}>{data.name}</TitleText>
        <SizedBox height={5} />
        <FatDescription fontSize={18}>{data.date}</FatDescription>
        <SizedBox height={20} />
        <Row style={{alignItems: 'center'}}>
          <TitleText fontSize={24}>
            {data?.totalPayments !== 0 ? insertComma(data?.totalPayments) : 0}{' '}
            원 {'   /   '}
          </TitleText>
          <TitleText fontSize={20}>{data.participants?.length}명</TitleText>
        </Row>
      </Padding>
      <SizedBox height={10} />
      <ThreeDots type="group" id={data.id} />
    </Card>
  );
};

export default PrevGroup;
