import './App.css';
import PathfindingVisualizer from './components/PathfindingVisualizer/PathfindingVisualizer';
import UI from './components/UI/UI';

function App() {
  return (
    <div className="App-header">
      <UI />
      <PathfindingVisualizer />
    </div>
  );
}

export default App;
