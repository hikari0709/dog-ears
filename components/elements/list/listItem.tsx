import React, { useState } from 'react';

type Props = {
  key: string;
  itemName: string;
};

const ListItem = ({ key, itemName }: Props) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <li key={key}>
      {itemName}：{count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </li>
  );
};

export default ListItem;
