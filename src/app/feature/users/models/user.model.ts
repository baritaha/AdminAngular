interface User{
  id?: string;
  name: string;
  email: string;
  password:string;
  role:string;
  // role: 'admin' | 'user' | 'guest';
}
export default User;
