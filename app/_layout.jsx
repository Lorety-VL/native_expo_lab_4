import { Stack } from 'expo-router/stack';
import { SQLiteProvider } from 'expo-sqlite';
import { DatabaseProvider } from '../components/DatabasePrivider';
import { useState } from 'react';
import InitWatcher from '../components/InitWatcher';

export default function Layout() {
  const [isInitCompleted, setIsInitCompleted] = useState(false);

  async function migrateDbIfNeeded(db) {
    const DATABASE_VERSION = 1;

    let { user_version: currentDbVersion } = await db.getFirstAsync(
      'PRAGMA user_version'
    );
    if (currentDbVersion >= DATABASE_VERSION) {
      setIsInitCompleted(() => true)
      return;
    }
    if (currentDbVersion === 0) {

      await db.execAsync(`
  PRAGMA journal_mode = 'wal';
  CREATE TABLE IF NOT EXISTS cart ( id INTEGER NOT NULL UNIQUE, count INTEGER DEFAULT 1, title TEXT NOT NULL, description TEXT NOT NULL, price REAL NOT NULL, image TEXT NOT NULL);
  `);

      currentDbVersion = 1;
    }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }

  return (
    <DatabaseProvider>
      <SQLiteProvider databaseName='db.db' onInit={migrateDbIfNeeded} options={{ enableChangeListener: true }} >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        {isInitCompleted && <InitWatcher />}
      </SQLiteProvider>
    </DatabaseProvider>
  );
}
