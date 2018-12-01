export class User {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: number;
  photo: string;
}

export class UsersObj {
  sucess: boolean;
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: object;
  users: User[];
}

export class UserObj {
  sucess: boolean;
  user: User;
}