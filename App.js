import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import CategoriaPicker from "./src/componentes/CategoriaPicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotaEditor from "./src/componentes/NotaEditor";
import Nota from "./src/componentes/Nota";
import { useEffect, useState } from "react";
import { buscarNotas, buscarNotasPorCategoria, criarTabela } from "./src/servicos/Notas";

export default function App() {

  const [notas, setNotas] = useState([]);
  const [notaSelecionada, setNotaSelecionada] = useState({});
  const [filtroPorCategoria, setFiltroPorCategoria ] = useState("Todas");

  useEffect(function(){
    criarTabela();

    if(filtroPorCategoria === "Todas"){
      mostrarNotas();
    } else{
      mostrarNotasPorCategoria();
    }
  
  },[filtroPorCategoria]);

  async function mostrarNotas(){
      const todasAsNotas = await buscarNotas();
      setNotas(todasAsNotas);
      
  }

  async function mostrarNotasPorCategoria(){
    const notasPorCategoria = await buscarNotasPorCategoria(filtroPorCategoria);
    setNotas(notasPorCategoria);
  }


  return (
    <SafeAreaView style={estilos.container}>
      <CategoriaPicker
        categoria={filtroPorCategoria}
        setCategoria={setFiltroPorCategoria}
        opcaoTodas={true}
      />
      <FlatList 
        data={notas}
        renderItem={(nota)=> <Nota {...nota} setNotaSelecionada={setNotaSelecionada}/>}
        keyExtractor={(nota) => nota.id}
      />
      <NotaEditor mostrarNotas={mostrarNotas} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada}/>
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
});
