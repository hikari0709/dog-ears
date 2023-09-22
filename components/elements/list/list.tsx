import React, { useState, useEffect } from 'react';
import ListItem from './listItem';

type Magazine = {
  name: string;
  numberOfTurns: number;
};

const List = () => {
  const [magazines, setMagazines] = useState<Magazine[]>([]);

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const response = await fetch('/data/magazines.json');
        const data = await response.json();
        setMagazines(data);
      } catch (error) {
        console.error('JSONデータの読み込みエラー', error);
      }
    };

    fetchMagazines();
  }, []);

  return (
    <section>
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
