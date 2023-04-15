axios.defaults.headers.common['Authorization'] = 'BSut5m20q7VmhDtxGHFWTdQI'
console.log(axios);
let nick = [];
let n = 0;
while (n < 2){
let nickname = prompt('Qual o seu nome?');
const nickObj = {name: nickname};
console.log(nickObj);
nick.push(nickObj);
n++;
let requisicaoName = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nickObj);
console.log(requisicaoName);
}
/*requisicaoName.then(alert);

function alert() {
    console.log('A resposta foi enviada');
}

function enviarMensagem () {
    alert('oi');
}*/