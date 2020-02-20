let online;

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const userId = urlParams.get('id');

if(!token || !userId) {
  alert('Você precisa possuir um token de usuário');
}

function start () {
  let ws = adonis.Ws('ws://localhost:3333');
  ws = ws.withJwtToken(token);
  ws.connect();
  ws.on('open', () => {
    online = true;
  })

  ws.on('error', () => {
    online = false;
  })

  return ws;
}

function ajax (url, data, method = "post") {
  return new Promise((resolve, reject) => {
    $.ajax(`http://localhost:3333${url}`, {
      method,
      headers : {
        Authorization: `Bearer ${token}`,
      },
      dataType: "json",
      data
    })  
  })
}

function $likes (likes, type = "post") {
  $(`span[data-${type}-id="${likes.id}"]`).text(likes.count);
  
}