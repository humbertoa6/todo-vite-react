import React from 'react';

interface TodoProps {
  listIndex: number;
  lists: {
    name: string;
    todos: {
      name: string;
    }[];
  }[];
  setLists: React.Dispatch<React.SetStateAction<{
    name: string;
    todos: {
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
      const newLists = [...lists];
      newLists[listIndex].todos.push({ name: input.value.trim() });
      setLists(newLists);
      input.value = '';
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