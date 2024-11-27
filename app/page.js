import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  // console.log(process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING);
  return (
    <div>
      <h1>Knowlix</h1>
      <Button>Hey its Knowlix</Button>

      <UserButton/>
    </div>
  );
}
