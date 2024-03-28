import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Favoritos() {
  // State para registrar os dados carregados no storage
  const [listaFavoritos, setListaFavoritos] = useState([{}]);

  // useEffect é acionado assim que entrar na tela favoritos
  useEffect(() => {
    const carregarFavoritos = async () => {
      try {
        // Recuperando os dados em formato string do asyncstorage atraves do "getItem"
        const dados = await AsyncStorage.getItem("@infosSalvas");

        // Convertendo dados em objeto com JSON.parse e os guardando no state
        if (dados) {
          setListaFavoritos(JSON.parse(dados));
        }
      } catch (error) {
        console.error("Erro ao carregar os dados: " + error);
        Alert.alert("Erro", "Erro ao carregar dados.");
      }
    };
    carregarFavoritos();
  }, []);

  console.log(listaFavoritos);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <View>
        <ScrollView>
          {listaFavoritos.map((info, index) => (
            <View key={index}>
              <Text>Descrição do Local: {info.descricao}</Text>
              <Image
                source={{ uri: info.urlFoto }}
                style={styles.fotoCapturada}
              />
              <Text>
                Localização: {info.latitude} e {info.longitude}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  fotoCapturada: {
    width: 300,
    height: 300,
    margin: 10,
  },
});
