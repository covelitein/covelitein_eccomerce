import { useDb } from "@/prisma";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  password: string;
  phone: string;
}

export default () => {
  async function registerUser(userParams: User) {
    const user = await useDb().user.create({
      data: userParams,
    });

    return user;
  }

  async function getUserByEmail(email: string) {
    const user = await useDb().user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  return {
    registerUser,
    getUserByEmail,
  };
};
