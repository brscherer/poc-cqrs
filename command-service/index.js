import express from 'express';
import { Kafka } from 'kafkajs';

const app = express();
app.use(express.json());

const kafka = new Kafka({
  clientId: 'command-service',
  brokers: ['localhost:9092']
});
const producer = kafka.producer();

app.post('/commands', async (req, res) => {
  const { type, payload } = req.body;
  await producer.connect();
  await producer.send({
    topic: 'cqrs-events',
    messages: [{ value: JSON.stringify({ type, payload }) }]
  });
  await producer.disconnect();
  res.status(200).json({ status: 'event sent' });
});

app.listen(3001, () => console.log('Command Service running on port 3001'));
