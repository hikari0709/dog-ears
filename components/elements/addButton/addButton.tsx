'use client';

import React, { useState } from 'react';

const AddButton = () => {
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
        />
        <input
          type="number"
          placeholder="読み終えた巻数を入力してください"
          className="border border-gray-300 p-2 col-span-3 w-full"
        />
        <button className="p-2 bg-blue-500 rounded cursor-pointer text-white col-span-2 w-full">
          マンガを追加する
        </button>
      </form>
    </div>
  );
};

export default AddButton;
