import React, {useEffect, useState} from 'react';
import RadioSelector from '../components/shared/RadioSelector';
import {
  Box,
  Button,
  ButtonText,
  Description,
  FakeUnderLineInput,
  FatDescription,
  Padding,
  Placeholder,
  Row,
  Separator,
  SizedBox,
  SubTitle,
  TitleText,
  UnderLineInput,
} from '../components/shared/Common';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from '@emotion/native';
import {StylePropTypes} from '../types/shared/emotion';
import ModalLayout from '../components/shared/ModalLayout';
import {ScrollView} from 'react-native';
import MainButton from '../components/shared/MainButton';
import ScreenLayout from '../components/shared/ScreenLayout';
import {GroupTypes} from '../types/shared/group';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {
  addPayment,
  editGroup,
  selectedGroupSelector,
} from '../redux/slice/gorupsSlice';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {editPayment, makePayment} from '../redux/slice/paymentSlice';
import {useForm} from 'react-hook-form';
import uuid from 'react-native-uuid';
import insertComma, {uncomma} from '../utils/insertComma';
import AlertModal from '../components/shared/AlertModal';
import {PaymentTypes} from '../types/shared/payment';

const ModalContentContainer = styled.View`
  height: 50%;
  width: 85%;
  background-color: ${(props: Pick<StylePropTypes, 'theme'>) =>
    props.theme.colors.main};
  border-radius: 10px;
`;

interface ModalPropTypes {
  isVisible: boolean;
  setIsVisible: (arg0: boolean) => void;
  setPayer: (arg0: string) => void;
  payer: string;
  selectedGorup: GroupTypes;
}

const PayerSelectModal = ({
  selectedGorup,
  isVisible,
  setIsVisible,
  setPayer,
  payer,
}: ModalPropTypes) => {
  return (
    <ModalLayout isVisible={isVisible} setIsVisible={setIsVisible}>
      <ModalContentContainer>
        <Padding padding={16} style={{flex: 1}}>
          <SizedBox height={10} />
          <TitleText fontSize={24}> ???????????? ??????????????????.</TitleText>
          <Separator marginVertical={15} />
          <ScrollView style={{flex: 1}}>
            {selectedGorup?.participants?.map((participant, index) => {
              return (
                <React.Fragment key={index}>
                  <RadioSelector
                    onPress={() => setPayer(participant)}
                    name={participant}
                    isSelected={participant === payer}
                  />
                  <SizedBox height={10} />
                </React.Fragment>
              );
            })}
          </ScrollView>
          <SizedBox height={10} />
          <Button onPress={() => setIsVisible(false)}>
            <ButtonText>??????</ButtonText>
          </Button>
        </Padding>
      </ModalContentContainer>
    </ModalLayout>
  );
};

const ModifyPaymentScreen = () => {
  const {params} = useRoute();
  const {groupId: id, paymentData} = params as {
    groupId: string;
    paymentData: PaymentTypes;
  };

  const isModify = Boolean(paymentData);

  const {goBack} = useNavigation();
  const dispatch = useDispatch();
  const selectedGorup: GroupTypes = useSelector((state: RootState) =>
    selectedGroupSelector(state, id ? id : ''),
  );

  const [isVisible, setIsVisible] = useState(false);

  const [payer, setPayer] = useState('');
  const [selectedList, setSelectedList] = useState(selectedGorup?.participants);

  const {getValues, setValue, watch} = useForm();

  const makeNewPayment = (groupId: string, paymentId: string) => {
    dispatch(
      makePayment({
        id: paymentId,
        name: getValues('paymentName'),
        payer,
        amount: uncomma(getValues('amount')),
        participants: selectedList,
        dateNow: Date.now(),
      }),
    );
    dispatch(
      addPayment({
        paymentId,
        groupId,
        amount: Number(uncomma(getValues('amount'))),
      }),
    );
  };

  const modifyPayment = () => {
    dispatch(
      editPayment({
        id: paymentData.id,
        name: getValues('paymentName'),
        payer,
        amount: uncomma(getValues('amount')),
        participants: selectedList,
        dateNow: paymentData.dateNow,
      }),
    );
    dispatch(
      editGroup({
        ...selectedGorup,
        totalPayments:
          selectedGorup.totalPayments -
          +paymentData.amount +
          +uncomma(getValues('amount')),
      }),
    );
  };

  const radioToggle = (isSelected: boolean, username: string) => {
    const temp = [...selectedList];
    if (isSelected) {
      temp.splice(selectedList.indexOf(username), 1);
      setSelectedList(temp);
    } else {
      setSelectedList([...temp, username]);
    }
  };

  const isValid =
    Boolean(watch('paymentName')) &&
    Boolean(watch('amount')) &&
    payer.length !== 0 &&
    selectedList.length !== 0;

  useEffect(() => {
    isModify &&
      (setValue('paymentName', paymentData.name),
      setValue('amount', paymentData.amount),
      setPayer(paymentData.payer),
      setSelectedList(paymentData.participants));
  }, []);

  return (
    <>
      <PayerSelectModal
        selectedGorup={selectedGorup}
        payer={payer}
        setPayer={setPayer}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <ScreenLayout>
        <Padding padding={26}>
          <TitleText fontSize={28}>{selectedGorup?.name}</TitleText>
          <SizedBox height={15} />
          <FatDescription fontSize={18}>
            {selectedGorup?.date +
              '   /   ' +
              `${selectedGorup?.participants?.length}???`}
          </FatDescription>
        </Padding>
        <Box height={280}>
          <Padding padding={26}>
            <TitleText fontSize={22}>?????? ????????? ??????????????????.</TitleText>
            <SizedBox height={10} />
            <UnderLineInput
              maxLength={13}
              placeholder="???????????? ????????? ??????????????????."
              keyboardType="name-phone-pad"
              value={watch('paymentName')}
              onChangeText={(text: string) => setValue('paymentName', text)}
            />
            <SizedBox height={10} />
            <TouchableOpacity
              onPress={() => {
                setIsVisible(true);
              }}>
              <FakeUnderLineInput>
                {payer ? (
                  <SubTitle fontSize={16}>{payer}</SubTitle>
                ) : (
                  <Placeholder>???????????? ??????????????????.</Placeholder>
                )}
              </FakeUnderLineInput>
            </TouchableOpacity>
            <SizedBox height={10} />
            <UnderLineInput
              placeholder="?????? ????????? ??????????????????."
              value={insertComma(watch('amount'))}
              keyboardType="numeric"
              onChangeText={(text: string) => setValue('amount', text)}
            />
          </Padding>
        </Box>
        <Padding padding={26}>
          <Row
            style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <SubTitle fontSize={20}>???????????? ??????????????????.</SubTitle>
            <Description fontSize={12}>
              {selectedList?.length}??? / {selectedGorup?.participants?.length}???
            </Description>
          </Row>
          <SizedBox height={10} />
          <Separator marginVertical={20} />
          {selectedGorup?.participants?.map((participant, index) => {
            const isSelected = selectedList.includes(participant);
            return (
              <React.Fragment key={index}>
                <RadioSelector
                  onPress={() => radioToggle(isSelected, participant)}
                  isSelected={isSelected}
                  name={participant}
                />
                <SizedBox height={20} />
              </React.Fragment>
            );
          })}
        </Padding>
        <SizedBox height={100} />
      </ScreenLayout>
      <MainButton
        disabled={!isValid}
        onPress={() => {
          const paymentId = uuid.v4() as string;

          if (id) {
            const groupId = id.toString();
            isModify ? modifyPayment() : makeNewPayment(groupId, paymentId);
            goBack();
          }
        }}
        text={isModify ? '????????????' : '????????????'}
      />
    </>
  );
};
export default ModifyPaymentScreen;
