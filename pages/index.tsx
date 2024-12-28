
import usecurrentUser from "@/hooks/usecurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
    redirect: {
      destination: "/auth",
      permanent: false,
    }
  }
}
return {
props: {}
}
}
export default function Home() {
  const { data: user } = usecurrentUser();
  return (
    <>
      <h1 className="text-2xl text-green-500">Netflix-clone</h1>
      <p className="text-white">Logged in as : {user?.name}</p>
        <button className="h-10 w-full bg-white" onClick={() => signOut()}></button>  
    
    </>
  );
}
