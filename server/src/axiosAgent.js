import axios from 'axios';
import http from 'http';
import https from 'https';

export const agent = {
  http: new http.Agent({ keepAlive: true }),
  https: new https.Agent({ keepAlive: true })
}

export const client = axios.create({
  httpAgent: agent.http,
  httpsAgent: agent.https,
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 Chrome/113 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
  }
})

