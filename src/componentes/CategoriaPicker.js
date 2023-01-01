import React from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export const CategoriaPicker = ({setCategoria,categoria, opcaoTodas = false}) => {
    return <View style={estilos.modalPicker}>
                <Picker
                selectedValue={categoria}
                onValueChange={novaCategoria=> setCategoria(novaCategoria)}

                >
                    <Picker.Item label="Pessoal" value="Pessoal"/>
                    <Picker.Item label="Trabalho" value="Trabalho"/>
                    <Picker.Item label="Outros" value="Outros"/>
                    {opcaoTodas &&  <Picker.Item label="Todas" value="Todas"/> }
                </Picker>
            </View>
}


const estilos = StyleSheet.create({
    modalPicker: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#EEEEEE",
      marginBottom: 12,
    },

});
  
export default CategoriaPicker;

