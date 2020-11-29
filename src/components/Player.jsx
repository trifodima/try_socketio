import React from 'react';
import styled from 'styled-components';
import {initialState, reducer} from '../reducer';

const Wrapper = styled.div`
  display: flex;
  margin: 0 15px;
  &:nth-child(2n-1) {
    justify-content: flex-end;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 220px;
  height: 400px;
  border: 1px solid #f09;
`;

const Hp = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 50%;
  height: 50%;
  background-color: #7F0F0C;
  color: #fff;
`;
const HpDamage = styled.div.attrs((props) => {
  return {
    style: {
      height: props.height || 0
    }
  }
})`
  width: 100%;
  background-color: #008209;
`;
const HpText = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding-bottom: 15px;
`;
const Name = styled.div`
  font-family: Helvetica;
  font-style: italic; 
  font-weight: bold;
  font-size: 22px;
  text-align: center;
  margin: -20px 0 10px;
`;
const Player = ({item}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Wrapper>
      <Box>
        <Name>{item.name}</Name>
        <Hp>
          <HpDamage height={`${item.hp}%`} />
        </Hp>
        <HpText>{`${item.hp}%`}</HpText>
      </Box>
    </Wrapper>
  );
};

export default Player;
