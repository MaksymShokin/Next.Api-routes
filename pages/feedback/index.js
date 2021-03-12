import { useRef, useState } from 'react';
import { getPath, getFeedback } from '../api/feedback';

function FeedbackPage({ feedbacks }) {
  return (
    <div>
      {feedbacks.map(({ email, id, feedback }) => (
        <ul key={id}>
          <li>{email}</li>
          <li>{feedback}</li>
        </ul>
      ))}
    </div>
  );
}

export const getStaticProps = async () => {
  const filePath = getPath();
  const feedbacks = getFeedback(filePath);

  return {
    props: {
      feedbacks
    }
  };
};

export default FeedbackPage;
