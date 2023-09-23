import List from '@/components/elements/list';
import AddButton from '@/components/elements/addButton';

import { useEffect } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';

export default function Home() {
  return (
    <main className="px-2 py-24 max-w-screen-sm m-auto">
      <List />
      <AddButton />
    </main>
  );
}
