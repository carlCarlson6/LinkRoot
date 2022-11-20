import { MessageClient } from "@khaosdoctor/hermod";

export const getMessageClient = (): MessageClient => {
    console.log("connecting to rabbitmq");
    return new MessageClient({
        queueHostname: "localhost"
    });
}