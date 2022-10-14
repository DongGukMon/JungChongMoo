import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Text, View} from 'react-native';
import AdCarousel from '../components/home/AdCarousel';
import PrevCalculate from '../components/home/PrevCalculate';
import {
  TitleText,
  ScreenContainer,
  SizedBox,
  Padding,
  MainButton,
  ButtonText,
} from '../components/shared/Common';

const Home = () => {
  const {navigate} = useNavigation();
  const goToNewCalculate = useCallback(() => {
    navigate('NewCalculate' as never);
  }, []);
  return (
    <>
      <ScreenContainer>
        <Padding padding={26}>
          <TitleText fontSize={28}>전자두뇌 정총무</TitleText>
        </Padding>
        <SizedBox height={10} />
        <AdCarousel />
        <SizedBox height={20} />
        <Padding padding={26}>
          <TitleText fontSize={24}>지난 정산들</TitleText>
          <SizedBox height={30} />
          {Array.from({length: 5}).map((item, index) => {
            return (
              <React.Fragment key={index}>
                <PrevCalculate />
                <SizedBox height={20} />
              </React.Fragment>
            );
          })}
          <SizedBox height={100} />
        </Padding>
      </ScreenContainer>
      <MainButton onPress={goToNewCalculate}>
        <ButtonText>새로운 정산 만들기</ButtonText>
      </MainButton>
    </>
  );
};

export default Home;
