import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AdCarousel from '../components/home/AdCarousel';
import PrevGroup from '../components/home/PrevGroup';
import {TitleText, SizedBox, Padding} from '../components/shared/Common';
import MainButton from '../components/shared/MainButton';
import ScreenLayout from '../components/shared/ScreenLayout';
import {RootState} from '../redux/store';
import {GroupTypes} from '../types/shared/group';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initializeGroups} from '../redux/slice/gorupsSlice';

const Home = () => {
  const {navigate} = useNavigation();
  const goToModifyGroup = useCallback(() => {
    navigate('ModifyGroup' as never);
  }, []);

  const goToGroupDetail = useCallback(
    (id: string) => navigate('GroupDetail' as never, id as never),
    [],
  );

  const rawGroups = useSelector((state: RootState) => state.groups);

  const groups = Object.values(rawGroups).sort((a, b) => b.dateNow - a.dateNow);

  return (
    <>
      <ScreenLayout>
        <Padding padding={26}>
          <TitleText fontSize={28}>전자두뇌 정총무</TitleText>
        </Padding>

        <AdCarousel />
        <SizedBox height={20} />
        <Padding padding={26}>
          <TitleText fontSize={24}>지난 정산들</TitleText>
          <SizedBox height={30} />
          {Object.values(groups).map((group: GroupTypes) => {
            return (
              <React.Fragment key={group.id}>
                <PrevGroup onPress={goToGroupDetail} data={group} />
                <SizedBox height={20} />
              </React.Fragment>
            );
          })}
        </Padding>
      </ScreenLayout>
      <MainButton onPress={goToModifyGroup} text="새로운 정산 만들기" />
    </>
  );
};

export default Home;
