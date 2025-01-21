import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  const onlogout = ()=> {
      signOut({ callbackUrl: "/login" }).then(() => {
        router.push("/login");
      });

  }

  return {onlogout}
};
