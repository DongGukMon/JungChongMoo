import styled from '@emotion/native';

import {useDispatch, useSelector} from 'react-redux';
import {
  selectedGroupSelector,
  removeGroup,
  editGroup,
  removePaymentFromList,
} from '../../redux/slice/gorupsSlice';
import {modifyGroupRemoveData} from '../../redux/slice/groupRemoveSlice';
import {modifyPaymentRemoveData} from '../../redux/slice/paymentRemoveSlice';
import {
  removePayment,
  selectedPaymentSelector,
} from '../../redux/slice/paymentSlice';
import {RootState} from '../../redux/store';
import {GroupTypes} from '../../types/shared/group';
import {
  Button,
  ButtonText,
  Description,
  Padding,
  SizedBox,
  TitleText,
} from './Common';
import ModalLayout from './ModalLayout';

const ModalContentContainer = styled.View`
  height: 250px;
  width: 85%;
  background-color: ${props => props.theme.colors.main};
  border-radius: 10px;
`;

const RemoveModal = ({type}: {type: 'group' | 'payment'}) => {
  const dispatch = useDispatch();

  const modalData = useSelector((state: RootState) =>
    type === 'group' ? state.groupRemoveData : state.paymentRemoveData,
  );

  const selectedGroup = useSelector((state: RootState) =>
    selectedGroupSelector(state, modalData.id),
  );

  const selectedPayment = useSelector((state: RootState) =>
    selectedPaymentSelector(state, modalData.id),
  );

  const setIsVisible =
    type === 'group'
      ? (status: boolean) => {
          dispatch(modifyGroupRemoveData({isVisible: status, id: ''}));
        }
      : (status: boolean) => {
          dispatch(modifyPaymentRemoveData({isVisible: status, id: ''}));
        };

  const removeData =
    type === 'group'
      ? () => {
          selectedGroup?.payments?.map((paymentId: string) =>
            dispatch(removePayment(paymentId)),
          );
          dispatch(removeGroup(modalData.id));
        }
      : () => {
          dispatch(
            removePaymentFromList({
              paymentId: modalData.id,
              groupId: modalData.groupId,
              amount: Number(selectedPayment.amount),
            }),
          );
          dispatch(removePayment(modalData.id));
        };

  return (
    <ModalLayout isVisible={modalData.isVisible} setIsVisible={setIsVisible}>
      <ModalContentContainer>
        <Padding padding={16} style={{flex: 1}}>
          <SizedBox height={10} />
          <TitleText fontSize={24}>삭제할까요?</TitleText>
          <SizedBox height={30} />
          <Description fontSize={18}>
            삭제하면 복구할 수 없습니다. 정말 삭제하시겠습니까?
          </Description>
          <Button
            onPress={() => {
              removeData();
              setIsVisible(false);
            }}
            style={{position: 'absolute', bottom: 16, alignSelf: 'center'}}>
            <ButtonText>삭제</ButtonText>
          </Button>
        </Padding>
      </ModalContentContainer>
    </ModalLayout>
  );
};

export default RemoveModal;
