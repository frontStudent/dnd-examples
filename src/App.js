import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container as C1 } from "./Examples/DropAndMove/Container";

import { Container as C2} from "./Examples/SortableAndMove/Container";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <C1 />
        <C2 />
      </DndProvider>
    </div>
  );
}

export default App;