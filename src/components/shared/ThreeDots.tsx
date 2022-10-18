import styled from '@emotion/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {modifyGroupRemoveData} from '../../redux/slice/groupRemoveSlice';
import {modifyPaymentRemoveData} from '../../redux/slice/paymentRemoveSlice';

interface ThreeDotsPropTypes {
  type: 'group' | 'payment';
  id: string;
}

const DotsContainer = styled.TouchableOpacity`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
`;

const ThreeDots = ({type, id}: ThreeDotsPropTypes) => {
  const dispatch = useDispatch();
  const onPress =
    type === 'group'
      ? () => {
          dispatch(modifyGroupRemoveData({isVisible: true, id}));
        }
      : () => {
          dispatch(modifyPaymentRemoveData({isVisible: true, id}));
        };
  return (
    <DotsContainer onPress={onPress}>
      <Icon name="ellipsis-horizontal" size={28} />
    </DotsContainer>
  );
};

export default ThreeDots;
