import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import axios from 'axios';
import Card from "../../components/Card";

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products?limit=5')
      .then((res) => setData(() => res.data));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={(item) => <Card goodData={item.item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
