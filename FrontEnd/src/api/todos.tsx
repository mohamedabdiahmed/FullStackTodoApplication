export interface Todo {
    id: number;
    Title: string;
    IsComplete: boolean;
  }
  
  
  const API_URL = 'http://localhost:5275/api/items';
  
  // Get all Todos
  export const fetchTodos = async (): Promise<Todo[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  
  // Add a new Todo
  export const addTodo = async (Title: string): Promise<Todo> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Title, IsComplete: false }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  
  // Update a Todo
  export const updateTodo = async (todo: Todo): Promise<Todo> => {
    const response = await fetch(`${API_URL}/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  
  // Delete a Todo
  export const deleteTodo = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  };
  