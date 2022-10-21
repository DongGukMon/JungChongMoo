import {useRoute} from '@react-navigation/native';
import {RotationGestureHandler} from 'react-native-gesture-handler';
import ResultCard from '../components/resultScreen/ResultCard';
import {
  Box,
  FatDescription,
  Padding,
  SizedBox,
  TitleText,
} from '../components/shared/Common';
import ScreenLayout from '../components/shared/ScreenLayout';
import useCalculate from '../hooks/useCalculate';

const ResultScreen = () => {
  const {params: id} = useRoute();
  const inputData = useCalculate(id);

  return (
    <ScreenLayout>
      <Padding padding={26}>
        <TitleText fontSize={28}>정산 결과</TitleText>
      </Padding>
      <Box>
        <Padding padding={26}>
          <TitleText fontSize={24}>이묵돌 독서모임</TitleText>
          <SizedBox height={20} />
          <FatDescription fontSize={24}>총 결제 금액: 125,000원</FatDescription>
        </Padding>
      </Box>
      <Padding padding={26}>
        <ResultCard />
      </Padding>
    </ScreenLayout>
  );
};

export default ResultScreen;
