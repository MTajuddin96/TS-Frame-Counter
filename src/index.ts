import express from 'express';
import http from 'http';
import cors from 'cors';
import router from './router/router';

const app = express()

app.use(cors({
  credentials: true
}))



const server = http.createServer(app)

server.listen(4000, () => console.log('Server running'))



app.use('/api', router())