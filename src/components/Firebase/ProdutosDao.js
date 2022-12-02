import {
    ref,
    query,
    orderByChild,
    onChildAdded,
    off,
    endAt,
    endBefore,
    equalTo,
    startAt,
    startAfter,
    onValue,
    limitToFirst,
    limitToLast
} from "firebase/database"

function getOrderByChild(order,db,callback){
    //Exemplo
    console.log(order);
    const refDB = ref(db,'produtos/');
    const consulta = query(refDB,orderByChild(order))
    onChildAdded(consulta,callback) // evento
}

function getFilterByChild(filter,value,db,callback){ 
    
    const refDB = ref(db,'produtos/');
    const consulta = query(refDB,orderByChild(filter),startAt(value))
    onChildAdded(consulta,callback);
}   

function getMostExpensive(db,setValue,list){ //startAt()
    // implement aqui
    /**
     *     Nesta função é necessário implementar o callback,
     * pois será necessário ordenar os resultados no cliente
     * pelos produtos mais caros (reverso). É necessário chamar 
     * a função setValue() e o array list passados como parametro.
     * Para repassar os resultados do client React utiliza-se a função
     * setValue() com os parametros [...list], ou seja, setValue([...list])
     * onde em list deverá estar o array de produtos ordenados pelo preco
     * mais caro. Lembrando que list é um array, use os métodos para trabalhar
     * com arrays em JavaScript! Dica: usem reverse() ou unshift().
     * 
     * setValue = uma função referencia do banco para alterar os dados da lista
     * list = a lista pra alterar
     * 
     * fazer ordem reversa (aula 03) no array "list"
     * 
     * 
     * 
     * 
     * ordenar pelo preço, retorna o objeto como array, e faz o reverse desse array 
     * 
     * setValue é somente quando tudo estiver pronto
     * */ 

    const refDB = ref(db,'produtos/')
    const consulta = (query(refDB,orderByChild('preco')))

    //function(){}
    //()=>{}
    //n=>n**2

    let tempList = []
    onChildAdded(consulta, dados=>{
        tempList.push(dados.val())
    })

    list = tempList.reverse()
    setValue(list)
}

function getMostCheap(db,callback){
    
    const refDB = ref(db,'produtos/');
    const consulta = query(refDB,orderByChild('preco'),startAt(0))

    onChildAdded(consulta,callback)
}

function getPriceRange(value,db,callback){//0--->limit
    
    const refDB = ref(db,'produtos/');
    const consulta = query(refDB,orderByChild('preco'),startAt(0),endAt(Number(value)))
    
    onChildAdded(consulta,callback)
}

export {getOrderByChild, getFilterByChild, getMostExpensive, getMostCheap, getPriceRange}
