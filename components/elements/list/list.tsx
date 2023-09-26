import React from 'react';
import ListItem from './listItem';

type Magazine = {
  name: string;
  numberOfTurns: number;
};

type ListProps = {
  magazines: Magazine[];
};

const List = ({ magazines }: ListProps) => {
  console.log(magazines);
  return (
    <section className="mb-8">
      <ul>
        {magazines.map((magazine, itemIndex) => (
          <ListItem
            key={`item${itemIndex}`}
            magazineTitle={magazine.name}
            magazineNumberOfTurns={magazine.numberOfTurns}
          />
        ))}
      </ul>
    </section>
  );
};

export default List;
