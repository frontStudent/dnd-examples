import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container as C3 } from "./Examples/Comprehensive/Container";
import { Container as C1 } from "./Examples/DropAndMove/Container";
import { Container as C2 } from "./Examples/SortableAndMove/Container";

function App() {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <h2>Drop & Move</h2>
        <h3>
          对官方文档上提供的Drag Around例子进行了拓展
          实现从左侧物料区中拖拽元素到Drop区域中，并可以四处拖动
        </h3>
        <C1 />
        <h2>Sort & Move</h2>
        <h3>
          对官方文档上提供的Sortable例子进行了拓展
          实现从一个物料区中拖拽元素到单个列表项的内部，并可以在列表项内部四处拖动
          当你拖拽列表项时，将带动其内部的所有元素
        </h3>
        <C2 />
        <h2>Sort & Move & Resize</h2>
        <h3>
          这个例子将展现如何把一些主流的拖拽库集成到一起从而高效完成更复杂的效果
          <li>从物料区拖到Drop区域使用react-dnd来实现</li>
          <li>拖拽排序使用react-sortablejs实现</li>
          <li>在列表项内部拖动使用react-rnd实现</li>
        </h3>
        <C3 />
      </DndProvider>
    </div>
  );
}

export default App;
