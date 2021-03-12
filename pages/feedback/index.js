import { useRef, useState } from 'react';
import { getPath, getFeedback } from '../api/feedback';

function FeedbackPage({ feedbacks }) {
  const [feedback, setFeedback] = useState();

  const goToFeedback = id => {
    fetch(`../api/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        setFeedback(res.feedback);
      });
  };

  return (
    <div>
      {feedback && feedback.feedback}
      <hr />
      {feedbacks.map(({ email, id, feedback }) => (
        <ul key={id} onClick={() => goToFeedback(id)}>
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
