import React from 'react';
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

const ResultCard = () => {
  return (
    <Card>
      <SizedBox height={10} />
      <Padding padding={16}>
        <Row style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <SubTitle fontSize={22}>정총무에게 입금해주세요</SubTitle>
          <FatDescription fontSize={14}>84,000원</FatDescription>
        </Row>
        <Separator marginVertical={20} />
        {Array.from({length: 2}).map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Row
                style={{justifyContent: 'space-between', alignItems: 'center'}}>
                <SubTitle style={{fontWeight: '400'}} fontSize={20}>
                  유반장
                </SubTitle>
                <FatDescription fontSize={18}>14,000원</FatDescription>
              </Row>
              <SizedBox height={10} />
            </React.Fragment>
          );
        })}
      </Padding>
    </Card>
  );
};

export default ResultCard;
