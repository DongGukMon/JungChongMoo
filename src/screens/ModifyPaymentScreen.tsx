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
import {Dimensions, ScrollView} from 'react-native';
import MainButton from '../components/shared/MainButton';
import ScreenLayout from '../components/shared/ScreenLayout';

const {height} = Dimensions.get('screen');

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
}

const PayerSelectModal = ({isVisible, setIsVisible}: ModalPropTypes) => {
  return (
    <ModalLayout isVisible={isVisible} setIsVisible={setIsVisible}>
      <ModalContentContainer>
        <Padding padding={16} style={{flex: 1}}>
          <SizedBox height={10} />
          <TitleText fontSize={24}> 결제자를 선택해주세요.</TitleText>
          <Separator marginVertical={15} />
          <ScrollView style={{flex: 1}}>
            {Array.from({length: 15}).map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <RadioSelector isSelected={true} />
                  <SizedBox height={10} />
                </React.Fragment>
              );
            })}
          </ScrollView>
          <SizedBox height={10} />
          <Button>
            <ButtonText>완료</ButtonText>
          </Button>
        </Padding>
      </ModalContentContainer>
    </ModalLayout>
  );
};

const ModifyPaymentScreen = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <PayerSelectModal isVisible={isVisible} setIsVisible={setIsVisible} />
      <ScreenLayout>
        <Padding padding={26}>
          <TitleText fontSize={28}>이묵돌 독서모임</TitleText>
          <SizedBox height={15} />
          <FatDescription fontSize={18}>
            {`2022.10.14` + '   /   ' + `11명`}
          </FatDescription>
        </Padding>
        <Box height={280}>
          <Padding padding={26}>
            <TitleText fontSize={22}>결제 정보를 입력해주세요.</TitleText>
            <SizedBox height={10} />
            <UnderLineInput placeholder="결제건의 이름을 입력해주세요." />
            <SizedBox height={10} />
            <TouchableOpacity
              onPress={() => {
                setIsVisible(true);
              }}>
              <FakeUnderLineInput>
                <Placeholder>결제자를 선택해주세요.</Placeholder>
              </FakeUnderLineInput>
            </TouchableOpacity>
            <SizedBox height={10} />
            <UnderLineInput placeholder="결제 금액을 입력해주세요." />
          </Padding>
        </Box>
        <Padding padding={26}>
          <Row
            style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <SubTitle fontSize={20}>참여자를 선택해주세요.</SubTitle>
            <Description fontSize={12}>3명 / 11명</Description>
          </Row>
          <SizedBox height={10} />
          <Separator marginVertical={20} />
          {Array.from({length: 5}).map((item, index) => {
            return (
              <React.Fragment key={index}>
                <RadioSelector isSelected={true} />
                <SizedBox height={20} />
              </React.Fragment>
            );
          })}
        </Padding>
        <SizedBox height={100} />
      </ScreenLayout>
      <MainButton onPress={() => {}} text="등록하기" />
    </>
  );
};
export default ModifyPaymentScreen;
