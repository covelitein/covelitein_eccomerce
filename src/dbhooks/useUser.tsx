// dbhooks/useUser.ts
import { prismaClient } from "@/prisma";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  password: string;
  phone: string;
}

export default function userHandler() {
  /**
   * Registers a new user in the database.
   * @param userParams - The user data to be saved.
   * @returns The created user.
   */
  async function registerUser(userParams: User) {
    const user = await prismaClient.user.create({
      data: userParams,
    });

    return user;
  }

  /**
   * Fetches a user by their email address.
   * @param email - The user's email address.
   * @returns The user if found, or null.
   */
  async function getUserByEmail(email: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  // Expose the methods for external use.
  return {
    registerUser,
    getUserByEmail,
  };
}
