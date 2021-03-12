import fs from 'fs';
import path from 'path';

export const getPath = () => {
  // store to database or to a file
  return path.join(process.cwd(), 'data', 'feedback.json'); // cwd current working directory
};

export const getFeedback = filePath => {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
};

const handler = (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;
    const feedback = req.body.feedback;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      feedback
    };

    const filePath = getPath();
    const parsedData = getFeedback(filePath);

    parsedData.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(parsedData));
    res.status(201).json({ message: 'Update' });
  } else {
    const filePath = getPath();
    const parsedData = getFeedback(filePath);

    res.status(200).json({ data: parsedData });
  }
};

export default handler;
