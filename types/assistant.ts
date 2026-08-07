export interface ChatMessage {

  id: string;

  role: "USER" | "ASSISTANT";

  content: string;

  createdAt: Date;

}