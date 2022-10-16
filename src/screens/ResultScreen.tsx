import {RotationGestureHandler} from 'react-native-gesture-handler';
import ResultCard from '../components/resultScreen/ResultCard';
import {
  Box,
  FatDescription,
  Padding,
  ScreenContainer,
  SizedBox,
  TitleText,
} from '../components/shared/Common';

const ResultScreen = () => {
  return (
    <ScreenContainer>
      <Padding padding={26}>
        <TitleText fontSize={28}>정산 결과</TitleText>
      </Padding>
      <Box height={140}>
        <Padding padding={26}>
          <TitleText fontSize={24}>이묵돌 독서모임</TitleText>
          <SizedBox height={20} />
          <FatDescription fontSize={24}>총 결제 금액: 125,000원</FatDescription>
        </Padding>
      </Box>
      <Padding padding={26}>
        <ResultCard />
      </Padding>
    </ScreenContainer>
  );
};

export default ResultScreen;
