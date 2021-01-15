import { IncomingMessage, ServerResponse } from 'http';
export default function handler(req: IncomingMessage, res: ServerResponse) {
    if (req.method === 'POST') {
        throw new Error('Not yet!');
      } else {
          const url = req.url;
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ name: 'JSM', url }))
      }
}