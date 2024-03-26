import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

// Passado a props "children" para componente funcionar como um container
export default function SafeContainer({ children }) {
  return (
    <>
      <ScrollView>
        <SafeAreaView style={estilos.container}>{children}</SafeAreaView>;
      </ScrollView>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
