import React from 'react';
import {Text} from 'react-native';

import insertComma from '../../utils/insertComma';
import {
  FatDescription,
  Padding,
  Row,
  Separator,
  SizedBox,
  SubTitle,
  ViewCard,
} from '../shared/Common';

interface ResultCardPropTypes {
  name: string;
  rawData: {[name: string]: number};
  data: {
    trades: {
      taker: string | number;
      giver: string | number;
      amount: string | number;
    }[];
    totalAmount: number;
    extra?: {
      type: 'plus' | 'minus';
      amount: number;
    };
  };
}

const TradeRow = ({giver, amount}: {giver: string; amount: number}) => {
  return (
    <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
      <SubTitle style={{fontWeight: '400'}} fontSize={20}>
        {giver}
      </SubTitle>
      <FatDescription fontSize={18}>{insertComma(amount)}원</FatDescription>
    </Row>
  );
};

const ResultCard = ({name, data, rawData}: ResultCardPropTypes) => {
  return (
    <ViewCard>
      <SizedBox height={10} />
      <Padding padding={16}>
        <Row style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <Row style={{alignItems: 'center'}}>
            <SubTitle fontSize={20} style={{fontWeight: '600'}}>
              {name}{' '}
              <Text style={{fontSize: 16, fontWeight: '300'}}>
                에게 입금해주세요.
              </Text>
            </SubTitle>
          </Row>
          <FatDescription fontSize={14}>
            {insertComma(rawData[name])}원
          </FatDescription>
        </Row>
        <Separator marginVertical={20} />
        {data.trades.map(trade => {
          return (
            <React.Fragment key={trade.giver}>
              <TradeRow
                giver={trade.giver.toString()}
                amount={Number(trade.amount)}
              />
              <SizedBox height={15} />
            </React.Fragment>
          );
        })}
        {data?.extra && (
          <>
            <TradeRow
              giver={
                data.extra.type === 'plus'
                  ? '감사히 잘 쓰겠습니다.'
                  : `${name}이(가) 쏩니다`
              }
              amount={data.extra.amount}
            />
            <SizedBox height={15} />
          </>
        )}
      </Padding>
    </ViewCard>
  );
};

export default ResultCard;
