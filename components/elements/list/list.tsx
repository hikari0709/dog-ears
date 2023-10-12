import React from 'react';
import ListItem from './listItem';

type Magazine = {
  id: number;
  title: string;
  numberOfTurns: number;
};

type ListProps = {
  magazines: Magazine[];
};

const List = ({ magazines }: ListProps) => {
  return (
    <section className="mb-8">
      <ul>
        {magazines.map((magazine) => (
          <ListItem
            key={magazine.id}
            id={magazine.id}
            magazineTitle={magazine.title}
            magazineNumberOfTurns={magazine.numberOfTurns}
          />
        ))}
      </ul>
    </section>
  );
};

export default List;
