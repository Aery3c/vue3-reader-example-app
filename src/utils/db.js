import localforage from 'localforage';

export const highlights = localforage.createInstance({ name: 'app-reader-highlights-db' });