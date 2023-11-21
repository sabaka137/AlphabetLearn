import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  position: absolute;
  width: 200px;
  font-size: 13px;

  background: white;
  box-shadow: 0 0.325rem 0.55rem #00000014;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 5px;
  top: -70px;
  left: 0;
`;
type Props = {};

function InfoModal({}: Props) {
  return (
    <Wrapper>
      <div>клик - чтобы выделить</div>
      <div>alt + клик - чтобы удалить</div>
      <div>ctrl + клик - чтобы добавить</div>
    </Wrapper>
  );
}

export default InfoModal;
