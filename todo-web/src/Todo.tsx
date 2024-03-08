import React from 'react';
import axios from 'axios';

interface TodoProps {
  listIndex: number;
  lists: {
    id: number;
    name: string;
    todos: {
      id: number;
      name: string;
    }[];
  }[];
  setLists: React.Dispatch<React.SetStateAction<{
    name: string;
    todos: {
      id: number;
      name: string;
    }[];
  }[]>>;
  moveTodo: (listIndex: number, todoIndex: number, direction: 'previous' | 'next') => void;
}

const Todo: React.FC<TodoProps> = ({ listIndex, lists, setLists, moveTodo }) => {
  const addTodo = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input');
    
    if (input && input.value.trim() !== '') {
      const todoName = input.value.trim();  
      axios.post('http://localhost:3000/todos', {
        name: todoName,
        list_id: lists[listIndex].id
      })
      .then(
        response => {
          const newLists = [...lists];
          newLists[listIndex].todos.push(response.data);
          setLists(newLists);
          input.value = '';   
        }
      ).catch(error => console.log("Error!", error))
    }
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <input type="text" />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {lists[listIndex].todos.map((todo, todoIndex) => (
          <li key={todoIndex}>
            <button
              onClick={() => moveTodo(listIndex, todoIndex, 'previous')}
              disabled={listIndex === 0}
            >
              {"<"}
            </button>
            {todo.name}
            <button
              onClick={() => moveTodo(listIndex, todoIndex, 'next')}
              disabled={listIndex === lists.length - 1}
            >
              {">"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;