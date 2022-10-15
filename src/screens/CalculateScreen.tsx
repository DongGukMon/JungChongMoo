import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import Payment from '../components/Calculate/Payment';
import {
  ButtonText,
  FatDescription,
  MainButton,
  OutlineButton,
  OutlineButtonText,
  Padding,
  ScreenContainer,
  SizedBox,
  TitleText,
} from '../components/shared/Common';

const CalculateScreen = () => {
  const {navigate} = useNavigation();

  const goToModifyPayment = useCallback(() => {
    navigate('ModifyPaymentScreen' as never);
  }, []);

  return (
    <>
      <ScreenContainer>
        <Padding padding={26}>
          <TitleText fontSize={28}>이묵돌 독서모임</TitleText>
          <SizedBox height={15} />
          <FatDescription fontSize={18}>
            {`2022.10.14` + '   /   ' + `11명`}
          </FatDescription>
          <SizedBox height={30} />
          <TitleText fontSize={24}>이번 모임의 결제건</TitleText>
          <SizedBox height={20} />
          {Array.from({length: 5}).map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Payment />
                <SizedBox height={20} />
              </React.Fragment>
            );
          })}
          <OutlineButton onPress={goToModifyPayment}>
            <OutlineButtonText>결제건 추가하기</OutlineButtonText>
          </OutlineButton>
          <SizedBox height={120} />
        </Padding>
      </ScreenContainer>
      <MainButton onPress={() => {}}>
        <ButtonText>정산하기</ButtonText>
      </MainButton>
    </>
  );
};
export default CalculateScreen;
