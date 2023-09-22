import React, { useState } from 'react';

type Props = {
  key: string;
  magazineTitle: string;
  magazineNumberOfTurns: number;
};

/**
 * 間違えた時にマイナスにしたいのであって、基本的に読んだ本の巻数が前に戻すことはない
 * マイナスだけは少しハードルを上げられるように別のところにアクションボタンを置いた方がいいのかもしれない。
 * 簡単に戻せないとなるとプラスする時も少しハードルが高い方が誤ってカウントアップされることはすくなくなるかもしれない
 * 表にはマンガのタイトルと読んだ巻数が表示されているのみ
 * カウントアップさせるにはマンガタイトルをタップした後に表示されるモーダルで操作する
 *
 * マンガをリストに追加するとき
 * 追加ボタンは右下に設置して、「直接入力」と「バーコード読み取り」が選べるようにしておく、バーコードの読みよりがエラーになった場合直接入力に誘導するような動線をつける
 * 直接入力補助のために、これまで登録されたものがサジェストとして出るような仕組みもあるといい
 * listItemはstoreとかのフォルダを作ってjsonで管理するように変更
 * listにitemを追加する時は画面右下とかから「追加」のボタンを押してテキストと読んだ巻数を入力して登録するとリストに追加される
 */

const ListItem = ({ key, magazineTitle, magazineNumberOfTurns }: Props) => {
  const [count, setCount] = useState(magazineNumberOfTurns);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    count > 0 && setCount(count - 1);
  };

  return (
    <li
      key={key}
      className="grid grid-cols-8 place-items-center border-b border-gray-300 mb-2 cursor-pointer"
    >
      <p className="col-span-5 p-2">{magazineTitle}</p>
      <p className=" p-2">{count}</p>
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
