import React from 'react';
import Todo from './Todo';
import axios from 'axios';

interface Todo {
  name: string;
}

interface ListData {
  name: string;
  todos: Todo[];
}

interface ListProps {
  list: ListData;
  index: number;
  lists: ListData[];
  setLists: React.Dispatch<React.SetStateAction<ListData[]>>;
  moveTodo: (listIndex: number, todoIndex: number, direction: 'previous' | 'next') => void;
}

const List: React.FC<ListProps> = ({ list, index, lists, setLists, moveTodo }) => {
  const deleteList = (): void => {
    axios.delete(`http://localhost:3000/lists/${list.id}`)
    .then(response => {
      const newLists = [...lists];
      newLists.splice(index, 1);
      setLists(newLists);
    })
    .catch(error => "Error deleting a list", error);
  };

  return (
    <div className="card">
      <h2>{list.name}</h2>
      <button onClick={deleteList}>Delete list</button>
      <Todo listIndex={index} lists={lists} setLists={setLists} moveTodo={moveTodo} />
    </div>
  );
};

export default List;