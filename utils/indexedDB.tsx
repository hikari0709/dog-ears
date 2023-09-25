const DB_NAME = 'myDB';
const DB_VERSION = 3;

let db;

export function openDB() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBRequest).result as IDBDatabase;
        resolve(db);
      };

      request.onsuccess = (event) => {
        const db = (event.target as IDBRequest).result as IDBDatabase;
        resolve(db);
      };

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    } catch (error) {
      reject(error);
    }
  });
}