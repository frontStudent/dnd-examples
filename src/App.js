import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container as C1 } from "./Examples/DropAndMove/Container";

import { Container as C2} from "./Examples/SortableAndMove/Container";

function App() {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <h2>Drop and Move</h2>
        <h3>
          对官方文档上提供的Drag Around例子进行了拓展
          实现从左侧物料区中拖拽元素到Drop区域中，并可以四处拖动
        </h3>
        <C1 />
        <h2>Sort and Move</h2>
        <h3>
          对官方文档上提供的Sortable例子进行了拓展
          实现从一个物料区中拖拽元素到单个列表项的内部，并可以在列表项内部四处拖动
          当你拖拽列表项时，将带动其内部的所有元素
        </h3>
        <C2 />
      </DndProvider>
    </div>
  );
}

export default App;