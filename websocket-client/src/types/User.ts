export interface User {
  id?: string;
  name: string;
}

export interface UserAction extends User {
  action: string;
}
