import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "./Examples/Sortable/Container";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Container hideSourceOnDrag={true}/>
      </DndProvider>
    </div>
  );
}

export default App;