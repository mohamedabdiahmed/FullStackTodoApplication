import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchTodos, addTodo, updateTodo, deleteTodo, Todo } from '../api/todos';

const TodoList: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: todos, isLoading, isError } = useQuery<Todo[]>('todos', fetchTodos);

  const addMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading todos</div>;
  }

  const handleAddTodo = (title: string) => {
    addMutation.mutate(title);
  };

  const handleToggleComplete = (todo: Todo) => {
    updateMutation.mutate({ ...todo, completed: !todo.completed });
  };

  const handleDeleteTodo = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="mb-4">
        <input
          type="text"
          id="new-todo"
          className="border rounded p-2 mr-2"
          placeholder="Enter new todo"
        />
        <button
          onClick={() => handleAddTodo((document.getElementById('new-todo') as HTMLInputElement).value)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Todo
        </button>
      </div>
      <ul>
        {todos?.map(todo => (
          <li key={todo.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo)}
              className="mr-2"
            />
            <span className={todo.completed ? 'line-through' : ''}>{todo.title}</span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="ml-auto bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
