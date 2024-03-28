import PizzaMenu from "./components/PizzaMenu/PizzaMenu";
import ContextProvider from "./components/Context/ContextProvider";

import "./App.css";
function App() {
  return (
    <div className="App">
      <main>
        <ContextProvider>
          <PizzaMenu />
        </ContextProvider>
      </main>
    </div>
  );
}

export default App;
