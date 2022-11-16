import http from 'http';
const server = http.createServer((req, res) => {
  res.end('Trabajando con NodeJS + Babel');
}).listen(4001);
console.log('Estamos en el tutorial de Node+Babel :)');
export default server;