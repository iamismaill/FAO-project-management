import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import ProjectList from './components/ProjectList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header/>
      <ProjectList/>
    </div>
  );
}

export default App;
