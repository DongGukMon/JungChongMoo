import {useNavigation, useRoute} from '@react-navigation/native';
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

import ViewShot from 'react-native-view-shot';
import {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, Share} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ShareModal from '../components/resultScreen/ShareModal';

const ResultScreen = () => {
  const {setOptions} = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  const {params: id} = useRoute();
  const {normalizedData, resultObj: resultData} = useCalculate(id);
  const ref = useRef<ViewShot | null>(null);

  if (!resultData || !normalizedData) {
    return <></>;
  }
  const selectedGroup = useSelector((state: RootState) =>
    selectedGroupSelector(state, id ? id : ''),
  );

  useEffect(() => {
    setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => {
              setIsVisible(true);
            }}>
            <Icon name="share-social" size={24} />
          </TouchableOpacity>
        );
      },
    });
  }, [ref]);

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
      <ViewShot
        ref={ref}
        options={{fileName: 'Your-File-Name', format: 'jpg', quality: 0.9}}>
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
      </ViewShot>
      <ShareModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        payers={Object.keys(resultData)}
        resultRef={ref}
      />
    </ScreenLayout>
  );
};

export default ResultScreen;
