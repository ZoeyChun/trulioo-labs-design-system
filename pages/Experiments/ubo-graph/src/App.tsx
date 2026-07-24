import { Investigation } from './pages/Investigation';
import { useThemeSync } from './hooks/useThemeSync';

function App() {
  useThemeSync();
  return <Investigation />;
}

export default App;
