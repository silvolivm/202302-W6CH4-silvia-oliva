import http from 'http';
import url from 'url';
import * as dotenv from 'dotenv';
import { calculator } from './calculator';

dotenv.config();

const PORT = process.env.PORT || '4300';

const server = http.createServer((req, resp) => {
  if (req.method === 'GET') {
    if (!req.url) {
      server.emit('error', new Error('Error 404'));
      return;
    }

    const { pathname } = url.parse(req.url);
    if (pathname !== '/calculator') {
      server.emit('error', new Error('codigo de error'));
      return;
    }

    if (pathname === '/calculator') {
      const URLParams = new URL(req.url, `http://localhost:'` + PORT);
      const query = URLParams.searchParams;
      const n1 = Number(query.get('a'));
      const n2 = Number(query.get('b'));
      const sum = n1 + n2;
      const rest = n1 - n2;
      const multiply = n1 * n2;
      const divide = n1 / n2;
      resp.write('Estos son tus datos de ' + pathname);
    }
  }
});

server.listen(PORT);
