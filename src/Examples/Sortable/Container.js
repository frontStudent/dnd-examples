import update from "immutability-helper";
import { useCallback, useState } from "react";
import { Card } from "./Card.js";
import { DragBox } from "./DragBox.js";
const style = {
  width: 400,
  marginLeft: 30,
};
export const Container = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "Write a cool JS library",
      childList: [],
    },
    {
      id: 2,
      text: "Make it generic enough",
      childList: [],
    },
    {
      id: 3,
      text: "Write README",
      childList: [],
    },
    {
      id: 4,
      text: "Create some examples",
      childList: [],
    },
    {
      id: 5,
      text: "Spam in Twitter and IRC to promote it",
      childList: [],
    },
  ]);

  const [boxes, setBoxes] = useState([
    { id: "1", title: "Drag me around" },
    { id: "2", title: "Drag me too" },
  ]);

  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(150);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  const updateCard = useCallback((id, item, op) => {
    if (op === "add") {
      setCards((prevCards) =>
        prevCards.map((card) => {
          return card.id === id
            ? {
                ...card,
                childList: [
                  ...card.childList,
                  { ...item, id: new Date().getTime() },
                ],
              }
            : card;
        })
      );
      return;
    }
    setCards((prevCards) =>
      prevCards?.map((card) => {
        return card?.id === id
          ? {
              ...card,
              childList: card?.childList?.map((child) => {
                return child?.id === item?.id
                  ? { ...item, top: item?.top, left: item?.left }
                  : child;
              }),
            }
          : card;
      })
    );
  }, [cards, setCards]);

  const renderCard = useCallback((card, index) => {
    return (
      <Card
        key={card?.id}
        index={index}
        id={card?.id}
        text={card?.text}
        childList={card?.childList}
        moveCard={moveCard}
        updateCard={updateCard}
      />
    );
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "300px",
          height: "150px",
          border: "1px solid black",
        }}
      >
        {boxes.map(({ id, title }) => {
          return <DragBox key={id} id={id} title={title}></DragBox>;
        })}
      </div>
      <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
    </div>
  );
};
