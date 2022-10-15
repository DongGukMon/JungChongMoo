import React from 'react';
import Payment from '../components/Calculate/Payment';
import {
  FatDescription,
  Padding,
  ScreenContainer,
  SizedBox,
  TitleText,
} from '../components/shared/Common';

const ModifyPaymentScreen = () => {
  return (
    <ScreenContainer>
      <Padding padding={26}>
        <TitleText fontSize={28}>이묵돌 독서모임</TitleText>
        <SizedBox height={15} />
        <FatDescription fontSize={18}>
          {`2022.10.14` + '   /   ' + `11명`}
        </FatDescription>
        <SizedBox height={30} />
      </Padding>
    </ScreenContainer>
  );
};
export default ModifyPaymentScreen;
