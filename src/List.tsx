import React from 'react';
import Todo from './Todo';

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
    const newLists = [...lists];
    newLists.splice(index, 1);
    setLists(newLists);
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