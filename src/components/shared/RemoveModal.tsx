import styled from '@emotion/native';

import {useDispatch, useSelector} from 'react-redux';
import {
  selectedGroupSelector,
  removeGroup,
} from '../../redux/slice/gorupsSlice';
import {modifyGroupRemoveData} from '../../redux/slice/groupRemoveSlice';
import {modifyPaymentRemoveData} from '../../redux/slice/paymentRemoveSlice';
import {removePayment} from '../../redux/slice/paymentSlice';
import {RootState} from '../../redux/store';
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
          //invalid hook call 문제 해결해야함.
          //group만 삭제해버리면 payments들이 계속 남아있게 되기 때문에 group삭제할 때 paymnet 삭제해야함
          //그냥 allRemove reducer를 만드는게 나을 듯.
          //   const paymentsList = useSelector((state: RootState) =>
          //     selectedGroupSelector(state, modalData.id),
          //   );
          //   paymentsList.map((paymentId: string) =>
          //     dispatch(removePayment(paymentId)),
          //   );
          dispatch(removeGroup(modalData.id));
        }
      : () => dispatch(removePayment(modalData.id));

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
