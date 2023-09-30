'use client';

import List from '@/components/elements/list';
import AddButton from '@/components/elements/addButton';

import { useEffect, useState } from 'react';
import { openDB } from '@/utils/indexedDB';

type Magazine = {
  title: string;
  numberOfTurns: number;
};

export default function Home() {
  const [magazinesData, setMagazinesData] = useState<Magazine[]>([]);

  useEffect(() => {
    const fetchDataFromIndexedDB = async () => {
      try {
        const db = await openDB();
        const transaction = db.transaction(['magazines'], 'readwrite');
        const objectStore = transaction.objectStore('magazines');
        const request = objectStore.getAll();

        request.onsuccess = (event) => {
          if (event.target) {
            const result = (event.target as IDBRequest).result as Magazine[];
            setMagazinesData(result);
          }
        };
      } catch (error) {
        console.error('IndexedDBのオープンに失敗しました:', error);
      }
    };

    fetchDataFromIndexedDB();
  }, []);

  return (
    <main className="px-2 py-24 max-w-screen-sm m-auto">
      {magazinesData.length > 0 && <List magazines={magazinesData} />}
      <AddButton />
    </main>
  );
}
