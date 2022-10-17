import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import Payment from '../components/gruopScreen/Payment';
import {
  FatDescription,
  Padding,
  Row,
  SizedBox,
  SubTitle,
  TitleText,
} from '../components/shared/Common';
import MainButton from '../components/shared/MainButton';
import ScreenLayout from '../components/shared/ScreenLayout';
import {RootState} from '../redux/store';
import {StylePropTypes} from '../types/shared/emotion';

const AddText = styled(SubTitle)`
  color: ${(props: Pick<StylePropTypes, 'theme'>) => props.theme.colors.accent};
  font-weight: 600;
`;

const GroupDetailScreen = () => {
  const groups = useSelector((state: RootState) => state.group);
  console.log(groups);

  const {navigate} = useNavigation();

  const goToModifyPayment = useCallback(() => {
    navigate('ModifyPaymentScreen' as never);
  }, []);

  const goToResultScreen = useCallback(() => {
    navigate('ResultScreen' as never);
  }, []);

  return (
    <>
      <ScreenLayout>
        <Padding padding={26}>
          <TitleText fontSize={28}>이묵돌 독서모임</TitleText>
          <SizedBox height={15} />
          <FatDescription fontSize={18}>
            {`2022.10.14` + '   /   ' + `11명`}
          </FatDescription>
          <SizedBox height={30} />
          <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <TitleText fontSize={24}>이번 모임의 결제건</TitleText>
            <TouchableOpacity onPress={goToModifyPayment}>
              <AddText fontSize={20}>추가하기</AddText>
            </TouchableOpacity>
          </Row>
          <SizedBox height={20} />
          {Array.from({length: 5}).map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Payment />
                <SizedBox height={20} />
              </React.Fragment>
            );
          })}

          <SizedBox height={120} />
        </Padding>
      </ScreenLayout>
      <MainButton onPress={goToResultScreen} text="정산하기" />
    </>
  );
};
export default GroupDetailScreen;
