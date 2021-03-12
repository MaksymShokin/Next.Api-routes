import { getFeedback, getPath } from './feedback';

const handler = (req, res) => {
  const feedbackId = req.query.feedbackId;

  const filePath = getPath();
  const parsedData = getFeedback(filePath);

  const filteredFeedback = parsedData.find(({ id }) => id === feedbackId);

  res.status(200).json({ feedback: filteredFeedback });
};

export default handler;
