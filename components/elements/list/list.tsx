import React from 'react';
import ListItem from './listItem';

type Props = {
  magazines: [
    {
      name: string;
      numberOfTurns: number;
    }
  ];
};

const List = ({ magazines }: Props) => {
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
