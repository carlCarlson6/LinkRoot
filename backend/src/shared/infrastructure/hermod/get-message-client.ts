import { MessageClient } from "@khaosdoctor/hermod";

export const getMessageClient = (): MessageClient => {
    const messageClient: MessageClient = new MessageClient({
        queueHostname: "localhost"
    });
    return messageClient;
}