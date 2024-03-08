import React, { useState } from 'react';
import List from './List';
import './App.css';

interface Todo {
  name: string;
}

interface ListData {
  name: string;
  todos: Todo[];
}

const App: React.FC = () => {
  const [lists, setLists] = useState<ListData[]>([
    { name: 'List 1', todos: [] },
    { name: 'List 2', todos: [] },
    { name: 'List 3', todos: [] },
    { name: 'List 4', todos: [] }
  ]);

  const [newListName, setNewListName] = useState('');

  const moveTodo = (listIndex: number, todoIndex: number, direction: 'previous' | 'next'): void => {
    const newLists: ListData[] = [...lists];
    const todo = newLists[listIndex].todos.splice(todoIndex, 1)[0];
    if (direction === 'next') {
      newLists[listIndex + 1].todos.splice(todoIndex, 0, todo);
    } else if (direction === 'previous') {
      newLists[listIndex - 1].todos.splice(todoIndex, 0, todo);
    }
    setLists(newLists);
  };

  const addList = (): void => {
    if (newListName.trim() === '') return;
    const newList: ListData = { name: newListName, todos: [] };
    setLists([...lists, newList]);
    setNewListName('');
  };

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        addList();
      }}>
        <input type="text" value={newListName} onChange={(e) => setNewListName(e.target.value)} />
        <button type="submit">Add new list</button>
      </form>
      <div className="grid-container">
        {lists.map((list, index) => (
          <List key={index} list={list} index={index} lists={lists} setLists={setLists} moveTodo={moveTodo} />
        ))}
      </div>
    </div>
  );
};

export default App;