// Compartilhar.js
import React, { useState } from "react";
import { Button } from "react-native";
import * as Sharing from "expo-sharing";

export default function Compartilhar({ foto }) {
  const compartilarFoto = async () => {
    await Sharing.shareAsync(foto);
  };

  return (
    <>
      <Button title="Compartilhar" onPress={compartilharFoto} />
    </>
  );
}
