import User from '../models/user.model';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'abdel-bari',
    email: 'abdel-bari@gmail.com',
    password: 'xyz12345',
    role: 'admin',
  },
  {
    id: 'user-2',
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    password: 'x$ftghjkkll',
    role: 'user',
  },
  {
    id: 'user-3',
    name: 'samer',
    email: 'samer@gmail.com',
    password: 's1@bghju8888',
    role: 'user',
  },
  { id: 'user-4', 
    name: 'ali',
     email: 'ali@gmail.com', 
     password: '123456',
      role: 'user'
     },
  {
    id: 'user-5',
    name: 'mohammad',
    email: 'mohammad@gmail.com',
    password: 'pw123456',
    role: 'user',
  },
  {
    id: 'user-6',
    name: 'Sarah',
    email: 'sarah@gmail.com',
    password: 'xyz67890',
    role: 'user',
  },
  {
    id: 'user-7',
    name: 'Layla',
    email: 'layla@gmail.com',
    password: 'abc12345',
    role: 'user',
  },
  {
    id: 'user-8',
    name: 'Khalid',
    email: 'khalid@gmail.com',
    password: 'khalid_pw',
    role: 'user',
  },
  {
    id: 'user-9',
    name: 'Amira',
    email: 'amira@gmail.com',
    password: '123amira',
    role: 'user',
  },
  {
    id: 'user-10',
    name: 'Omar',
    email: 'omar@gmail.com',
    password: 'pw7890123',
    role: 'user',
  },
];

export const getUsers = (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(users);
    }, 3000);
  });
};
export const addUsers = (user: User): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      user.id = 'user-' + (users.length + 1);
      users.push(user);
      resolve(user);
    }, 3000);
  });
};
//edit user
export const editUser = (user: User): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = users.findIndex((u: User) => u.id === user.id);
      if (index !== -1) {
        users[index] = user;
        resolve(user);
      } else {
        reject('User not found');
      }
    }, 3000);
  });
};

export const getUser = (id: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((user: User) => user.id === id);
      if (user) {
        resolve(user);
      } else {
        reject('User not found');
      }
    }, 1000);
  });
};
export const updateUser = (userUpdated: User): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = users.findIndex(
        (user: User) => user.id === userUpdated.id
      );
      if (userIndex !== -1) {
        // Update the properties of the existing user
        users[userIndex] = { ...users[userIndex], ...userUpdated };
        resolve(users[userIndex]); // Resolve the updated user
      } else {
        reject('User not found');
      }
    }, 1000);
  });
};
export const deleteUser = (u: User): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = users.findIndex((user: User) => user.id === u.id);
      if (userIndex !== -1) {
        users.splice(userIndex, 1);
        resolve();
      } else {
        reject('User not found');
      }
    }, 1000);
  });
};
//login
export const loginUser = (name: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (user: User) => user.name === name && user.password === password
      );
      if (user) {
        resolve(user);
      } else {
        reject('Incorrect name or password');
      }
    }, 1000);
  });
};
