import styled from '@emotion/native';
import {
  Button,
  ButtonText,
  Description,
  Padding,
  SizedBox,
  TitleText,
} from './Common';
import ModalLayout from './ModalLayout';

interface AlertModalPropTypes {
  isVisible: boolean;
  setIsVisible: (arg0: boolean) => void;
  title: string;
  body: string;
}

const ModalContentContainer = styled.View`
  height: 250px;
  width: 85%;
  background-color: ${props => props.theme.colors.main};
  border-radius: 10px;
`;

const AlertModal = ({
  isVisible,
  setIsVisible,
  title,
  body,
}: AlertModalPropTypes) => {
  return (
    <ModalLayout isVisible={isVisible} setIsVisible={setIsVisible}>
      <ModalContentContainer>
        <Padding padding={16} style={{flex: 1}}>
          <SizedBox height={10} />
          <TitleText fontSize={24}>{title}</TitleText>
          <SizedBox height={30} />
          <Description fontSize={18}>{body}</Description>
          <Button
            onPress={() => {
              setIsVisible(false);
            }}
            style={{position: 'absolute', bottom: 16, alignSelf: 'center'}}>
            <ButtonText>확인</ButtonText>
          </Button>
        </Padding>
      </ModalContentContainer>
    </ModalLayout>
  );
};
export default AlertModal;
