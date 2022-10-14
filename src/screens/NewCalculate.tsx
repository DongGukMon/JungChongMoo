import {TextInput} from 'react-native';
import {
  Box,
  ButtonText,
  Description,
  MainButton,
  Padding,
  Row,
  ScreenContainer,
  SizedBox,
  SubTitle,
  TitleText,
} from '../components/shared/Common';

const NewCalculate = () => {
  return (
    <>
      <ScreenContainer>
        <Padding padding={26}>
          <TitleText fontSize={28}>새로운 정산 만들기</TitleText>
        </Padding>
        <Box height={200}></Box>
        <Padding padding={26}>
          <SubTitle fontSize={24}>참여자를 입력해주세요.</SubTitle>
          <SizedBox height={10} />
          <Row>
            <Description fontSize={12}>
              입력란은 자동으로 추가됩니다.
            </Description>
            <Description fontSize={12}>현재 11명</Description>
          </Row>
          <SizedBox height={36} />
          <TextInput style={{backgroundColor: 'black'}} />
        </Padding>
      </ScreenContainer>
      <MainButton>
        <ButtonText>다음</ButtonText>
      </MainButton>
    </>
  );
};

export default NewCalculate;
