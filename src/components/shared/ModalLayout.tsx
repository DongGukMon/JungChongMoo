import styled from '@emotion/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

interface ModalLayoutProps {
  children: React.ReactNode;
  isVisible: boolean;
  setIsVisible: Function;
}

const OutOfContent = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalLayout = ({children, isVisible, setIsVisible}: ModalLayoutProps) => {
  return (
    <Modal visible={isVisible} transparent={true}>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.25)'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}>
        <OutOfContent onPress={() => setIsVisible(false)}>
          <TouchableWithoutFeedback onPress={() => {}}>
            {children}
          </TouchableWithoutFeedback>
        </OutOfContent>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalLayout;
