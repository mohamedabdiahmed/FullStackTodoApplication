import React from 'react';
import { BrowserRouter as Router, Route,  } from 'react-router-dom';
import TodoList from './Components/TodoList';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
          <Route path="/"  element={<TodoList/>} />
          {/* Add more routes here if needed */}
      </div>
    </Router>
  );
};

export default App;
