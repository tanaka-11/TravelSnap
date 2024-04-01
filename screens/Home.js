import {
  Button,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import image from "../assets/Travel.png";

export default function Home({ navigation }) {
  return (
    <>
      <StatusBar barStyle="light-content" />

      {/* <View style={styles.container}> */}
      <ImageBackground resizeMode="cover" style={styles.image} source={image}>
        <View style={styles.subContainer}>
          <Text style={styles.titulo}>TravelSnap</Text>

          <View style={styles.viewBotoes}>
            <Pressable
              style={styles.botao}
              onPress={() => navigation.navigate("Captura")}
            >
              <Text style={styles.textoBotao}>Registrar seu local</Text>
            </Pressable>

            <Pressable
              style={styles.botao}
              onPress={() => navigation.navigate("Favoritos")}
            >
              <Text style={styles.textoBotao}>Favoritos</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
      {/* </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
  },

  subContainer: {
    marginVertical: 228,
  },

  titulo: {
    fontSize: 52,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "rgba(103,149,149,0.85)",
    padding: 10,
  },

  viewBotoes: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 24,
  },

  textoBotao: {
    fontSize: 16,
    color: "#679595",
    fontWeight: "bold",
  },

  botao: {
    padding: 18,
    backgroundColor: "#e6e6e6",
    borderRadius: 6,
  },
});
