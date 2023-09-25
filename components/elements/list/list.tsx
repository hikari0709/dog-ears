import React, { useState, useEffect } from 'react';
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
