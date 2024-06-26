import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Vibration,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export default function Favoritos() {
  // State para registrar os dados carregados no storage
  const [listaFavoritos, setListaFavoritos] = useState([]);

  // useEffect é acionado assim que entrar na tela favoritos
  useEffect(() => {
    const carregarFavoritos = async () => {
      try {
        const dados = await AsyncStorage.getItem("@infosSalvas");
        if (dados) {
          const favoritos = JSON.parse(dados);
          for (const favorito of favoritos) {
            const { latitude, longitude } = favorito.localizacao;
            const endereco = await geocodificar(latitude, longitude);
            favorito.endereco = endereco;
          }
          setListaFavoritos(favoritos);
        }
      } catch (error) {
        console.error("Erro ao carregar os dados: " + error);
        Alert.alert("Erro", "Erro ao carregar dados.");
      }
    };

    carregarFavoritos();
  }, []);

  // Função assincrona de excluir todos os favoritos
  const excluirTodosFavoritos = async () => {
    Alert.alert("Excluir TODOS?", "Quer mesmo excluir TODOS seus momentos?", [
      {
        text: "Excluir",
        onPress: async () => {
          await AsyncStorage.removeItem("@infosSalvas");
          setListaFavoritos([]);
          Vibration.vibrate();
        }, // removendo itens e atualizando o state
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]); // Passado 3º parametro como um array com um objeto para texto do alert
  };

  // Função para geocodificar o endereço
  const geocodificar = async (latitude, longitude) => {
    try {
      const locationInfo = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (locationInfo && locationInfo.length > 0) {
        const streetName = locationInfo[0].street;
        const streetNumber = locationInfo[0].streetNumber || "";
        const district = locationInfo[0].district || "";
        if (streetName) {
          return `${streetName}, ${streetNumber} - ${district}`;
        } else {
          return "Endereço não encontrado.";
        }
      } else {
        return "Endereço não encontrado.";
      }
    } catch (error) {
      console.error("Erro ao obter o nome da rua:", error);
      return "Erro na solicitação.";
    }
  };

  return (
    <View style={styles.container}>
      {listaFavoritos.length > 0 ? (
        <Text style={styles.title}>Lugares visitados</Text>
      ) : (
        <Text style={styles.title}>Sem momentos salvos</Text>
      )}

      {listaFavoritos.length > 0 && (
        <Pressable
          onPress={excluirTodosFavoritos}
          style={styles.botaoExcluirFavorito}
        >
          <Text style={styles.textoBotao}>
            <Ionicons name="trash" size={12} color={"red"} /> Excluir Momentos
          </Text>
        </Pressable>
      )}

      {listaFavoritos.length > 0 && (
        <ScrollView>
          {listaFavoritos.map((info, index) => (
            <View key={index} style={styles.cardFavorito}>
              <Text style={styles.titleCard}>
                <Text style={styles.textoDestaque}> Descrição do Local: </Text>
                {info.descricao}
              </Text>

              <Image
                source={{ uri: info.urlFoto }}
                style={styles.fotoCapturada}
              />

              <Text style={styles.textoCard}>{info.endereco}</Text>
            </View>
          ))}
        </ScrollView>
      )}
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
    margin: 10,
    color: "#679595",
  },

  fotoCapturada: {
    width: 300,
    height: 300,
    margin: 10,
    borderRadius: 6,
  },

  botaoExcluirFavorito: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "darkred",
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  cardFavorito: {
    margin: 10,
    padding: 6,
    borderRadius: 6,
    backgroundColor: "rgba(103,149,149,0.40)",
  },

  titleCard: {
    marginLeft: 10,
    padding: 6,
    fontSize: 16,
  },

  textoDestaque: {
    fontWeight: "bold",
    color: "#679595",
  },

  textoCard: {
    marginLeft: 10,
    padding: 6,
    fontSize: 16,
    fontWeight: "bold",
  },
});
