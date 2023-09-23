'use client';

import React, { useState } from 'react';

const AddButton = () => {
  return (
    <form
      action=""
      className="p-2 grid grid-cols-8 fixed left-0 bottom-4"
    >
      <input
        type="text"
        placeholder="タイトルを入力してください"
        className="border border-gray-300 mr-2 p-2 col-span-3"
      />
      <input
        type="number"
        placeholder="読み終えた巻数を入力してください"
        className="border border-gray-300 p-2 mr-2 col-span-3"
      />
      <button className="p-2 bg-blue-500 rounded cursor-pointer text-white col-span-2">
        マンガを追加する
      </button>
    </form>
  );
};

export default AddButton;
