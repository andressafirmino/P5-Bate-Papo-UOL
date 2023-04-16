axios.defaults.headers.common['Authorization'] = 'BSut5m20q7VmhDtxGHFWTdQI'
let nick = [];
let n = 0;
let verificar = '';
function perguntarNome () {
let nickname = prompt('Qual o seu nome?');
const nickObj = {name: nickname};
nick.push(nickObj);
n++;
let requisicaoName = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nickObj);
requisicaoName.then(nickAceito);
requisicaoName.catch(nickNaoAceito);
//
}
perguntarNome();
function nickAceito () {
    console.log('funcionou');
    //exibirMensagens();
}
function nickNaoAceito (naofoi) {
    //apresentar novo prompt até que o nome seja válido
    perguntarNome();
}

//function exibirMensagens (enviadas) {

    let enviadasDoServidor = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    console.log(enviadasDoServidor);
    const mensagem = document.querySelector('.mensagens');
    mensagem.innerHTML = '';

    for (let i = 0; i < enviadasDoServidor.lenght; i++) {

    }
}
/*function enviarMensagem () {
    alert('oi');
}*/