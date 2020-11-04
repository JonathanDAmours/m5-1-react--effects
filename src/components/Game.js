import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";
import useKeydown from "../hooks/useKeydown.hook";
import useDocumentTitle from "../hooks/useDocumentTitle.hook";
import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  const [numCookies, setNumCookies] = useState(100);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  const calculateCookiesPerTick = (obj) => {
    let total = 0;
    items.forEach((item) => {
      switch (item.id) {
        case "cursor":
          total = total + purchasedItems.cursor;
          break;
        case "grandma":
          total = total + purchasedItems.grandma * 10;
          break;
        case "farm":
          total = total + purchasedItems.farm * 80;
          break;
        default:
          total = 0;
      }
    });
    return total;
  };

  useInterval(() => {
    const numberOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numberOfGeneratedCookies);
  }, 1000);

  const handleClickItems = (id, cost) => {
    if (numCookies < cost) {
      window.alert("Not enough cookies to get this item.");
      return;
    } else {
      setNumCookies(numCookies - cost);
      setPurchasedItems({ ...purchasedItems, [id]: purchasedItems[id] + 1 });
    }
  };

  const handleClickButton = (ev) => {
    setNumCookies(numCookies + 1);
  };

  useDocumentTitle(
    `${numCookies} cookies - Cookie Clicker Workshop`,
    "Cookie Clicker Workshop"
  );

  useKeydown("Space", handleClickButton);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{calculateCookiesPerTick()}</strong> cookies per second
        </Indicator>
        <Button onClick={handleClickButton}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => {
          const { id, name, value, cost } = item;
          return (
            <Item
              index={index}
              numOwned={purchasedItems[id]}
              key={id}
              id={id}
              name={name}
              value={value}
              cost={cost}
              handleClick={handleClickItems}
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
export { items };
