'use client';

import React from 'react';
import ListItem from './listItem';

type Props = {
  headingText?: string;
  listItems: Array<string>;
};

const List = ({ headingText, listItems }: Props) => {
  return (
    <section>
      <ul>
        {listItems.map((item, itemIndex) => (
          <ListItem
            key={`item${itemIndex}`}
            itemName={item}
          />
        ))}
      </ul>
    </section>
  );
};

export default List;
