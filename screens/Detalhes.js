import { View, Text, Image, Button, StyleSheet } from "react-native";

export default function Detalhes({ route }) {
  const { localizacao, urlFoto, descricao } = route.params.infos;

  // Convertendo o objeto localizacao em uma string legível
  const localizacaoString = `Latitude: ${localizacao.latitude}, Longitude: ${localizacao.longitude}`;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Descrição: {descricao}</Text>
      <Text style={styles.localizacao}>Localização: {localizacaoString}</Text>
      <Image source={{ uri: urlFoto }} style={styles.fotoCapturada} />
      <Button title="Salvar Momento" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  fotoCapturada: {
    width: 300,
    height: 300,
    margin: 10,
  },

  titulo: {
    fontSize: 20,
  },
});
