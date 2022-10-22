import styled from '@emotion/native';
import ModalLayout from '../shared/ModalLayout';
import {Picker, DatePicker} from 'react-native-wheel-pick';
import {Button, ButtonText} from '../shared/Common';
import {useCallback} from 'react';

interface CalendalModalPropTypes {
  isVisible: boolean;
  setIsVisible: (arg0: boolean) => void;
  setDate: (arg0: string) => void;
}

const ModalContentContainer = styled.View`
  height: 350px;
  width: 85%;
  background-color: ${props => props.theme.colors.main};
  border-radius: 10px;

  align-items: center;
`;

const CalendalModal = ({
  isVisible,
  setIsVisible,
  setDate,
}: CalendalModalPropTypes) => {
  let selectedDate = new Date();

  const setGroupDate = useCallback((date: Date) => {
    return (
      date.getFullYear() +
      '.' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '.' +
      date.getDate().toString().padStart(2, '0')
    );
  }, []);

  return (
    <ModalLayout isVisible={isVisible} setIsVisible={setIsVisible}>
      <ModalContentContainer>
        <DatePicker
          style={{
            backgroundColor: 'white',
            width: 300,
            height: 230,
            marginTop: 26,
          }}
          onDateChange={date => {
            selectedDate = date;
          }}
        />
        <Button
          style={{
            width: '90%',
            position: 'absolute',
            bottom: 16,
            alignSelf: 'center',
          }}
          onPress={() => {
            setDate(setGroupDate(selectedDate));
            setIsVisible(false);
          }}>
          <ButtonText>완료</ButtonText>
        </Button>
      </ModalContentContainer>
    </ModalLayout>
  );
};
export default CalendalModal;
