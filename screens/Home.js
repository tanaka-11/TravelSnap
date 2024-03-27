import {
  Button,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Home({ navigation }) {
  return (
    <>
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.titulo}>TravelSnap</Text>

          <View style={styles.viewBotoes}>
            <Pressable
              style={styles.botao}
              onPress={() => navigation.navigate("Captura")}
            >
              <Text>Registrar seu local</Text>
            </Pressable>

            <Pressable style={styles.botao}>
              <Text>Favoritos</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  subContainer: {
    marginVertical: 228,
  },

  titulo: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  viewBotoes: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 24,
  },

  botao: {
    padding: 12,
    backgroundColor: "#dbdbdb",
    borderRadius: 3,
  },
});
