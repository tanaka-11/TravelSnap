import { Alert, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Favoritos() {
  // State para registrar os dados carregados no storage
  const [listaFavoritos, setlistaFavoritos] = useState();

  // useEffect é acionado assim que entrar na tela favoritos
  useEffect(() => {
    const carregarFavoritos = async () => {
      try {
        // Recuperando os dados em formato string do asyncstorage atraves do "getItem"
        const dados = await AsyncStorage.getItem("dados_salvos.json");

        // Convertendo dados em objeto com JSON.parse e os guardando no state
        if (dados) {
          setlistaFavoritos(JSON.parse(dados));
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
    <>
      <View>
        {listaFavoritos.map((infos) => (
          <Text>{infos.descricao}</Text>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
