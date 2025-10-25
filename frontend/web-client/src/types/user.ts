export interface User {
  id: string;
  username: string;
  role: string[];
  token?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}
