import React, { useEffect, useState } from "react"
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import CategoriaPicker from "./CategoriaPicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { adicionarNota, atualizarNota, removerNota } from "../servicos/Notas";

export default function NotaEditor({mostrarNotas,notaSelecionada,setNotaSelecionada}) {

  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria ] = useState("Pessoal");

  const [texto, setTexto] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);

  useEffect(()=>{
    if(notaSelecionada?.id  ){
      preencheModal();
      setModalVisivel(true);
    } else if(modalVisivel){
      limparCampos();
    }
  },[notaSelecionada]);
  
  function limparCampos(){
    setNotaSelecionada({});
    setTitulo("");
    setCategoria("Pessoal");
    setTexto("");
  }

  async function salvarNota(){
    const nota = {
      titulo: titulo,
      categoria:categoria,
      texto: texto
    };

    if(!notaSelecionada?.id){
      await adicionarNota(nota);
    } else {
      nota.id = notaSelecionada.id;
      await atualizarNota(nota);
    }
  
    voltarParaListagem();
  }

  async function deletarNota(){
    if(notaSelecionada?.id){
      await removerNota(notaSelecionada);
    }

    voltarParaListagem();
  }

  function voltarParaListagem(){
    limparCampos();
    mostrarNotas();
    setModalVisivel(false);
  }

  function preencheModal(){
    setTitulo(notaSelecionada?.titulo);
    setCategoria(notaSelecionada?.categoria);
    setTexto(notaSelecionada?.texto);
  }

  return(
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {setModalVisivel(false)}}
      >
        <View style={estilos.centralizaModal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={estilos.modal}>
              <Text style={estilos.modalTitulo}>Criar nota</Text>
              <Text style={estilos.modalSubTitulo}>Título da nota</Text>
              <TextInput 
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={3}
                onChangeText={novoTitulo=> setTitulo(novoTitulo)}
                placeholder="Digite aqui seu título do lembrete"
                value={titulo}/>
                 <Text style={estilos.modalSubTitulo}>Categoria</Text>
                <CategoriaPicker 
                  categoria={categoria}
                  setCategoria={setCategoria}
                />
              <Text style={estilos.modalSubTitulo}>Conteúdo da nota</Text>
              <TextInput 
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={3}
                onChangeText={novoTexto => setTexto(novoTexto)}
                placeholder="Digite aqui seu lembrete"
                value={texto}/>
              <View style={estilos.modalBotoes}>
                <TouchableOpacity style={estilos.modalBotaoSalvar} onPress={() => {salvarNota();}}>
                  <Text style={estilos.modalBotaoTexto}>
                    {
                      notaSelecionada?.id ? 'Editar' : 'Criar'
                    }
                  </Text>
                </TouchableOpacity>
                {
                  notaSelecionada?.id 
                  &&
                  <TouchableOpacity style={estilos.modalBotaoDeletar} onPress={() => {deletarNota();}}>
                  <Text style={estilos.modalBotaoTexto}>
                    Apagar nota
                  </Text>
                </TouchableOpacity>
                }
                <TouchableOpacity style={estilos.modalBotaoCancelar} onPress={() => {setModalVisivel(false);limparCampos();}}>
                  <Text style={estilos.modalBotaoTexto}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => {
          setModalVisivel(true);
          console.log("EITIAJDKLFDKJFDJ")
        }} style={estilos.adicionarMemo}>
        <Text style={estilos.adicionarMemoTexto}>
           +
          </Text>
      </TouchableOpacity>
    </>
  )
}

const estilos = StyleSheet.create({
  centralizaModal: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  modal: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    marginTop: 8,
    marginHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  modalTitulo: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 18,
  },
  modalInput: {
    fontSize: 18,
    marginBottom: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#FF9A94",
  },
  modalPicker: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EEEEEE",
    marginBottom: 12,
  },
  modalSubTitulo: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "600"
  },
  modalBotoes: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalBotaoSalvar: {
    backgroundColor: "#2ea805",
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: "center",
  },
  modalBotaoDeletar: {
    backgroundColor: "#d62a18",
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: "center",
  },
  modalBotaoCancelar: {
    backgroundColor: "#057fa8",
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: "center",
  },
  modalBotaoTexto: {
    color: "#FFFFFF",
  },
  adicionarMemo: {
    backgroundColor: "#54ba32",
    justifyContent: "center",
    height: 64,
    width: 64,
    margin: 16,
    alignItems: "center",
    borderRadius: 9999,
    position: "absolute",
    bottom: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  adicionarMemoTexto: {
    fontSize: 32,
    lineHeight: 40,
    color: "#FFFFFF",
  }
});
