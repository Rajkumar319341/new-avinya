import React from "react";
import avinyalogo from "./Avinyalogo.png";
import poweredbyc4e from "./PoweredByC4E.png";
import { usePDF } from "react-to-pdf";

const QuestionPaperTemplate = ({ data }) => {
  const { toPDF, targetRef } = usePDF({ filename: "QuestionPaper.pdf" });

  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={avinyalogo}
          alt="Logo"
          style={{ maxWidth: "30%", height: "auto" }}
        />
        <img
          src={poweredbyc4e}
          alt="Logo"
          style={{ maxWidth: "30%", height: "auto" }}
        />
      </div>
    );
  }

  console.log("Default data:", data);

  const toRoman = (num) => {
    const romanNumerals = ["I", "II", "III", "IV", "V"];
    return romanNumerals[num - 1] || num;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const calculateDuration = (totalMarks) => {
    if (totalMarks <= 25) {
      return "1 Hour";
    } else if (totalMarks <= 35) {
      return "1 Hour 30 Minutes";
    } else if (totalMarks <= 50) {
      return "2 Hours";
    } else if (totalMarks <= 75) {
      return "2 Hours 30 Minutes";
    } else {
      return "3 Hours";
    }
  };

  const calculateTotalMarksAndDuration = () => {
    let totalMarks = 0;
    let duration = "";

    const questionCounts = {
      ONE_MARK: 0,
      TWO_MARKS: 0,
      THREE_MARKS: 0,
      FIVE_MARKS: 0,
    };

    data.forEach((item) => {
      if (item.question_type === "ONE_MARK") {
        questionCounts["ONE_MARK"] += 1;
        totalMarks += 1;
      } else if (item.question_type === "TWO_MARKS") {
        questionCounts["TWO_MARKS"] += 1;
        totalMarks += 2;
      } else if (item.question_type === "THREE_MARKS") {
        questionCounts["THREE_MARKS"] += 1;
        totalMarks += 3;
      } else if (item.question_type === "FIVE_MARKS") {
        questionCounts["FIVE_MARKS"] += 1;
        totalMarks += 5;
      }
    });

    duration = calculateDuration(totalMarks);

    return { totalMarks, duration, questionCounts };
  };

  const { totalMarks, duration, questionCounts } =
    calculateTotalMarksAndDuration();

  const distinctQuestionTypes = Object.keys(questionCounts).filter(
    (questionType) => questionCounts[questionType] > 0
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          width: "80%",
          margin: "0 auto",
          fontFamily: "Arial, sans-serif",
        }}
        ref={targetRef}
      >
        <div>
          <img
            src={avinyalogo}
            alt="Logo"
            style={{ maxWidth: "30%", height: "auto" }}
          />
        </div>
        <div>
          <img
            src={poweredbyc4e}
            alt="Logo"
            style={{ maxWidth: "30%", height: "auto" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "20px",
            fontWeight: "bold",
            marginLeft: "20px",
          }}
        >
          <div style={{ textAlign: "left", fontSize:"18px" }}>
            <div>Date: {formatDate(new Date())}</div>
            <div>Class:{data.length > 0 ? data[0].grade : ""}</div>
          </div>
          <div
            style={{
              marginBottom: "20px",
              textAlign: "center",
              marginRight: "20px",
               fontSize:"18px"
            }}
          >
            Subject: {data.length > 0 ? data[0].subject : ""}
          </div>
          <div style={{ textAlign: "right", marginRight: "20px", fontSize:"18px" }}>
            <div>Total Marks: {totalMarks}</div>
            <div>Duration: {duration}</div>
          </div>
        </div>
        <div style={{ textAlign: "left", width: "100%" }}>
          {distinctQuestionTypes.map((questionType, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize:"18px"
                }}
              >
                {toRoman(index + 1)}. Each Question Carries{" "}
                {questionType === "ONE_MARK"
                  ? "One"
                  : questionType === "TWO_MARKS"
                  ? "Two"
                  : questionType === "THREE_MARKS"
                  ? "Three"
                  : "Five"}{" "}
                Marks:
                <span style={{ fontFamily: "Calibri" }}>
                  {questionType === "ONE_MARK"
                    ? `1*${questionCounts[questionType]}`
                    : questionType === "TWO_MARKS"
                    ? `2*${questionCounts[questionType]}`
                    : questionType === "THREE_MARKS"
                    ? `3*${questionCounts[questionType]}`
                    : `5*${questionCounts[questionType]}`}
                  ={" "}
                  {questionCounts[questionType] *
                    (questionType === "ONE_MARK"
                      ? 1
                      : questionType === "TWO_MARKS"
                      ? 2
                      : questionType === "THREE_MARKS"
                      ? 3
                      : 5)}
                </span>
              </div>
              <ul>
                {data
                  .filter((item) => item.question_type === questionType)
                  .map((question, i) => (
                    <li
                      key={i}
                      style={{
                        marginLeft: "20px",
                        fontFamily: "Calibri",
                        marginBottom: "20px",
                        fontSize:"18px",
                        maxWidth:"90%"
                      }}
                    >
                      <div >
                        {i + 1}. {question.question}
                      </div>
                      {question.image_url && (
                        <div>
                          <img
                            src={question.image_url}
                            alt="Question"
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <br></br>
      <button onClick={() => toPDF()}>Download PDF</button>
    </div>
  );
};

export default QuestionPaperTemplate;
