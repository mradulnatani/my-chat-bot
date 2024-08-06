"use client";
import { useEffect, useRef, useState } from "react";

interface Option {
  id: string;
  text: string;
}

interface Message {
  role: 'user' | 'system';
  content: string;
  options?: Option[];
}

const Chat = () => {
  const chatContainer = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const initialMessage: Message = {
    role: 'system',
    content: 'Hey there! welcome to customer service. What can I do for you?.......Suno!! grahak seva mein aapka swagat hai',
    options: [
      { id: 'option1', text: 'General Questions - samanya sawal' },
      { id: 'option2', text: 'New Player - nae khilaadee' },
      { id: 'option3', text: 'Recharge Problem - recharge ki samasya' },
      { id: 'option4', text: 'Game issue - khel ank' },
      { id: 'option5', text: 'Withdraw Problem - samasaya vapas len' },
    ]
  };

  useEffect(() => {
    // Initial bot message with options
    setMessages([initialMessage]);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim() === '') return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const botResponse: Message = {
        role: 'system',
        content: `You said: ${input}. Here are some options:`,
        options: [
          { id: 'option1', text: 'Tell me more' },
          { id: 'option2', text: 'Go back' },
        ]
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
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

  const handleOptionClick = async (optionText: string) => {
    const userMessage: Message = { role: 'user', content: optionText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);

    try {
      let botResponse: Message;

      switch (optionText) {
        case 'General Questions - samanya sawal':
          botResponse = {
            role: 'system',
            content: 'Here is a link to find general questions: [General Questions](https://example.com/general-questions)',
          };
          break;

        case 'New Player - nae khilaadee':
          botResponse = {
            role: 'system',
            content: 'Having problems being a new player in the game application? Let me help you!\n\nKya hamare game application me naya khiladi ban ne me aapko samasya aaa rhi hai? Mujhe aapki madad krne de',
            options: [
              { id: 'option1', text: 'How to play game? - Game kaise khele?' },
              { id: 'option2', text: 'Help me bind my bank account - Mere bank khate to aabaddh krne me meri sahayata kare' },
              { id: 'option3', text: 'Forgot password - Password bhool gaye' },
            ]
          };
          break;

        case 'Recharge Problem - recharge ki samasya':
          botResponse = {
            role: 'system',
            content: 'Do you have problems with your recharge? I am happy to help you with that!\n\nKya aapke recharge me koi samasya aarhi hai? Mujhe isme aapki madad krne me bhot khushi hogi!',
            options: [
              { id: 'option1', text: 'How to recharge? - Recharge kaise kre?' },
              { id: 'option2', text: 'My recharge has not come yet, please check - Mera recharge abhee tak nahi aya hai, kripya kr check kr len' },
            ]
          };
          break;

        case 'How to recharge? - Recharge kaise kre?':
          botResponse = {
            role: 'system',
            content: 'To top up, simply tap on "Deposit," select your desired amount and preferred payment method. Following that, fulfill the KYC requirements by providing the necessary information. Please ensure that you finalize your payment processing before you exit. Much appreciated.',
          };
          break;

        case 'My recharge has not come yet, please check - Mera recharge abhee tak nahi aya hai, kripya kr check kr len':
          botResponse = {
            role: 'system',
            content: 'Please send us a screenshot of your PAYMENT RECEIPT with the exact date and time with amount and UTR number or reference number On Our Email. Thank you.\n\nHumen apni Reciept bejhen Jis Pr samay aur Tareekh Dono Ho. Apni Receipt Humen iss Email Par Send Karen.',
          };
          break;

        case 'Withdraw Problem - samasaya vapas len':
          botResponse = {
            role: 'system',
            content: 'Do you have problems with your WITHDRAW? I am happy to help you with that!\n\nKya aapke withdraw me koi samasya aarhi hai? Mujhe isme aapki madad krne me bhot khushi hogi!',
            options: [
              { id: 'option1', text: 'How to withdraw?' },
              { id: 'option2', text: 'Why is my withdraw on REVIEWING status?' },
              { id: 'option3', text: 'Why is my withdraw processing? How long should I wait?' },
              { id: 'option4', text: 'Why my withdraw returned on game account?' },
              { id: 'option5', text: 'Why should I provide my ID?' },
              { id: 'option6', text: 'I am trying to withdraw, why am I getting WAGERS?' },
            ]
          };
          break;

        case 'Game issue - khel ank':
          botResponse = {
            role: 'system',
            content: 'Sir do you have any game issues? I am happy to help!\n\nKya aapko game me koi samasya aa rahi hai? Main madad karne ke liye yahan hoon!',
            options: [
              { id: 'option1', text: 'I am playing the game and it suddenly closed' },
              { id: 'option2', text: 'Cannot enter game room' },
              { id: 'option3', text: 'I lost the game please give refund' },
              { id: 'option4', text: 'Do you have any tips or tricks to win this game?' },
            ]
          };
          break;

        case 'I am playing the game and it suddenly closed':
          botResponse = {
            role: 'system',
            content: 'To achieve improved outcomes, kindly begin by restarting your Game app and ensuring a reliable and stable internet connection. Following this, we recommend waiting for a minimum of 15 minutes before attempting to log in once more. Your cooperation is appreciated. Thank you!\n\nIf problem still persist,\nKindly try to do this. Go to your mobile phone settings>Manager App>Search the game application>Clear data cache then restart again your game account and try again. Thank you!'
          };
          break;

        case 'Cannot enter game room':
          botResponse = {
            role: 'system',
            content: 'Regrettably, the game room you are attempting to access is currently at maximum capacity with players. Kindly consider retrying your entry after a duration of 1 hour or explore an alternative game room. We appreciate your understanding. Thank you.'
          };
          break;

        case 'I lost the game please give refund':
          botResponse = {
            role: 'system',
            content: 'Experiencing losses is a natural element of the game – there are moments of both winning and losing. Maintain your betting activity, for I am optimistic that fortune will smile upon you on this occasion.\n\nHowever, sir, you can still earn bonuses by inviting your friends to download and participate in our game.',
          };
          break;

        case 'Do you have any tips or tricks to win this game?':
          botResponse = {
            role: 'system',
            content: 'To win, you must be familiarized yourself in the game and take it seriously whenever you are playing. We also advised that you play in other gameroom because you never know where your luck will take you. If you want to continue having fun and playing, please recharge more and reach a high VIP level to receive a greater daily bonus',
          };
          break;

        case 'Go back':
          botResponse = initialMessage;
          break;

        default:
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          botResponse = {
            role: 'system',
            content: `You selected: ${optionText}. Here's more information:`,
            options: [
              { id: 'option1', text: 'Learn more' },
              { id: 'option2', text: 'Go back to main menu' },
            ]
          };
          break;
      }

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error processing option:', error);
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
          {message.options && (
            <div className="mt-2">
              {message.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.text)}
                  className="mr-2 mb-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="h-full flex flex-col">
      <div ref={chatContainer} className="flex-grow overflow-y-auto p-4">
        {renderMessages()}
        {loading && <div className="text-center text-gray-500">Thinking...</div>}
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
