import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import { StyledBox } from "./StyledBox.js";
import { MoveBox } from "./MoveBox.js";
import { Rnd } from "react-rnd";
const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  height: 120,
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
  position: "relative",
};
export const Card = ({ id, text, index, childList, moveCard, updateCard }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: [ItemTypes.CARD, ItemTypes.BOX, ItemTypes.MOVE_BOX],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop(item, monitor) {
      const clientOffset = monitor.getSourceClientOffset();
      const dropOffset = ref.current.getBoundingClientRect();
      const left = clientOffset.x - dropOffset.x;
      const top = clientOffset.y - dropOffset.y;

      const newItem = { ...item, left, top };

      const type = monitor.getItemType();
      switch (type) {
        case ItemTypes.BOX:
          updateCard(id, newItem, "add");
          return;
        case ItemTypes.MOVE_BOX:
          updateCard(id, newItem, "update");
          return;
        default:
          return;
      }
    },
    hover(item, monitor) {
      if (!ref.current || monitor.getItemType() !== ItemTypes.CARD) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      {/* <div ref={drag}>handler</div> */}
      <span>{text}</span>
      {childList?.map(({ id, title, left, top }) => (
        <MoveBox
          key={id}
          id={id}
          style={{ position: "absolute", left, top }}
          title={title}
        ></MoveBox>
        // <Rnd
        //   default={{ x: left, y: top }}
        //   bounds={'parent'}
        //   style={{
        //     border: "1px dashed gray",
        //     padding: "0.5rem 1rem",
        //     cursor: "move",
        //     width: "150px",
        //   }}
        // >
        //   {title}
        // </Rnd>
      ))}
    </div>
  );
};
