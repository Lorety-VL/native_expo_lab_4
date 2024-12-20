import { useSQLiteContext } from 'expo-sqlite';
import { FlatList, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useContext, useEffect, useState } from 'react';
import CartCard from '../../components/CartCard';
import DatabaseManager from '../../services/cartService';
import { DBContext } from '../../components/DatabasePrivider';

export default function Page() {
  const [data, setData] = useState([]);
  const [refetchKey, setRefetchKey] = useState(1);
  const { isInit } = useContext(DBContext);
  
  const sqlite = useSQLiteContext();
  const db = new DatabaseManager(sqlite);
  
  const getCart = async () => {
    const inCartGoods = await db.getAllGoods();
    setData(() => inCartGoods);
  };

  useEffect(() => {
    const sub = SQLite.addDatabaseChangeListener(() => {
      sub.remove();
      getCart();
      setRefetchKey((prev) => prev += 1);
    });
  }, [refetchKey]);

    useEffect(() => {
      getCart()
    }, [isInit]);

  return <FlatList
    data={data}
    renderItem={(item) => <CartCard goodData={item.item} />}
    keyExtractor={(item) => item.id}
  />;
}