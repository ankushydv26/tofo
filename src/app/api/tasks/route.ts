// pages/api/tasks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'xoxo.txt');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Read tasks from the xoxo.txt file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to read tasks' });
      }
      const tasks = data.split('\n').filter(Boolean).map((line) => {
        const [text, completed] = line.split('|');
        return { text, completed: completed === 'true' };
      });
      res.status(200).json(tasks);
    });
  } else if (req.method === 'POST') {
    // Add a new task to the xoxo.txt file
    const { text } = req.body;
    const completed = false;
    fs.appendFile(filePath, `${text}|${completed}\n`, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to write task' });
      }
      res.status(201).json({ message: 'Task added' });
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
