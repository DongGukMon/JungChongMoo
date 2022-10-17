import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {Text, TextInput} from 'react-native';
import {
  Box,
  BoxInput,
  Description,
  Padding,
  Row,
  ScreenContainer,
  Separator,
  SizedBox,
  SubTitle,
  TitleText,
  UnderLineInput,
} from '../components/shared/Common';
import MainButton from '../components/shared/MainButton';

const ModifyCalculateScreen = () => {
  const {navigate} = useNavigation();
  const goToGroupDetail = useCallback(
    () => navigate('GroupDetail' as never),
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
          <Row
            style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <Description fontSize={12}>
              입력란은 자동으로 추가됩니다.
            </Description>
            <Description fontSize={12}>현재 11명</Description>
          </Row>
          <Separator marginVertical={20} />
          <BoxInput placeholder="이름을 입력해주세요." />
        </Padding>
      </ScreenContainer>
      <MainButton onPress={goToGroupDetail} text="다음" />
    </>
  );
};

export default ModifyCalculateScreen;