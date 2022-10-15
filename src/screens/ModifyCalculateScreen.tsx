import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {Text, TextInput} from 'react-native';
import {
  Box,
  BoxInput,
  ButtonText,
  Description,
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

const ModifyCalculateScreen = () => {
  const {navigate} = useNavigation();
  const goToCalculate = useCallback(
    () => navigate('CalculateScreen' as never),
    [],
  );
  return (
    <>
      <ScreenContainer>
        <Padding padding={26}>
          <TitleText fontSize={28}>새로운 정산 만들기</TitleText>
        </Padding>
        <Box height={220}>
          <Padding padding={26}>
            <TitleText fontSize={22}>어떤 모임인가요?</TitleText>
            <SizedBox height={10} />
            <UnderLineInput placeholder="모임명을 입력해주세요." />
            <SizedBox height={10} />
            <UnderLineInput placeholder="날짜를 입력해주세요." />
          </Padding>
        </Box>
        <Padding padding={26}>
          <SubTitle fontSize={20}>참여자를 입력해주세요.</SubTitle>
          <SizedBox height={10} />
          <Row>
            <Description fontSize={12}>
              입력란은 자동으로 추가됩니다.
            </Description>
            <Description fontSize={12}>현재 11명</Description>
          </Row>
          <Separator marginHorizontal={20} />
          <BoxInput placeholder="이름을 입력해주세요." />
        </Padding>
      </ScreenContainer>
      <MainButton onPress={goToCalculate}>
        <ButtonText>다음</ButtonText>
      </MainButton>
    </>
  );
};

export default ModifyCalculateScreen;
