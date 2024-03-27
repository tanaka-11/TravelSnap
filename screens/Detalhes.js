import { View, Text, Image, Button, StyleSheet } from "react-native";

// Acessando todos recursos da Sharing
import * as Sharing from "expo-sharing";

export default function Detalhes({ route }) {
  // Função para compartilhar imagem de fotos
  // const compartilarFoto = async () => {
  //   await Sharing.shareAsync(foto);
  // };

  const { localizacao, urlFoto, descricao } = route.params;
  console.log(descricao);

  return (
    <View style={styles.container}>
      <Text>Descrição: {descricao}</Text>
      <Image source={{ uri: urlFoto }} />

      <Button title="Compartilhar" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
