import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'query-service',
  brokers: ['localhost:9092']
});
const consumer = kafka.consumer({ groupId: 'cqrs-group' });

// Simple in-memory read store
const readStore = [];

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'cqrs-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      if (event.type === 'createUser') {
        readStore.push(event.payload);
      }
    }
  });
};

run().catch(console.error);

export { readStore };
