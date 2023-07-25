const amqplib = require("amqplib");
const {MESSAGE_BROKER_URL, EXCHANGE_NAME} = require('./../config/serverConfig');
console.log(MESSAGE_BROKER_URL);
console.log(typeof MESSAGE_BROKER_URL);
console.log(EXCHANGE_NAME);

const createChannel = async () => {
  try {
    console.log("1");
    //Create a connection
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);

    console.log("Connection done");

    //Create a channel with that connection
    const channel = await connection.createChannel();

    console.log("Channel created");
    //assert exchange now
    //For maintaining all queues, distribute all messages to the queue
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);

    return channel;
  } catch (error) {
    console.log("Error in channel creation");
    throw error;
  }
};

const subscribeMessage = async (channel, service, binding_key) => {
    const applicationQueue = await channel.assertQueue('QUEUE_NAME');

    channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

    channel.consume(applicationQueue.queue, msg => {
        console.log("Received data");
        console.log(msg.content.toString());
        channel.ack(msg);
    })
}

const publishMessage = async (channel, binding_key, message) => {
  try {
    await channel.assertQueue('QUEUE_NAME');
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  } catch (error) {
    throw error;
  }
}

module.exports = {
    subscribeMessage,
    createChannel,
    publishMessage
}