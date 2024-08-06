import type { NextApiRequest, NextApiResponse } from 'next';

const API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { content } = req.body;

    try {
      const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: content,
          max_tokens: 150
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error from OpenAI API:', response.status, errorText);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const message = data.choices[0].text.trim();
      res.status(200).json({ message });
    } catch (error) {
      console.error('Error fetching data from OpenAI API:', error);
      res.status(500).json({ error: 'Failed to fetch data from ChatGPT API' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
