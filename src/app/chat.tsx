"use client";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: 'user' | 'system';
  content: string;
}

const Chat = () => {
  const chatContainer = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true); 

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: input }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const systemMessage: Message = { role: 'system', content: data.message };
      
      setMessages((prevMessages) => [...prevMessages, systemMessage]);
    } catch (error) {
      console.error('Error communicating with ChatGPT:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'system', content: 'Failed to get a response. Please try again.' }
      ]);
    } finally {
      setLoading(false); 
    }
  };

  
  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  }, [messages]);

  const renderMessages = () => {
    return messages.map((message, index) => (
      <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-green-700 text-white' : 'bg-gray-200 text-black'}`}>
          {message.content}
        </div>
      </div>
    ));
  };

  return (
    <div className="h-full flex flex-col">
      <div ref={chatContainer} className="flex-grow overflow-y-auto p-4">
        {renderMessages()}
        {loading && <div className="text-center text-gray-500">Thinking...</div>} {/* Loading indicator */}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button
            type="submit"
            className="bg-green-800 text-white px-4 py-2 rounded-r-lg hover:bg-green-500 transition duration-200"
            disabled={loading} 
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
