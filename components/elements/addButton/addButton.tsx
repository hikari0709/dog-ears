'use client';

import React, { useState, ChangeEvent } from 'react';
import { openDB } from '@/utils/indexedDB';

type Argument = {
  id: number;
  title: string;
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

      const countRequest = objectStore.count();
      countRequest.onsuccess = () => {
        console.log('データベース内のデータ数:', countRequest.result);

        const id = countRequest.result + 1;

        const addData: Argument = {
          id: id,
          title: inputTitle,
          numberOfTurns: Number(inputNumberOfTurns),
        };

        const request = objectStore.add(addData);

        request.onsuccess = () => {
          console.log('データの追加が成功しました');
        };
      };
    } catch (error) {
      console.error('データの追加中にエラーが発生しました:', error);
    }
  };

  const handleInputChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const handleInputChangeNumberOfTurns = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputNumberOfTurns(value);
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
          required
        />
        <input
          type="number"
          placeholder="巻数を入力してください"
          className="border border-gray-300 p-2 w-full"
          onChange={handleInputChangeNumberOfTurns}
          required
        />
        <button
          className="p-2 bg-blue-500 rounded cursor-pointer text-white col-span-4 w-full"
          onClick={addMagazineData}
        >
          マンガを追加する
        </button>
      </form>
    </div>
  );
};

export default AddButton;
