import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import { StyledBox } from "./StyledBox.js";

const DragBox = ({ id, title }) => {
  const [, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, title },
      // collect: (monitor) => ({
      //   isDragging: monitor.isDragging(),
      // }),
    }),
    [id]
  );
  return (
    <StyledBox ref={drag}>
      {title}
    </StyledBox>
  );
};
export default DragBox;