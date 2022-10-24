import styled from '@emotion/native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Share, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {lightTheme} from '../../styles/theme';
import {StylePropTypes} from '../../types/shared/emotion';
import {
  BoxInput,
  Button,
  ButtonText,
  Description,
  Padding,
  Separator,
  SizedBox,
  SubTitle,
  TitleText,
  ViewCard,
} from '../shared/Common';
import ModalLayout from '../shared/ModalLayout';

interface ModalPropTypes {
  isVisible: boolean;
  setIsVisible: (arg0: boolean) => void;
  payers: string[];
  resultRef: any;
}

const ModalContentContainer = styled.View`
  height: ${(props: Pick<StylePropTypes, 'height'>) => props.height}px;
  width: 85%;
  background-color: ${props => props.theme.colors.main};
  border-radius: 10px;
`;

const ShareModal = ({
  isVisible,
  setIsVisible,
  payers,
  resultRef,
}: ModalPropTypes) => {
  const {height} = useWindowDimensions();

  const {getValues, setValue, watch, reset} = useForm();

  const shareResult = async (uri: string) => {
    const message = payers
      .map(payer => {
        const bank = getValues(`${payer}Bank`);
        const number = getValues(`${payer}Number`);
        if (!bank || !number) {
          return;
        }
        return `${payer}: ${bank}) ${number}`;
      })
      .filter(a => Boolean(a))
      .join('\n');

    const result = await Share.share({
      url: `file://${uri}`,
      title: '정산 결과를 친구와 공유해보세요.',
      message,
    });
    if (result.action === Share.sharedAction) {
      reset();
    }
  };

  return (
    <ModalLayout isVisible={isVisible} setIsVisible={setIsVisible}>
      <ModalContentContainer height={height * 0.7}>
        <Padding padding={16} style={{flex: 1}}>
          <SizedBox height={10} />
          <TitleText fontSize={24}> 정산 결과를 공유해보세요</TitleText>
          <Separator marginVertical={15} />
          <Description fontSize={16}>
            계좌정보를 입력하시면 함께 공유됩니다.(선택)
          </Description>
          <SizedBox height={20} />
          <ScrollView style={{flex: 1}}>
            {payers?.map(payer => {
              return (
                <React.Fragment key={payer}>
                  <ViewCard>
                    <Padding padding={16}>
                      <SubTitle fontSize={24}>{payer}</SubTitle>
                      <SizedBox height={10} />
                      <BoxInput
                        style={{
                          width: 100,
                          backgroundColor: lightTheme.colors.main,
                        }}
                        isEmpty={false}
                        value={watch(`${payer}Bank`)}
                        onChangeText={(text: string) =>
                          setValue(`${payer}Bank`, text)
                        }
                        placeholder="은행"
                      />
                      <SizedBox height={10} />
                      <BoxInput
                        style={{
                          width: '95%',
                          backgroundColor: lightTheme.colors.main,
                        }}
                        isEmpty={false}
                        value={watch(`${payer}Number`)}
                        onChangeText={(text: string) =>
                          setValue(`${payer}Number`, text)
                        }
                        placeholder="계좌번호"
                      />
                      <SizedBox height={20} />
                    </Padding>
                  </ViewCard>
                </React.Fragment>
              );
            })}
          </ScrollView>
          <SizedBox height={10} />
          <Button
            onPress={() => {
              setIsVisible(false);
              resultRef.current &&
                resultRef.current
                  .capture()
                  .then((uri: string) => shareResult(uri));
            }}>
            <ButtonText>공유하기</ButtonText>
          </Button>
        </Padding>
      </ModalContentContainer>
    </ModalLayout>
  );
};

export default ShareModal;
