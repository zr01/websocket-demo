export interface Message {
  id?: string;
  date?: Date;
  type: string;
  userId: string;
  content?: string;
}
