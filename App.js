import { SQLiteProvider } from 'expo-sqlite';
import { IniciarBD } from './Databases/IniciarBD';
import { Index } from './index';

export default function App() {
  return (
    <SQLiteProvider databaseName="meusDados.db" onInit={IniciarBD}>
      <Index />
    </SQLiteProvider>
  );
};