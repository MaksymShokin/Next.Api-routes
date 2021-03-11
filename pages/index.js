import { useRef, useState } from 'react';

function HomePage() {
  const emailRef = useRef(null);
  const feedbackRef = useRef(null);
  const [feedbacks, setFeedbacks] = useState([]);

  const onSubmitHandler = event => {
    event.preventDefault();

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        email: emailRef.current.value,
        feedback: feedbackRef.current.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => console.log(res));
  };

  const loadFeedback = () => {
    fetch('/api/feedback', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        debugger;
        setFeedbacks(res.data);
      });
  };

  if (!feedbacks) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor='email'>Enter you email</label>
          <input type='email' id='email' ref={emailRef} />
        </div>
        <div>
          <label htmlFor='feedback'>Enter you feedback</label>
          <textarea id='feedback' rows='7' ref={feedbackRef}></textarea>
        </div>
        <button>Submit</button>
      </form>
      <button onClick={loadFeedback}>Load Feedback</button>
      <div>
        {feedbacks.map(({ email, id, feedback }) => (
          <ul key={id}>
            <li>{email}</li>
            <li>{feedback}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
