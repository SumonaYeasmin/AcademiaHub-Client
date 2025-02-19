import { useState } from "react";

const topics = [
  "Web Development",
  "Data Science",
  "Graphic Design",
  "Digital Marketing",
  "Content Writing",
];

const CommunityForum = () => {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [answers, setAnswers] = useState({});
  const [answerInputs, setAnswerInputs] = useState({});

  const handlePostQuestion = () => {
    if (newQuestion.trim() !== "") {
      setQuestions([
        ...questions,
        { id: Date.now(), topic: selectedTopic, text: newQuestion },
      ]);
      setNewQuestion("");
    }
  };

  const handleAnswerInputChange = (questionId, text) => {
    setAnswerInputs((prev) => ({
      ...prev,
      [questionId]: text,
    }));
  };

  const handlePostAnswer = (questionId) => {
    if (answerInputs[questionId]?.trim()) {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: [...(prev[questionId] || []), answerInputs[questionId]],
      }));
      setAnswerInputs((prev) => ({
        ...prev,
        [questionId]: "",
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 border py-10 bg-gray-100  mt-20 mb-9">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Community Forum
      </h1>

      {/* Topic Selection */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md ${
              selectedTopic === topic
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 hover:bg-blue-200"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Post a Question */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Post a Question on {selectedTopic}
        </h2>
        <textarea
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Type your question here..."
          className="w-full p-2 border border-gray-300 rounded-lg resize-none bg-white"
        />
        <button
          onClick={handlePostQuestion}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
        >
          Post Question
        </button>
      </div>

      {/* Recent Questions */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Recent Questions
        </h2>
        {questions.length > 0 ? (
          questions
            .filter((q) => q.topic === selectedTopic)
            .map((q) => (
              <div
                key={q.id}
                className="p-4 bg-white shadow-md rounded-lg mb-2 border-l-4 border-blue-500"
              >
                <p className="text-gray-800 font-medium">{q.text}</p>
                <span className="text-sm text-gray-500">Topic: {q.topic}</span>

                {/* Answer Section */}
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-600">
                    Answers:
                  </h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    {(answers[q.id] || []).map((ans, index) => (
                      <li key={index} className="text-gray-600 bg-gray-100 p-2 rounded-lg mb-1">
                        {ans}
                      </li>
                    ))}
                  </ul>
                  {/* Answer Input */}
                  <textarea
                    value={answerInputs[q.id] || ""}
                    onChange={(e) =>
                      handleAnswerInputChange(q.id, e.target.value)
                    }
                    placeholder="Write your answer..."
                    className="w-full p-2 border border-gray-300 rounded-lg resize-none mt-2"
                  />
                  <button
                    onClick={() => handlePostAnswer(q.id)}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm"
                  >
                    Submit Answer
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p className="text-gray-500">No questions yet on {selectedTopic}.</p>
        )}
      </div>
    </div>
  );
};

export default CommunityForum;
