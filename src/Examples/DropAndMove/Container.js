import { useState } from "react";
import { useDrop } from "react-dnd";
import { StyledBox } from "./StyledBox.js";
import { DragBox } from "../Common/DragBox.js";
import { MoveBox } from "../Common/MoveBox.js";
import { ItemTypes } from "../Common/ItemTypes.js";

import "./index.css";
const styles = {
  width: 300,
  height: 300,
  border: "1px solid black",
  // position: "relative",
};
export const Container = () => {
  const [boxes, setBoxes] = useState([
    { id: "1", title: "Drag me around" },
    { id: "2", title: "Drag me too" },
  ]);
  const [moveBoxes, setMoveBoxes] = useState([]);

  const [, drop] = useDrop(
    () => ({
      accept: [ItemTypes.BOX, ItemTypes.MOVE_BOX],
      drop(item, monitor) {
        const clientOffset = monitor.getSourceClientOffset();

        // 开始拖的时候，鼠标点下去的位置
        console.log(monitor.getInitialClientOffset(), "initialClientOffset");

        // 被拖拽元素的原始位置
        console.log(
          monitor.getInitialSourceClientOffset(),
          "initialSourceClientOffset"
        );

        // 按着拖拽时最后一次的鼠标位置，在这里拿到的就是drop时鼠标的位置
        console.log(monitor.getClientOffset(), "clientOffset");

        // 拖拽开始和结束时鼠标的位置差
        console.log(
          monitor.getDifferenceFromInitialOffset(),
          "differenceFromInitialOffset"
        );

        // 按着拖拽时最后一次的元素位置，在这里拿到的就是drop时元素的位置
        console.log(monitor.getSourceClientOffset(), "sourceClientOffset");

        const left = clientOffset.x;
        const top = clientOffset.y;

        const type = monitor.getItemType();
        switch (type) {
          case ItemTypes.BOX:
            setMoveBoxes((prevState) => [
              ...prevState,
              { id: new Date().getTime(), title: item.title, left, top },
            ]);
            return;
          case ItemTypes.MOVE_BOX:
            const id = monitor.getItem()?.id;
            const _moveBoxes = moveBoxes.map((box) =>
              box?.id === id ? { ...box, left, top } : box
            );
            setMoveBoxes(_moveBoxes);
            return;
          default:
            return;
        }
      },
    }),
    [moveBoxes, setMoveBoxes]
  );
  return (
    <div style={{ margin: "20px 30px" }}>
      <div style={{ width: 300, height: 150, border: "1px solid black", padding:'10px' }}>
        {boxes.map(({ id, title }) => {
          return <DragBox key={id} id={id} title={title}></DragBox>;
        })}
      </div>
      <div ref={drop} style={styles}>
        {moveBoxes.map(({ id, title, top, left }) => {
          return (
            <MoveBox
              key={id}
              id={id}
              title={title}
              style={{ position: "absolute", top, left }}
            ></MoveBox>
          );
        })}
      </div>
    </div>
  );
};
