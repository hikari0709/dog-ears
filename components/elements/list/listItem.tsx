import React, { useState } from 'react';
import { openDB } from '@/utils/indexedDB';

type Props = {
  id: number;
  magazineTitle: string;
  magazineNumberOfTurns: number;
};

type Argument = {
  id: number;
  numberOfTurns: number;
};

/**
 * 間違えた時にマイナスにしたいのであって、基本的に読んだ本の巻数が前に戻すことはない
 * マイナスだけは少しハードルを上げられるように別のところにアクションボタンを置いた方がいいのかもしれない。
 * 簡単に戻せないとなるとプラスする時も少しハードルが高い方が誤ってカウントアップされることはすくなくなるかもしれない
 * バーコードの読み取りは追加機能とするので後で追加する
 * マンガをリストに追加するとき
 * 追加ボタンは右下に設置して、「直接入力」と「バーコード読み取り」が選べるようにしておく、バーコードの読みよりがエラーになった場合直接入力に誘導するような動線をつける
 * 直接入力補助のために、これまで登録されたものがサジェストとして出るような仕組みもあるといい
 * listにitemを追加する時は画面右下とかから「追加」のボタンを押してテキストと読んだ巻数を入力して登録するとリストに追加される
 * incrementとdecrementの処理をIndexedDBのアップデート処理と一緒に行う必要がある
 */

const ListItem = ({ id, magazineTitle, magazineNumberOfTurns }: Props) => {
  const [count, setCount] = useState(magazineNumberOfTurns);
  const updateMagazineData = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(['magazines'], 'readwrite');
      const objectStore = transaction.objectStore('magazines');
      const targetId = Number(event.currentTarget.getAttribute('data-id'));

      const updateData: Argument = {
        id: targetId,
        numberOfTurns: Number(count),
      };

      const request = objectStore.put(updateData);

      request.onsuccess = () => {
        console.log('データの追加が成功しました');
      };
    } catch (error) {
      console.error('データの追加中にエラーが発生しました:', error);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    count > 0 && setCount(count - 1);
  };

  return (
    <li
      data-id={id}
      className="grid grid-cols-8 place-items-center border-b border-gray-300 mb-2 cursor-pointer"
    >
      <p className="col-span-5 p-2">{magazineTitle}</p>
      <p className="p-2">{count}</p>
      <button
        onClick={decrement}
        className="w-full h-full col-span-1 bg-red-200 cursor-pointer p-2"
      >
        -
      </button>
      <button
        onClick={increment}
        className="w-full h-full col-span-1 bg-blue-200 cursor-pointer p-2"
      >
        +
      </button>
    </li>
  );
};

export default ListItem;
