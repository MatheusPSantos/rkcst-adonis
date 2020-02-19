let online;

function start () {
  let ws = adonis.Ws('ws://localhost:3333');
  ws.connect();
  ws.on('open', () => {
    online = true;
  })

  ws.on('error', () => {
    online = false;
  })
}