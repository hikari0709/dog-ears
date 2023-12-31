import React, { useState, useEffect } from 'react';
import { openDB } from '@/utils/indexedDB';

type Props = {
  id: number;
  magazineTitle: string;
  magazineNumberOfTurns: number;
};

type Argument = {
  id: number;
  title: string;
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
 * 誤って「マンガを追加する」を押してしまった場合、マンガのタイトルが空のままで登録されてしまう
 * 現在は誤ってマンガのタイトルを登録してしまった場合、編集も削除もできない
 * マンガタイトルが真ん中揃えなのが気に入らない
 */

const ListItem = ({ id, magazineTitle, magazineNumberOfTurns }: Props) => {
  const [count, setCount] = useState(magazineNumberOfTurns);

  useEffect(() => {
    const updateMagazineData = async () => {
      try {
        const db = await openDB();
        const transaction = db.transaction(['magazines'], 'readwrite');
        const objectStore = transaction.objectStore('magazines');
        const updateData: Argument = {
          id: id,
          title: magazineTitle,
          numberOfTurns: count,
        };

        const request = objectStore.put(updateData);

        request.onsuccess = () => {
          console.log('データの追加が成功しました');
        };
      } catch (error) {
        console.error('データの追加中にエラーが発生しました:', error);
      }
    };

    updateMagazineData();
  }, [count]);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <li className="grid grid-cols-8 place-items-center border-b border-gray-300 mb-2 cursor-pointer">
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
