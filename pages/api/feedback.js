import fs from 'fs';
import path from 'path';

const handler = (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;
    const feedback = req.body.feedback;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      feedback
    };

    // store to database or to a file
    const filePath = path.join(process.cwd(), 'data', 'feedback.json'); // cwd current working directory
    const fileData = fs.readFileSync(filePath);
    const parsedData = JSON.parse(fileData);

    parsedData.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(parsedData));
    res.status(201).json({ message: 'Update' });
  } else {
    const filePath = path.join(process.cwd(), 'data', 'feedback.json'); // cwd current working directory
    const fileData = fs.readFileSync(filePath);
    const parsedData = JSON.parse(fileData);
    res.status(200).json({ data: parsedData });
  }
};

export default handler;
