import Image from "next/image";
import Chat from "@/app/chat";

export default function Home() {
  return (
    <main className="min-h-screen bg-black p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-800 text-white p-4 flex items-center gap-4">
          <img
            src="https://utfs.io/f/a506cba1-9c61-4ffc-ace5-f9533434e252-1j9gr6.jpg"
            alt="chatbotlogo"
            className="h-12 w-12 rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold">Your AI Chat Bot</h1>
            <p className="text-sm text-gray-300">Ask anything</p>
          </div>
        </div>
        <div className="h-[calc(100vh-8rem)] overflow-y-auto p-4">
          <Chat />
        </div>
      </div>
    </main>
  );
}