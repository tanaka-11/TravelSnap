import { View, Text, Image } from "react-native";

// Acessando todos recursos da Sharing
import * as Sharing from "expo-sharing";

export default function Detalhes({ route }) {
  // Função para compartilhar imagem de fotos
  // const compartilarFoto = async () => {
  //   await Sharing.shareAsync(foto);
  // };

  const { localizacao, urlFoto, descricao } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Descrição: {descricao}</Text>
      <Image source={urlFoto} />
      {/* <Text>
        Localização: {localizacao.latitude}, {localizacao.longitude}
      </Text> */}
    </View>
  );
}
