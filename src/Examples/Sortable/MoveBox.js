import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import { StyledBox } from "./StyledBox.js";

export const MoveBox = ({ id, title, style }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.MOVE_BOX,
      item: { id, title },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id]
  );
  if (isDragging && true) return <div ref={drag} />;
  return (
    <StyledBox ref={drag} style={style}>
      {title}
    </StyledBox>
  );
};
