import React, {useState} from 'react';
import RadioSelector from '../components/shared/RadioSelector';
import {
  Box,
  Button,
  ButtonText,
  Description,
  FatDescription,
  Padding,
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
import {addPayment, selectedGroupSelector} from '../redux/slice/gorupsSlice';
import {
  NavigationHelpersContext,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {makePayment} from '../redux/slice/paymentSlice';
import {useForm} from 'react-hook-form';
import uuid from 'react-native-uuid';

const FakeUnderLineInput = styled.View`
  height: 56px;
  width: 100%;
  font-size: 16px;
  border-color: ${(props: Pick<StylePropTypes, 'theme'>) =>
    props.theme.colors.text};
  border-bottom-width: 1px;
  justify-content: center;
`;

const Placeholder = styled.Text`
  font-size: 16px;
  color: #c5c5c9;
`;

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
          <TitleText fontSize={24}> 결제자를 선택해주세요.</TitleText>
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
            <ButtonText>완료</ButtonText>
          </Button>
        </Padding>
      </ModalContentContainer>
    </ModalLayout>
  );
};

const ModifyPaymentScreen = () => {
  const {params: id} = useRoute();
  const {goBack} = useNavigation();

  const dispatch = useDispatch();

  const selectedGorup: GroupTypes = useSelector((state: RootState) =>
    selectedGroupSelector(state, id ? id : ''),
  );

  const [isVisible, setIsVisible] = useState(false);
  const [payer, setPayer] = useState('');
  const [selectedList, setSelectedList] = useState(selectedGorup?.participants);

  const {getValues, setValue, watch} = useForm();

  const makeNewPaymet = (groupId: string, paymentId: string) => {
    dispatch(
      makePayment({
        id: paymentId,
        name: getValues('paymentName'),
        payer,
        amount: getValues('amount'),
        participants: selectedList,
        dateNow: Date.now(),
      }),
    );
    dispatch(
      addPayment({
        paymentId,
        groupId,
        amount: Number(getValues('amount')),
      }),
    );
    setValue('paymentName', '');
    setValue('amount', '');
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
              `${selectedGorup?.participants?.length}명`}
          </FatDescription>
        </Padding>
        <Box height={280}>
          <Padding padding={26}>
            <TitleText fontSize={22}>결제 정보를 입력해주세요.</TitleText>
            <SizedBox height={10} />
            <UnderLineInput
              placeholder="결제건의 이름을 입력해주세요."
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
                  <Placeholder>결제자를 선택해주세요.</Placeholder>
                )}
              </FakeUnderLineInput>
            </TouchableOpacity>
            <SizedBox height={10} />
            <UnderLineInput
              placeholder="결제 금액을 입력해주세요."
              value={watch('amount')}
              onChangeText={(text: string) => setValue('amount', text)}
            />
          </Padding>
        </Box>
        <Padding padding={26}>
          <Row
            style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <SubTitle fontSize={20}>참여자를 선택해주세요.</SubTitle>
            <Description fontSize={12}>
              {selectedList?.length}명 / {selectedGorup?.participants?.length}명
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
        onPress={() => {
          const paymentId = uuid.v4() as string;
          if (id) {
            const groupId = id.toString();
            makeNewPaymet(groupId, paymentId);
            goBack();
          }
        }}
        text="등록하기"
      />
    </>
  );
};
export default ModifyPaymentScreen;
