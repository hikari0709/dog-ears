'use client';

import React, { useState, ChangeEvent } from 'react';
import { openDB } from '@/utils/indexedDB';

type Argument = {
  inputTitle: string;
  numberOfTurns: number;
};

const AddButton = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputNumberOfTurns, setInputNumberOfTurns] = useState('');

  const addMagazineData = async () => {
    try {
      const db = await openDB();
      const transaction = db.transaction(['magazines'], 'readwrite');
      const objectStore = transaction.objectStore('magazines');

      const addData = {
        name: inputTitle,
        numberOfTurns: inputNumberOfTurns,
      };

      const request = objectStore.add(addData);

      request.onsuccess = (event) => {
        console.log('登録完了');
      };
    } catch (error) {
      console.error('データの追加中にエラーが発生しました:', error);
    }
  };

  const handleInputChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const handleInputChangeNumberOfTurns = (e: ChangeEvent<HTMLInputElement>) => {
    setInputNumberOfTurns(e.target.value);
  };

  return (
    <div className="max-w-screen-sm fixed left-2/4 -translate-x-2/4 bottom-4 w-full p-2">
      <form
        action=""
        className="grid grid-cols-8 gap-2 place-items-center"
      >
        <input
          type="text"
          placeholder="タイトルを入力してください"
          className="border border-gray-300 p-2 col-span-3 w-full"
          onChange={handleInputChangeTitle}
        />
        <input
          type="number"
          placeholder="読み終えた巻数を入力してください"
          className="border border-gray-300 p-2 col-span-3 w-full"
          onChange={handleInputChangeNumberOfTurns}
        />
        <button
          className="p-2 bg-blue-500 rounded cursor-pointer text-white col-span-2 w-full"
          onClick={addMagazineData}
        >
          マンガを追加する
        </button>
      </form>
    </div>
  );
};

export default AddButton;
