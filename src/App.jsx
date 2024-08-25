import React, { useState } from 'react';
import axios from 'axios';



const App = () => {
  const [question, setQuestion] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleOngenerate = async () => {
    setLoading(true); 
    setResponseText(""); 
    console.log("Loading............");

    const api = import.meta.env.VITE_API_URL;


    try {
      const response = await axios({
        url: api,
        method: 'post',
        data: {"contents":[{"parts":[{"text":question}]}]}
      });


      const generatedContent = response.data.candidates[0].content.parts[0].text;
      console.log(generatedContent);


      setResponseText(generatedContent);

    } catch (error) {
      console.error("Error generating response:", error);
      setResponseText("Failed to generate response. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-8">
      <div className="bg-[#1b1f2d] shadow-2xl rounded-2xl w-full max-w-md p-8 space-y-6">
        <div className="text-center text-4xl font-extrabold text-white tracking-wide mb-6">
          BROSKI
        </div>

        <div className="flex flex-col space-y-5">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your query here..."
            className="px-5 py-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-600 transition duration-300"
          />
          <button
            className="py-4 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-semibold tracking-wide shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            onClick={handleOngenerate}
            disabled={loading}
          >
            {loading ? "LOADING..." : "GENERATE RESULTS"}
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center mt-6 p-4 bg-gray-700 text-white rounded-xl shadow-inner">
            <div className="loader border-t-4 border-purple-500 rounded-full w-8 h-8 animate-spin"></div>
          </div>
        )}
        {!loading && responseText && (
          <div className="mt-6 p-6 bg-gray-700 text-white rounded-xl shadow-inner space-y-4">
            <div className="text-lg font-medium mb-2">Generated Response:</div>
            <div className="text-base leading-relaxed">
              {responseText.split('\n').map((line, index) => (
                <p key={index} className="mb-2">{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
