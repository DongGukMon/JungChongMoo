import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
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
import {selectedGroupSelector} from '../redux/slice/gorupsSlice';
import {RootState} from '../redux/store';
import insertComma from '../utils/insertComma';

const ResultScreen = () => {
  const {params: id} = useRoute();
  const {normalizedData, resultObj: resultData} = useCalculate(id);
  if (!resultData || !normalizedData) {
    return <></>;
  }
  const selectedGroup = useSelector((state: RootState) =>
    selectedGroupSelector(state, id ? id : ''),
  );

  return (
    <ScreenLayout>
      <Padding padding={26}>
        <TitleText fontSize={28}>정산 결과</TitleText>
      </Padding>
      <Box>
        <Padding padding={26}>
          <TitleText fontSize={24}>{selectedGroup.name}</TitleText>
          <SizedBox height={20} />
          <FatDescription fontSize={24}>
            총 결제 금액: {insertComma(selectedGroup.totalPayments)}원
          </FatDescription>
        </Padding>
      </Box>
      <Padding padding={26}>
        {Object.keys(resultData).map(name => {
          return (
            <ResultCard
              name={name}
              rawData={normalizedData}
              data={resultData[name]}
              key={name}
            />
          );
        })}
      </Padding>
    </ScreenLayout>
  );
};

export default ResultScreen;
