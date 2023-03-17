import React from 'react';
import {GameController} from "./components/GameContoller";
import {useApp} from "./hooks/useApp";

function App() {
  const isClientSide = useApp();
  return (
    <div className="App">
      {isClientSide && <GameController />}
    </div>
  );
}

export default App;
