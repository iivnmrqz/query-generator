import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import "react-querybuilder/dist/query-builder.css";
import MainContainer from "@/components/QueryBuilder/MainContainer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function Home() {
  return (
    <main className={cn("bg-background-b min-h-screen font-sans antialiased", inter.variable)}>
      <MainContainer></MainContainer>
    </main>
  );
}
