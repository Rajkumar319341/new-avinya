import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

import './survey.css';

function Question({ question, options, onQuestionChange, onOptionChange, addOption, deleteLastOption,deleteQuestion }) {
  return (
    <div className="question">
      <label>Question:</label>
      <input
        type="text"
        placeholder="Enter your question..."
        value={question}
        className="survey-input-box"
        onChange={(e) => onQuestionChange(e.target.value)}
      />
      <ul>
        {options.map((option, optionIndex) => (
          <li key={optionIndex}>
            <label>Option {optionIndex + 1}:</label>
            <input
              type="text"
              placeholder={`Enter option ${optionIndex + 1}`}
              value={option}
              className="survey-input-box"
              onChange={(e) => onOptionChange(optionIndex, e.target.value)}
            />
            {optionIndex === options.length - 1 && (
              <>
                <button onClick={() => addOption()}>Add Option</button>
                {options.length > 1 && (
                  <button onClick={() => deleteLastOption()} className="delete-option">
                    Delete Last Option
                  </button>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={() => deleteQuestion()}>Delete Question</button>

    </div>
  );
}

function Survey() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    var basicAuth = "Basic " + btoa("c4erouter".concat(":", "c4erouter"));

    fetch('https://survey-shikshakpro.care4edu.com/qna', {
            headers: {
                'Authorization': basicAuth
            }
        })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setQuestions(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const addQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, question: '', answer: [''] }]);
  }

  const updateQuestion = (index, updatedQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
  }

  const updateOption = (questionIndex, optionIndex, optionValue) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answer[optionIndex] = optionValue;
    setQuestions(updatedQuestions);
  }

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answer.push('');
    setQuestions(updatedQuestions);
  }

  const deleteLastOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    const lastQuestion = updatedQuestions[questionIndex];
    if (lastQuestion.answer.length > 1) {
      lastQuestion.answer.pop();
      setQuestions(updatedQuestions);
    }
  }
  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };
  

  const submitForm = () => {

    const hasEmptyFields = questions.some(
      (question) => question.question.trim() === '' || question.answer.some((ans) => ans.trim() === '')
    );

    if (hasEmptyFields) {
      // Show a toast message indicating empty fields
      toast.error('Please fill in all questions and answers before submitting.');
      return;
    }
    else{
    var basicAuth = "Basic " + btoa("c4erouter".concat(":", "c4erouter"));
    fetch('https://survey-shikshakpro.care4edu.com/qna/multiple', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': basicAuth
      },
      body: JSON.stringify(questions)
    })
      .then(response => response.json())
      .then(data => {
        console.log('POST response:', data);
        toast.success('Details submitted successfully');
        // Optionally, you can perform UI updates or other actions based on the response
      })
      .catch(error => {
        console.error('POST error:', error);
        // Handle any errors that occurred during the POST request
      });

    console.log(questions);
    }
  };


  return (
    <div>
      <div className="title">Survey Form</div>
      <div className='survey-body'>
        <div className="App">
          {questions.map((question, index) => (
            <Question
              key={index}
              question={question.question}
              options={question.answer}
              onQuestionChange={(text) => updateQuestion(index, { ...question, question: text })}
              onOptionChange={(optionIndex, optionValue) =>
                updateOption(index, optionIndex, optionValue)
              }
              addOption={() => addOption(index)}
              deleteLastOption={() => deleteLastOption(index)}
              deleteQuestion={() => deleteQuestion(index)}  // Added this line

            />
          ))}
          <button onClick={addQuestion}>Add Question</button>
          <button onClick={submitForm}>Submit Form</button>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer here */}

    </div>
  );
}

export default Survey;
