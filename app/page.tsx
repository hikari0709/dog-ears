'use client';

import List from '@/components/elements/list';
import AddButton from '@/components/elements/addButton';

import { useEffect, useState } from 'react';
import { openDB } from '../utils/indexedDB';

type Magazine = {
  name: string;
  numberOfTurns: number;
};

export default function Home() {
  const [magazinesData, setMagazinesData] = useState<Magazine[]>([]);

  useEffect(() => {
    openDB()
      .then((db) => {
        db.transaction(['magazines'], 'readwrite')
          .objectStore('magazines')
          .add({
            name: '黄泉のツガイ',
            numberOfTurns: 0,
          });
      })
      .catch((error) => {
        console.error('IndexedDBのオープンに失敗しました: ', error);
      });
  }, []);

  useEffect(() => {
    const fetchDataFromIndexedDB = async () => {
      try {
        const db = await openDB();
        const transaction = db.transaction(['magazines'], 'readonly');
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
      {}
      <List />
      <AddButton />
    </main>
  );
}
