import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";

@WebSocketGateway()
export class AppGateway {
  @SubscribeMessage("echo")
  echo(@MessageBody() data: unknown) {
    return data;
  }
}
