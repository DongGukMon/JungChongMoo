import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import AdCarousel from '../components/home/AdCarousel';
import PrevGroup from '../components/home/PrevGroup';
import {TitleText, SizedBox, Padding} from '../components/shared/Common';
import FloatingButton from '../components/shared/FloatingBtn';
import RemoveModal from '../components/shared/RemoveModal';
import ScreenLayout from '../components/shared/ScreenLayout';
import {RootState} from '../redux/store';
import {GroupTypes} from '../types/shared/group';

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
  // AsyncStorage.getItem('groups').then(i => console.log(i));

  return (
    <>
      <ScreenLayout>
        <Padding padding={26}>
          <TitleText fontSize={28}>전자두뇌 정총무</TitleText>
        </Padding>
        <AdCarousel />
        <SizedBox height={20} />
        <Padding padding={26}>
          {Object.values(groups).length === 0 ? (
            <View
              style={{
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TitleText fontSize={24}>
                정총무와 함께 정산을 쉽고 빠르게
              </TitleText>
            </View>
          ) : (
            <>
              <TitleText fontSize={24}>지난 정산들</TitleText>
              <SizedBox height={30} />
              {Object.values(groups).map((group: GroupTypes) => (
                <PrevGroup
                  key={group.id}
                  onPress={goToGroupDetail}
                  data={group}
                />
              ))}
            </>
          )}
        </Padding>
      </ScreenLayout>
      <FloatingButton onPress={goToModifyGroup} />
      <RemoveModal type="group" />
    </>
  );
};

export default Home;
