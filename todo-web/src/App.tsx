import React, { useEffect, useState } from 'react';
import List from './List';
import './App.css';
import axios from 'axios';

interface Todo {
  name: string;
}

interface ListData {
  name: string;
  todos: Todo[];
}

const App: React.FC = () => {
  const [lists, setLists] = useState<ListData[]>([]);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/lists')
    .then(response => setLists(response.data))
  }, [])

  const moveTodo = (listIndex: number, todoIndex: number, direction: 'previous' | 'next'): void => {
    const newLists: ListData[] = [...lists];
    const list = newLists[listIndex];
    const todo = list.todos.splice(todoIndex, 1)[0];
    let listItem = list;
    if (direction === 'next') {
      listItem = newLists[listIndex + 1]
      listItem.todos.splice(todoIndex, 0, todo);
    } else if (direction === 'previous') {
      listItem = newLists[listIndex - 1]
      listItem.todos.splice(todoIndex, 0, todo);
    }
    setLists(newLists);
    
    try {
      axios.put(`http://localhost:3000/todos/${todo.id}`, { list_id: listItem.id });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const addList = (): void => {
    if (newListName.trim() === '') return;
    const newList: ListData = { name: newListName, todos: [] };
    axios.post('http://localhost:3000/lists', newList)
    .then(response => {
      setLists([...lists, response.data]);
      setNewListName('');
    })
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