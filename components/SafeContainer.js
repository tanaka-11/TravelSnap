import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

// Passado a props "children" para componente funcionar como um container
export default function SafeContainer({ children }) {
  return (
    <>
      <SafeAreaView style={estilos.container}>
        <ScrollView>{children}</ScrollView>
      </SafeAreaView>
      ;
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
