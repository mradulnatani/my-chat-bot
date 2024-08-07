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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<{ gameId: string, phoneNumber: string }>({ gameId: '', phoneNumber: '' });
  const [isUserDetailsCollected, setIsUserDetailsCollected] = useState<boolean>(false);

  // const initialMessage: Message = {
  //   role: 'system',
  //   content: 'Please enter your Game ID and phone number to proceed (format: GameID,PhoneNumber)'
  // };


  const initialMessage: Message = {
    role: 'system',
    content: `
    Welcome to GOLDSBET! Our AI bot will respond to your concern, so please click on your concern the answer will all be given to you. Thank you!<br><br>
    We encourage you to join our Telegram Public Discussions Group and Channel for the latest updates! Click these links to join:<br>
    <a href="https://t.me/Goldsbet_VIP" target="_blank" style="text-decoration: underline; color: blue;">https://t.me/Goldsbet_VIP</a><br>
    <a href="https://t.me/+Z4mYeHQsJUg0OWNl" target="_blank" style="text-decoration: underline; color: blue;">https://t.me/+Z4mYeHQsJUg0OWNl</a>
  `, options: [
      { id: 'option1', text: 'General Questions - samanya sawal' },
      { id: 'option2', text: 'New Player - nae khilaadee' },
      { id: 'option3', text: 'Recharge Problem - recharge ki samasya' },
      { id: 'option4', text: 'Game issue - khel ank' },
      { id: 'option5', text: 'Withdraw Problem - samasaya vapas len' },
      { id: 'option6', text: 'Birthday Bonus' },
      { id: 'option7', text: 'Wagering' },
      { id: 'option8', text: 'Frozen Account' },
      { id: 'option9', text: 'How to become an Agent' },
    ]
  };

  const handleModalSubmit = () => {
    if (userDetails.gameId && userDetails.phoneNumber) {
      setIsModalOpen(false);
      setMessages((prevMessages) => [...prevMessages, initialMessage]);
    } else {
      // Handle invalid input
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'system', content: 'Please enter both Game ID and Phone Number.' }
      ]);
    }
  };


  const handleDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [event.target.name]: event.target.value
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim() === '') return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    if (!isUserDetailsCollected) {
      const [gameId, phoneNumber] = input.split(',');
      if (gameId && phoneNumber) {
        setUserDetails({ gameId: gameId.trim(), phoneNumber: phoneNumber.trim() });
        setIsUserDetailsCollected(true);
        setMessages((prevMessages) => [...prevMessages, initialMessage]);
      } else {
        setMessages((prevMessages) => [...prevMessages, {
          role: 'system',
          content: `
          <p>For More Information Kindly Visit Our Website <a href="https://goldsbet.com" target="_blank" style="text-decoration: underline; color: blue;">GOLDSBET.COM</a></p>
          <p>For More Inquiries Please Send us Email On <a href="mailto:Goldsbetvip@gmail.com" style="text-decoration: underline; color: blue;">Goldsbetvip@gmail.com</a></p>
        `
        }]);
      }
    } else {
      // Existing code for handling main menu options
      try {
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
            content: 'Here are some general questions:',
            options: [
              { id: 'option1', text: 'How long does a withdrawal take?' },
              { id: 'option2', text: 'How long does it take to recharge?' },
              { id: 'option3', text: 'How to log in to the game after registration?' },
              { id: 'option4', text: 'How to make a withdrawal?' },
              { id: 'option5', text: 'How to play?' },
              { id: 'option6', text: 'How to Recharge?' },
              { id: 'option7', text: 'How to Register to the game?' },
              { id: 'option8', text: 'Is my money safe?' },
              { id: 'option9', text: 'Is my money secure during the withdrawal process?' },
              { id: 'option10', text: 'What if I need talk to a real customer care or human?' },
              { id: 'option11', text: 'What to do if you forget your password?' },
              { id: 'option12', text: 'Why do I need to provide my ID and recharge information for withdrawal?' },
            ]
          };
          break;

        case 'New Player - nae khilaadee':
          botResponse = {
            role: 'system',
            content: 'Having problems being a new player in the game application? Let me help you!\n\nKya hamare game application me naya khiladi ban ne me aapko samasya aaa rhi hai? Mujhe aapki madad krne de',
            options: [
              { id: 'option1', text: 'How to play game? - Game kaise khelen?' },
              { id: 'option2', text: 'Help me bind my bank account - Mere bank khaate ko Game se Jodne mein meree sahaayata karen.' },
              { id: 'option3', text: 'Help me bind my UPI account - Meri UPI Ko Game Account se Jodney Me Meri Sahatya karen' },
              { id: 'option3', text: 'Forgot Password - Password bhool gaye' },
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
              { id: 'option7', text: 'Withdraw Not Received After Success?' },
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

        case 'Birthday Bonus':
          botResponse = {
            role: 'system',
            content: `
          <div class="formatted-text">
            <strong>Goldsbet Delight To Celebrate your Birthday!</strong><br>
            Kindly for claiming your Birthday bonus, you need to send us the following details on our email:<br><br>
            - <strong>Game ID</strong><br>
            - <strong>Aadhaar Card</strong><br><br>
            <strong>Our Email:</strong> Goldsbetvip@gmail.com
          </div>
              `,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Wagering':
          botResponse = {
            role: 'system',
            content: `
            <div class="formatted-text">
              <strong>Wagering</strong><br>
              Apologies, you need to complete the wager set by the system before you can withdraw. Thank you for your cooperation.
            </div>
            `,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Frozen Account':
          botResponse = {
            role: 'system',
            content: `
          <div class="formatted-text">
            <strong>Frozen Account</strong><br>
            Players who open multiple or fraudulent accounts will be disqualified from the game. The remaining amount may be forfeited and the account will be frozen.
            For the solution you have to register new account on GOLDSBET.COM & make you must make your account valid and donot use any multiple accounts in future
          </div>
              `,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'How to become an Agent':
          botResponse = {
            role: 'system',
            content: `
          <div class="formatted-text">
            <strong>How to become an Agent</strong><br>
            To become agent share your referral links  with your friends & family members to get more commission bonuses & agent salaries 
            kindly check refer & Earn section in offer Tab For more details of your subordinates kindly check agent tab in lobby
            <img src="/howtobecomeagent.jpg" alt="Game Instructions" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
              `,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;


        // Recharge Problem Options Responses start here
        case 'How to recharge? - Recharge kaise kre?':
          botResponse = {
            role: 'system',
            content: 'To top up, simply tap on "Deposit," select your desired amount and preferred payment method. Following that, fulfill the KYC requirements by providing the necessary information. Please ensure that you finalize your payment processing before you exit. Much appreciated.',
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };

          break;

        case 'My recharge has not come yet, please check - Mera recharge abhee tak nahi aya hai, kripya kr check kr len':
          botResponse = {
            role: 'system',
            content: 'Please send us a screenshot of your PAYMENT RECEIPT with the exact date and time with amount and UTR number or reference number on our email on Goldsbetvip@gmail.com. Thank you. Humen apni Reciept bejhen Jis Pr samay aur Tareekh Dono Ho. Apni Receipt Humen iss Email Par Send Karen.',
          options: [
            { id: 'learn_more', text: 'Learn more' },
            { id: 'main_menu', text: 'Go back to main menu' }
          ]
          };
          break;

        // General Options Responses start here
        case 'How long does a withdrawal take?':
          botResponse = {
            role: 'system',
            content: "Usually, the withdraw is immediately (5 To 45minutes). But sometimes, it will be at most up to 24-72 hours due to the bank delay, but you can track your withdrawal with our Customer Support for further help.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'How long does it take to recharge?':
          botResponse = {
            role: 'system',
            content: "Usually the recharge credit to your game account immediately (5-10min), but sometimes due to the delay of bank, we cannot receive your payment to your game account immediately, but you can track your payment with our Customer Support for further help.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'How to log in to the game after registration?':
          botResponse = {
            role: 'system',
            content: "Log On is only for registered players. Click Log on button. Enter your registered mobile number and the password you have set.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'How to make a withdrawal?':
          botResponse = {
            role: 'system',
            content: "Click Withdraw on your game lobby, if you are a new player you need to bind you Bank account first after binding enter your desire amount to withdraw, then click Withdraw button.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'How to play?':
          botResponse = {
            role: 'system',
            content: "For better understanding of the game, please read the rules and instructions of the game. The rules are inside every game. Thank you.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'How to Recharge?':
          botResponse = {
            role: 'system',
            content: "Open your game account, at the game lobby page click Deposit. Select your desire amount of recharge then you may now proceed by clicking Add Cash. Select your desire method of payment and click Next step then it will automatically direct you with the payment merchant page",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'How to Register to the game?':
          botResponse = {
            role: 'system',
            content: "For new players please click On Register. Then proceed to Fill out the information with your mobile phone number and set your own desire password. Click OTP (One Time Pin) then you will receive code through text. After you received the code click Confirm to completely registered. Welcome and enjoy the game!",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Is my money safe?':
          botResponse = {
            role: 'system',
            content: "Our Game application make use of highly advanced security features to ensure the safekeeping of financial and personal data gathered from players. We make sure that we keep up with data protection legislation and that their slots and other games get audited by external security companies.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Is my money secure during the withdrawal process?':
          botResponse = {
            role: 'system',
            content: "Yes. Please don't worry about your money because we assure you that it is secured during the process.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'What if I need talk to a real customer care or human?':
          botResponse = {
            role: 'system',
            content: "Just message to the AI that you need talk to a real customer care or human, then wait patiently for the connection.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'What to do if you forget your password?':
          botResponse = {
            role: 'system',
            content: "Click Forget password button to set again a new password. Fill out the asked information and then Click OTP (One Time Pin) then you will receive code through text. After you received the code click OK to completely change your new password. It can be seen on Log on.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Why do I need to provide my ID and recharge information for withdrawal?':
          botResponse = {
            role: 'system',
            content: "This is for the safety of our players. Our company is making sure that we will send the withdrawal money to the correct person. Please don't worry, because all player information is secured.",
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Learn more':
          botResponse = {
            role: 'system',
            content: `
            <p>For More Information Kindly Visit Our Website <a href="https://goldsbet.com" target="_blank" style="text-decoration: underline; color: blue;">GOLDSBET.COM</a></p>
            <p>For More Inquiries Please Send us Email On <a href="mailto:Goldsbetvip@gmail.com" style="text-decoration: underline; color: blue;">Goldsbetvip@gmail.com</a></p>
          `,
            options: [
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Go back to main menu':
          botResponse = initialMessage;
          break;
        // New Player Options Responses start here

        case 'How to play game? - Game kaise khelen?':
          botResponse = {
            role: 'system',
            content: `For better understanding of the game, please read the rules and instructions of the game. The rules are inside every game. You can find it.Thank you.

            khel ko behatar dhang se samajhane ke lie krpaya khel ke niyam aur nirdesh padhen. niyam har khel ke andar hote hain. aap ise skreen ke ooparee daen kone mein heere par pa sakate hain. dhanyavaad.

            <img src="/howtoplaygame.jpg" alt="Game Instructions" style={{ maxWidth: '100%', height: 'auto' }} />`,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Help me bind my bank account - Mere bank khaate ko Game se Jodne mein meree sahaayata karen.':
          botResponse = {
            role: 'system',
            content: `
          We will help you bind your BANK account. Please provide bank card information in this format. Please type in CAPITAL LETTERS. Thank you!<br><br>
          
          Account number:<br>
          IFSC:<br>
          BANK NAME:<br>
          Name:<br><br>
          
          Kindly send a screenshot of your Bank account/Passbook that shows the details that you have provided to Goldsbetvip@gmail.com. Thank you.
              `,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;


        case 'Help me bind my UPI account - Meri UPI Ko Game Account se Jodney Me Meri Sahatya karen':
          botResponse = {
            role: 'system',
            content: `
            <div class="formatted-text">
              We will help you to change your UPI Information. But first, you need to fill out this for our reference. (CAPITAL LETTERS ONLY)<br>
              UPI Name:<br>
              UPI Mobile Number:<br>
              UPI ID:<br><br>
              Kindly send a screenshot of your Bank account/Passbook that shows the details that you have provided. Thank you.
            </div>`,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Forgot Password - Password bhool gaye':
          botResponse = {
            role: 'system',
            content: `
            <div class="formatted-text">
              Click "Forget Password". Enter your phone number and new password. After that, you will receive an SMS with OTP or verification code for you to reset the password of the game account.<br>
              "Forget Password" par Click karen. Apna phone number aur naya password darj karen. Uske baad, aapko game account ka password reset karne ke liye OTP ya verification code ke saath ek SMS prapt hoga. Taaki aap apne surakshit banke se apna paisa nikaal saken. Dhanyavaad.
            </div>`,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        // Withdraw Problem Options Responses start here

        case 'How to withdraw?':
          botResponse = {
            role: 'system',
            content: `
            <div class="formatted-text">
              <strong>How to withdraw?</strong><br>
              Click Withdraw on your game lobby, if you are a new player you need to bind your Bank account first after binding enter your desired amount to withdraw, then click Withdraw button.
              <img src="/howtowithdraw.jpg" alt="Game Instructions" style={{ maxWidth: '100%', height: 'auto' }} />
              </div>`,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Why is my withdraw on REVIEWING status?':
          botResponse = {
            role: 'system',
            content: `
            <div class="formatted-text">
              <strong>Why is my withdraw on REVIEWING status?</strong><br>
              Sir upon checking your withdrawal is still being reviewed, please wait patiently because we are assuring you that the game runs fair and square for all our players.
            </div>`,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Why is my withdraw processing? How long should I wait?':
          botResponse = {
            role: 'system',
            content: `
            <div class="formatted-text">
              <strong>Why is my withdraw PROCESSING?</strong><br>
              After reviewing our records, we can see that your withdrawal is currently being processed. Kindly exercise patience while waiting. Typically, withdrawals are processed promptly (within 5-10 minutes). However, there might be occasions where it could take up to a maximum of 24-72 hours due to potential delays from the bank. If the issue persists beyond the 24-72 hour waiting period, please mail us the precise withdrawal order number and attach a screenshot on Goldsbetvip@gmail.com. Thank you!
            </div>`,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Withdraw Not Received After Success?':
          botResponse = {
            role: 'system',
            content: `
          <div class="formatted-text">
            We can see that your withdrawal is successful. Please wait patiently as typically, withdrawals are processed promptly (within 5-10 minutes). However, there might be issues due to the bank, and it could take 3 to 5 business days. If the issue persists beyond this waiting period, please email us at <a href="mailto:Goldsbetvip@gmail.com">Goldsbetvip@gmail.com</a>.<br><br>
            <strong>Required Documents:</strong><br>
            - Game Account<br>
            - Withdrawal Screenshot<br>
            - Withdrawal Amount<br>
            - Bank Statement in PDF Format with Password<br><br>
            Thank you!
          </div>
              `,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Why my withdraw returned on game account?':
          botResponse = {
            role: 'system',
            content: `
            <div class="formatted-text">
              <strong>Why my withdraw returned on game account?</strong><br>
              The primary causes include issues related to bank failure, exceeding withdrawal limits, and providing incorrect bank information. For a more precise understanding of the reasons, please consider attaching a screenshot of your withdrawal page. This will enable our human customer support team to provide you with an accurate response. We appreciate your cooperation.
            </div>`,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'Why should I provide my ID?':
          botResponse = {
            role: 'system',
            content: `
            <div class="formatted-text">
              <strong>Why should I provide my ID?</strong><br>
              Collecting your personal information and verifying your ID is crucial in the verification process for various reasons. It ensures identity verification, prevents fraud, complies with legal regulations, enhances security, verifies age, and promotes responsible gaming. Overall, these measures maintain platform security, legality, and integrity while safeguarding both you as the player and the platform.
            </div>`,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        case 'I am trying to withdraw, why am I getting WAGERS?':
          botResponse = {
            role: 'system',
            content: `
            <div class="formatted-text">
              <strong>I am trying to withdraw, why am I getting WAGERS?</strong><br>
              Please be aware that our platform operates on a Technology Running System, and thus, game control is beyond our scope. However, if you adhere to game rules and maintain sufficient bets, you can avoid any issues related to wagering. Once you enter the game room, events occur independently of our influence. Rest assured, fairness in game outcomes is guaranteed for all players. Thank you.
            </div>`,
            options: [
              { id: 'learn_more', text: 'Learn more' },
              { id: 'main_menu', text: 'Go back to main menu' }
            ]
          };
          break;

        // Game issue Options Responses start here

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

        case 'Go back to main menu':
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
        <div
          className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-green-700 text-white' : 'bg-green-100 text-black'}`}
          dangerouslySetInnerHTML={{ __html: message.content }}
        />
        {message.options && (
          <div className="mt-2">
            {message.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.text)}
                className="mr-2 mb-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                {option.text}
              </button>
            ))}
          </div>
        )}
      </div>
    ));
  };


  return (
    <div className="h-full flex flex-col">
      {isModalOpen && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4 text-black-400">
              Please enter your details to proceed
            </h2>
            <input
              type="text"
              name="gameId"
              placeholder="Game ID"
              value={userDetails.gameId}
              onChange={handleDetailsChange}
              className="block w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={userDetails.phoneNumber}
              onChange={handleDetailsChange}
              className="block w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
            />
            <button
              onClick={handleModalSubmit}
              className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition duration-200 w-full"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {!isModalOpen && (
        <div className="flex-grow flex flex-col">
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
      )}
    </div>
  );

};

export default Chat;