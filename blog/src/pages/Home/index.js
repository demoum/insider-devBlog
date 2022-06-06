import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
import { getFavorite, setFavorite } from "../../services/favorite";

import * as Animatable from 'react-native-animatable';

import CategoryItem from "../../components/CategoryItem";
import FavoritePost from "../../components/FavoritePost";
import PostItem from "../../components/PostItem";

// Animating category FlatList
const FlatListAnimated = Animatable.createAnimatableComponent(FlatList);

export default function Home() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [favCategory, setFavCategory] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadData() {
      await getListPosts();

      const category = await api.get("/api/categories?populate=icon");
      setCategories(category.data.data);
    }
    loadData();
  }, []);

  useEffect(() => {
    async function favorite() {
      const response = await getFavorite();
      setFavCategory(response);
    }
    favorite();
  }, []);

  async function getListPosts() {
    const response = await api.get(
      "api/posts?populate=cover&sort=createdAt:desc"
    );
    setPosts(response.data.data);
  }

  //Favoritar
  async function handleFavorite(id) {
    const response = await setFavorite(id);
    setFavCategory(response);
    alert("Categoria Favoritada!");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Animatable.Text style={styles.name} animation={'fadeInLeft'}>Blog para Devs</Animatable.Text>

        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Feather name="search" size={24} color="#fffdd0" />
        </TouchableOpacity>
      </View>

      <FlatListAnimated
        animation='flipInX'
        delay={500}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ padding: 12 }}
        style={styles.categories}
        data={categories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CategoryItem data={item} favorite={() => handleFavorite(item.id)} />
        )}
      />

      <View style={styles.main}>
        {favCategory.length !== 0 && (
          <FlatList
            style={{ marginTop: 50, maxHeight: 100, paddingStart: 18 }}
            contentContainerStyle={{ paddingEnd: 18 }}
            data={favCategory}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <FavoritePost data={item} />}
          />
        )}

        <Text
          style={[
            styles.title,
            { marginTop: favCategory.length > 0 ? 14 : 46 },
          ]}
        >
          Conteúdos em alta
        </Text>

        <FlatList
          style={{ flex: 1, paddingHorizontal: 18 }}
          showsHorizontalScrollIndicator={false}
          data={posts}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <PostItem data={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E26",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 24,
  },
  name: {
    fontSize: 28,
    color: "#fffdd0",
    fontWeight: "bold",
  },
  categories: {
    maxHeight: 115,
    backgroundColor: "#fffdd0",
    marginHorizontal: 18,
    borderRadius: 8,
    zIndex: 9,
  },
  main: {
    backgroundColor: "#fffff0",
    flex: 1,
    marginTop: -30,
  },
  title: {
    fontSize: 21,
    paddingHorizontal: 18,
    marginBottom: 14,
    fontWeight: "bold",
    color: "#162133",
  },
});
