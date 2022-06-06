import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Feather } from "@expo/vector-icons";

import { WebView } from "react-native-webview";

export default function LinkWeb({ link, title, closeModal }) {
  return (
    <>
      <TouchableOpacity 
        style={sytles.button}
        onPress={closeModal
        }>
        <Feather name="x" size={25} color="#FFF" />

        <Text style={sytles.name}>{title}</Text>
      </TouchableOpacity>
      <WebView source={{ uri: link }} />
    </>
  );
}

const sytles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: '#1E1E26',
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    color: '#FFF',
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold'
  }
})