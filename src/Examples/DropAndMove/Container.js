import { useState } from "react";
import { useDrop } from "react-dnd";
import DragArea from "@Common/DragArea";
import MoveBox from "@Common/MoveBox";
import { ItemTypes } from "@Common/ItemTypes";

const styles = {
  width: 300,
  height: 300,
  border: "1px solid black",
  marginLeft: 30,
};
export const Container = () => {
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
    <div style={{ display: 'flex' }}>
      <DragArea />
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
