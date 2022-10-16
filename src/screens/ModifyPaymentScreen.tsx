import React from 'react';
import RadioSelector from '../components/shared/RadioSelector';
import {
  Box,
  ButtonText,
  Description,
  FatDescription,
  MainButton,
  Padding,
  Row,
  ScreenContainer,
  Separator,
  SizedBox,
  SubTitle,
  TitleText,
  UnderLineInput,
} from '../components/shared/Common';

const ModifyPaymentScreen = () => {
  return (
    <>
      <ScreenContainer>
        <Padding padding={26}>
          <TitleText fontSize={28}>이묵돌 독서모임</TitleText>
          <SizedBox height={15} />
          <FatDescription fontSize={18}>
            {`2022.10.14` + '   /   ' + `11명`}
          </FatDescription>
        </Padding>
        <Box height={280}>
          <Padding padding={26}>
            <TitleText fontSize={22}>어떤 모임인가요?</TitleText>
            <SizedBox height={10} />
            <UnderLineInput placeholder="결제건의 이름을 입력해주세요." />
            <SizedBox height={10} />
            <UnderLineInput placeholder="결제자를 선택해주세요." />
            <SizedBox height={10} />
            <UnderLineInput placeholder="결제 금액을 입력해주세요." />
          </Padding>
        </Box>
        <Padding padding={26}>
          <Row
            style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <SubTitle fontSize={20}>참여자를 선택해주세요.</SubTitle>
            <Description fontSize={12}>3명 / 11명</Description>
          </Row>
          <SizedBox height={10} />
          <Separator marginHorizontal={20} />
          {Array.from({length: 5}).map((item, index) => {
            return (
              <React.Fragment key={index}>
                <RadioSelector isSelected={true} />
                <SizedBox height={20} />
              </React.Fragment>
            );
          })}
        </Padding>
        <SizedBox height={100} />
      </ScreenContainer>
      <MainButton onPress={() => {}}>
        <ButtonText>등록하기</ButtonText>
      </MainButton>
    </>
  );
};
export default ModifyPaymentScreen;
