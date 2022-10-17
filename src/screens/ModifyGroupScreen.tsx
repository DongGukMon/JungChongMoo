import {useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Text, TextInput} from 'react-native';
import {
  Box,
  BoxInput,
  Description,
  Padding,
  Row,
  ScreenContainer,
  Separator,
  SizedBox,
  SubTitle,
  TitleText,
  UnderLineInput,
} from '../components/shared/Common';
import MainButton from '../components/shared/MainButton';
import {useForm} from 'react-hook-form';

const ModifyGroupScreen = () => {
  const {watch, getValues, setValue} = useForm();
  const [participants, setParticipants] = useState<string[]>([]);

  let isValid = useRef(false);

  const {navigate} = useNavigation();
  const goToGroupDetail = useCallback(
    () => navigate('GroupDetail' as never),
    [],
  );

  const validateInput = (input: string, name: 'groupName' | 'date') => {
    const otherName = name === 'groupName' ? 'date' : 'groupName';
    if (input.length === 0) {
      isValid.current = false;
    } else if (Boolean(getValues(otherName)) && isValid.current === false) {
      isValid.current = true;
    }
    setValue(name, input);
  };

  return (
    <>
      <ScreenContainer>
        <Padding padding={26}>
          <TitleText fontSize={28}>새로운 정산 만들기</TitleText>
        </Padding>
        <Box height={220}>
          <Padding padding={26}>
            <TitleText fontSize={22}>어떤 모임인가요?</TitleText>
            <SizedBox height={10} />
            <UnderLineInput
              placeholder="모임명을 입력해주세요."
              value={watch('groupName')}
              onChangeText={(text: string) => {
                validateInput(text, 'groupName');
              }}
            />
            <SizedBox height={10} />
            <UnderLineInput
              placeholder="날짜를 입력해주세요."
              value={watch('date')}
              onChangeText={(text: string) => {
                validateInput(text, 'date');
              }}
            />
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
      </ScreenContainer>
      <MainButton
        disabled={!isValid.current}
        onPress={goToGroupDetail}
        text="다음"
      />
    </>
  );
};

export default ModifyGroupScreen;
