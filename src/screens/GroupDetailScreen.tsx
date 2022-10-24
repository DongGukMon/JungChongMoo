import styled from '@emotion/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import Payment from '../components/gruopScreen/Payment';
import {
  FatDescription,
  Padding,
  Row,
  SizedBox,
  SubTitle,
  TitleText,
} from '../components/shared/Common';
import MainButton from '../components/shared/MainButton';
import RemoveModal from '../components/shared/RemoveModal';
import ScreenLayout from '../components/shared/ScreenLayout';
import {selectedGroupSelector} from '../redux/slice/gorupsSlice';
import {relatedPaymentSelector} from '../redux/slice/paymentSlice';
import {RootState} from '../redux/store';
import {lightTheme} from '../styles/theme';
import {StylePropTypes} from '../types/shared/emotion';
import {GroupTypes} from '../types/shared/group';
import {PaymentTypes} from '../types/shared/payment';

const AddText = styled(SubTitle)`
  color: ${(props: Pick<StylePropTypes, 'theme'>) => props.theme.colors.accent};
  font-weight: 600;
`;

const SettingBtn = styled.TouchableOpacity`
  margin-right: 10px;
`;

const GroupDetailScreen = () => {
  const {navigate, setOptions} = useNavigation();
  const {params: id} = useRoute();

  const selectedGroup: GroupTypes = useSelector((state: RootState) =>
    selectedGroupSelector(state, id ? id : ''),
  );

  const rawPayments: PaymentTypes[] = useSelector((state: RootState) =>
    relatedPaymentSelector(state, selectedGroup.payments),
  );

  const payments = Object.values(rawPayments).sort(
    (a, b) => b.dateNow - a.dateNow,
  );

  const goToModifyPayment = useCallback(
    (id: Readonly<object | undefined>, paymentData?: PaymentTypes) => {
      navigate(
        'ModifyPaymentScreen' as never,
        {groupId: id, paymentData} as never,
      );
    },
    [],
  );

  const goToResultScreen = useCallback(() => {
    navigate('ResultScreen' as never, id as never);
  }, []);

  const goToModifyGroup = useCallback(
    (groupData: {selectedGroup: GroupTypes; payments: PaymentTypes[]}) => {
      navigate('ModifyGroup' as never, groupData as never);
    },
    [],
  );

  useEffect(() => {
    setOptions({
      headerRight: () => {
        const payers = payments.map(payment => payment.payer);
        return (
          <SettingBtn
            onPress={() => goToModifyGroup({selectedGroup, payments})}>
            <Icon name="settings" size={24} />
          </SettingBtn>
        );
      },
    });
  }, [selectedGroup]);

  return (
    <>
      <ScreenLayout>
        <Padding padding={26}>
          <TitleText fontSize={28}>{selectedGroup?.name}</TitleText>
          <SizedBox height={15} />
          <FatDescription fontSize={18}>
            {selectedGroup?.date +
              '   /   ' +
              `${selectedGroup?.participants.length}명`}
          </FatDescription>
          <SizedBox height={30} />
          <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <TitleText fontSize={24}>이번 모임의 결제건</TitleText>
            <TouchableOpacity onPress={() => goToModifyPayment(id)}>
              <Row style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                  name="add-circle"
                  size={28}
                  color={lightTheme.colors.accent}
                />
                <SizedBox width={5} />
                <AddText fontSize={20}>추가하기</AddText>
              </Row>
            </TouchableOpacity>
          </Row>
          <SizedBox height={20} />
          {payments.map(payment => (
            <Payment
              key={payment.id}
              onPress={() => goToModifyPayment(id, payment)}
              data={payment}
              groupId={id}
            />
          ))}

          <SizedBox height={120} />
        </Padding>
      </ScreenLayout>
      <MainButton
        disabled={payments.length === 0}
        onPress={goToResultScreen}
        text="정산하기"
      />
      <RemoveModal type="payment" />
    </>
  );
};
export default GroupDetailScreen;
