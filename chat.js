// Replace with your public HTTPS RAG webhook. Configure CORS on the server.
const WEBHOOK_URL = 'https://lucianocl.app.n8n.cloud/webhook/suporte';
const chat = document.querySelector('#chat');
const form = document.querySelector('#form');
const input = document.querySelector('#message');
const messages = document.querySelector('#messages');
const sessionId = globalThis.crypto?.randomUUID?.() || String(Date.now());
for (const id of ['open','bubble']) document.getElementById(id).onclick = () => {chat.hidden = false; input.focus();};
document.querySelector('#close').onclick = () => chat.hidden = true;
function add(text, type='') {const p = document.createElement('p');p.textContent=text;p.className=type;messages.append(p);messages.scrollTop=messages.scrollHeight;}
form.onsubmit = async e => {e.preventDefault();const message=input.value.trim();if(!message)return;add(message,'user');input.value='';if(!WEBHOOK_URL){add('O assistente ainda não está ligado.');return;}const button=form.querySelector('button');button.disabled=true;try{const res=await fetch(WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,sessionId})});if(!res.ok)throw Error();const data=await res.json();add(data.output || data.answer || data.response || 'Sem resposta.');}catch{add('Não foi possível contactar o assistente. Tente novamente.');}finally{button.disabled=false;}};