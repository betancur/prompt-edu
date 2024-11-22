import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Prompts from './pages/Prompts';
import Frameworks from './pages/Frameworks';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prompts" element={<Prompts />} />
            <Route path="/frameworks" element={<Frameworks />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;