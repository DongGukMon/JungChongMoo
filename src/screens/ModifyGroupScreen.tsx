import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  Box,
  BoxInput,
  Description,
  FakeUnderLineInput,
  Padding,
  Placeholder,
  Row,
  Separator,
  SizedBox,
  SubTitle,
  TitleText,
  UnderLineInput,
} from '../components/shared/Common';
import MainButton from '../components/shared/MainButton';
import {useForm} from 'react-hook-form';
import ScreenLayout from '../components/shared/ScreenLayout';
import {useDispatch} from 'react-redux';
import {editGroup, makeGorup} from '../redux/slice/gorupsSlice';
import uuid from 'react-native-uuid';
import AlertModal from '../components/shared/AlertModal';
import CalendalModal from '../components/gruopScreen/CalendalModal';
import {GroupTypes} from '../types/shared/group';
import {PaymentTypes} from '../types/shared/payment';

type ParamList = {
  modifyProps: {
    selectedGroup: GroupTypes;
    payments: PaymentTypes[];
  };
};

const ModifyGroupScreen = () => {
  const {params} = useRoute<RouteProp<ParamList, 'modifyProps'>>();

  const selectedGroup = params?.selectedGroup;
  const payments = params?.payments;

  const isModify = Boolean(selectedGroup);

  const {watch, getValues, setValue} = useForm();

  const [participants, setParticipants] = useState<string[]>(
    isModify ? selectedGroup.participants : [],
  );
  const [date, setDate] = useState(isModify ? selectedGroup.date : '');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [alertModalData, setAlertModalData] = useState({title: '', body: ''});

  const dispatch = useDispatch();

  const makeNewGroup = (id: string) => {
    dispatch(
      makeGorup({
        id,
        name: getValues('groupName'),
        date,
        participants: participants.filter(item => item.length !== 0),
        payments: [],
        totalPayments: 0,
        dateNow: Date.now(),
      }),
    );
  };

  const isPayerRemoved = () => {
    let isRemoved = false;
    payments.map(
      payment =>
        !participants.includes(payment.payer) &&
        (setIsVisible(true), (isRemoved = true)),
    );
    return isRemoved;
  };

  const isParticipantRemoved = () => {
    let isRemoved = false;
    let paymentParticipnats: string[] = [];
    payments.map(
      payment =>
        (paymentParticipnats = [
          ...paymentParticipnats,
          ...payment.participants,
        ]),
    );
    const set = new Set(paymentParticipnats);
    const uniqueParticipants = [...set];
    uniqueParticipants.map(participnat => {
      !participants.includes(participnat) && (isRemoved = true);
    });
    return isRemoved;
  };

  const modifyGroup = (id: string) => {
    dispatch(
      editGroup({
        id,
        name: getValues('groupName'),
        date,
        participants: participants.filter(item => item.length !== 0),
        payments: selectedGroup.payments,
        totalPayments: selectedGroup.totalPayments,
        dateNow: selectedGroup.dateNow,
      }),
    );
  };

  const {navigate, goBack} = useNavigation();
  const goToGroupDetail = useCallback((id: string) => {
    goBack();
    navigate('GroupDetail' as never, id as never);
  }, []);

  const isValid =
    Boolean(watch('groupName')) &&
    Boolean(date) &&
    participants.filter(item => item.length !== 0).length !== 0;

  useEffect(() => {
    isModify && setValue('groupName', selectedGroup.name);
  }, []);

  return (
    <>
      <ScreenLayout>
        <Padding padding={26}>
          <TitleText fontSize={28}>
            {isModify ? '그룹 정보 수정하기' : '새로운 정산 만들기'}
          </TitleText>
        </Padding>
        <Box height={220}>
          <Padding padding={26}>
            <TitleText fontSize={22}>어떤 모임인가요?</TitleText>
            <SizedBox height={10} />
            <UnderLineInput
              maxLength={13}
              placeholder="모임명을 입력해주세요."
              value={watch('groupName')}
              onChangeText={(text: string) => {
                setValue('groupName', text);
              }}
            />
            <SizedBox height={10} />
            <TouchableOpacity
              onPress={() => {
                setDatePickerVisible(true);
              }}>
              <FakeUnderLineInput>
                {date ? (
                  <SubTitle fontSize={16}>{date}</SubTitle>
                ) : (
                  <Placeholder>날짜를 입력해주세요.</Placeholder>
                )}
              </FakeUnderLineInput>
            </TouchableOpacity>
          </Padding>
        </Box>
        <Padding padding={26}>
          <SubTitle fontSize={20}>참여자를 입력해주세요.</SubTitle>
          <SizedBox height={10} />
          <Row
            style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <Description fontSize={12}>
              입력란은 자동으로 추가됩니다.
            </Description>
            <Description fontSize={12}>
              현재 {participants.length}명
            </Description>
          </Row>
          <Separator marginVertical={20} />
          {Array.from({length: participants.length + 1}).map((_, index) => {
            return (
              <BoxInput
                maxLength={6}
                isEmpty={!Boolean(participants[index])}
                key={index}
                style={{marginBottom: 10}}
                placeholder="이름을 입력해주세요."
                value={participants[index]}
                onChangeText={(text: string) => {
                  participants[index] = text;
                  setParticipants([...participants]);
                }}
              />
            );
          })}
        </Padding>
        <AlertModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          title={alertModalData.title}
          body={alertModalData.body}
        />
        <CalendalModal
          isVisible={datePickerVisible}
          setIsVisible={setDatePickerVisible}
          setDate={setDate}
        />
      </ScreenLayout>

      <MainButton
        disabled={!isValid}
        onPress={() => {
          if (isModify) {
            if (isPayerRemoved()) {
              setAlertModalData({
                title: '참여자를 다시 확인해주세요.',
                body: '각 결제건의 결제자는 참여자 목록에서 삭제할 수 없어요.',
              });
              setIsVisible(true);
              return;
            } else if (isParticipantRemoved()) {
              setAlertModalData({
                title: '참여자를 다시 확인해주세요.',
                body: '각 결제건의 결제 참여자는 참여자 목록에서 삭제할 수 없어요.',
              });
              setIsVisible(true);
              return;
            }
          }
          const id = uuid.v4() as string;
          isModify ? modifyGroup(selectedGroup.id) : makeNewGroup(id);
          goToGroupDetail(isModify ? selectedGroup.id : id);
        }}
        text={isModify ? '수정완료' : '다음'}
      />
    </>
  );
};

export default ModifyGroupScreen;
