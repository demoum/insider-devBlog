import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PostItem from "../../components/PostItem";
import api from "../../services/api";

export default function CategoryPosts() {
  const navigation = useNavigation();
  const route = useRoute();

  const [posts, setPosts] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title === "" ? "Categoria" : route.params?.title,
    });
  }, [navigation]);

  useEffect(() => {
    const loadPosts = async () => {
      const response = await api.get(
        `api/categories/${route.params?.id}?fields=name&populate=posts,posts.cover`
      );
      setPosts(response.data?.data?.attributes?.posts?.data);
    };
    loadPosts();
  }, []);

  const handleBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      {posts.length === 0 && (
        <View style={styles.warningContainer}>
          <Text style={styles.warning}>
            Esta categoria ainda não tem nenhum post
          </Text>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.textButton}>Encontrar Posts</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <PostItem data={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // view occupies full screen
    padding: 18,
    backgroundColor: "#fffff0",
  },
  warningContainer: {
    alignItems: "center",
  },
  warning: {
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#1E1E26",
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginTop: 12,
    borderRadius: 4,
  },
  textButton: {
    color: "#fffdd0",
  },
});
