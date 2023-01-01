import {db} from "./SQLite.js";

export function criarTabela(){
    db.transaction((transaction)=>{
        transaction.executeSql(`
            CREATE TABLE IF NOT EXISTS
            Notas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT,
                categoria TEXT,
                texto TEXT
            );
        `);
    });
}


export async function adicionarNota(nota){
    return new Promise((resolve)=>{
        db.transaction((transaction)=>{
            transaction.executeSql(`
            INSERT INTO Notas 
            (titulo, categoria, texto) 
            VALUES (?, ?, ?);`,[nota.titulo, nota.categoria,nota.texto],
            () => {
                resolve("Nota adicionada com sucesso");
            });
        });
    });

}

export async function atualizarNota(nota){
    return new Promise((resolve)=>{
        db.transaction((transaction)=>{
            transaction.executeSql(`
            UPDATE Notas 
            SET titulo = ?, categoria = ?, texto = ? where Id = ?;`,
            [nota.titulo, nota.categoria,nota.texto,nota.id],
            () => {
                resolve("Nota atualizada com sucesso");
            });
        });
    });

}

export async function removerNota(nota){
    return new Promise((resolve)=>{
        db.transaction((transaction)=>{
            transaction.executeSql(`
            DELETE FROM Notas 
            where Id = ?;`,
            [nota.id],
            () => {
                resolve("Nota removida com sucesso");
            });
        });
    });

}

export async function buscarNotas(){
    return new Promise((resolve)=>{
        db.transaction((transaction)=>{
            transaction.executeSql(`
            SELECT * FROM Notas`,[],
            (transaction, resultado) => {
                resolve(resultado.rows._array);
            });
        });
    });

}

export async function buscarNotasPorCategoria(categoria){
    return new Promise((resolve)=>{
        db.transaction((transaction)=>{
            transaction.executeSql(`
            SELECT * FROM Notas where categoria = ?`,[categoria],
            (transaction, resultado) => {
                resolve(resultado.rows._array);
            });
        });
    });

}
