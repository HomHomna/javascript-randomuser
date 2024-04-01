import Image from "next/image";
import { Inter } from "next/font/google";
import Screen from "@/components/Screen";
import { Card } from "antd";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
    // className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex justify-center !w-[100vw]">
        <Screen />
      </div>
    </main>
  );
}
