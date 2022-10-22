import React from 'react';
import {ResultObjTpyes} from '../../utils/calculate';
import insertComma from '../../utils/insertComma';
import {
  Card,
  Description,
  FatDescription,
  Padding,
  Row,
  Separator,
  SizedBox,
  SubTitle,
  TitleText,
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
  console.log(data);
  return (
    <Card>
      <SizedBox height={10} />
      <Padding padding={16}>
        <Row style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <SubTitle fontSize={22}>{name}에게 입금해주세요</SubTitle>
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
                  : '제가 통크게 쏩니다'
              }
              amount={data.extra.amount}
            />
            <SizedBox height={15} />
          </>
        )}
      </Padding>
    </Card>
  );
};

export default ResultCard;
