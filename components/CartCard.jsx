import { useSQLiteContext } from "expo-sqlite";
import { Image, View, Text, Pressable, StyleSheet } from "react-native";
import DatabaseManager from "../services/cartService";


export default function CartCard({ goodData }) {
  const sqlite = useSQLiteContext();
  const db = new DatabaseManager(sqlite);
  

  const addToCart = async (localGoodData) => {
    await db.addGood(localGoodData);
  };
  const decreaseCount = async (localGoodData) => {
    if (localGoodData.count === 1) {
      return db.deleteGood(localGoodData.id);
    }
    await db.decreaseGoodCount(localGoodData.id);
  };

  return (
    <View style={styles.container}>
      <Text>Title: {goodData.title}</Text>
      <Image source={{ uri: goodData.image }} style={{ width: 100, height: 100 }} />
      <Text>Price: {goodData.price}</Text>
      <Text>Description: {goodData.description}</Text>
      <View style={styles.countLine}>
        <Pressable style={styles.button} onPress={() => decreaseCount(goodData)}><Text>меньше!</Text></Pressable>
        <Text>{goodData.count}</Text>
        <Pressable style={styles.button} onPress={() => addToCart(goodData)}><Text>Больше!</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  countLine: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    border: '2px solid black',
    backgroundColor: 'cyan',
    width: 140,
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 5,
    marginTop: 5,
  },
  container: {
    border: '1px solid black',
    borderRadius: 10,
    padding: 20,
    margin: 10
  }
});