import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Item = ({ id, name, cost, value, numOwned, handleClick, index }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!index) {
      ref.current.focus();
    }
  }, [index]);

  return (
    <Div
      ref={ref}
      onClick={() => {
        handleClick(id, cost);
      }}
    >
      <TextArea>
        <ItemName>{name}</ItemName>
        <ItemInfo>
          Cost: {cost} cookies. Produces: {value} cookie(s)/second.
        </ItemInfo>
      </TextArea>
      <ItemCount>{numOwned}</ItemCount>
    </Div>
  );
};

const Div = styled.button`
  all: unset;
  border-bottom: 1px solid white;
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  min-width: 460px;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    box-shadow: 0px 0px 10px 5px #4fffe0;
  }
`;

const TextArea = styled.div``;

const ItemName = styled.p`
  font-weight: bold;
  font-size: 18px;
  color: white;
`;

const ItemInfo = styled.p`
  margin-bottom: 10px;
`;

const ItemCount = styled.p`
  font-size: 30px;
`;

export default Item;
