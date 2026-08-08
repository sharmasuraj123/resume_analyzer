// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import { FiArrowLeft, FiCheckCircle, FiXCircle } from "react-icons/fi";
// import Navbar from "../components/Navbar";
// import api from "../services/api";

// const JDMatch = () => {
//   const { resumeId } = useParams();
//   const navigate = useNavigate();
//   const [jobDescription, setJobDescription] = useState("");
//   const [result, setResult] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [historyLoading, setHistoryLoading] = useState(true);

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     try {
//       setHistoryLoading(true);
//       const res = await api.get(`/jd/${resumeId}`);
//       setHistory(res.data);
//       if (res.data.length > 0) {
//         setResult(res.data[0]);
//       }
//     } catch (error) {
//       toast.error("Failed to load history");
//     } finally {
//       setHistoryLoading(false);
//     }
//   };

//   const handleMatch = async () => {
//     if (!jobDescription.trim() || jobDescription.trim().length < 20) {
//       toast.error("Please enter a valid job description (min 20 characters)");
//       return;
//     }

//     try {
//       setLoading(true);
//       toast.loading("Analyzing match...", { id: "jd" });
//       const res = await api.post(`/jd/${resumeId}`, { jobDescription });
//       setResult(res.data.result);
//       setHistory((prev) => [res.data.result, ...prev]);
//       setJobDescription("");
//       toast.success("Match score generated!", { id: "jd" });
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to analyze", {
//         id: "jd",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getScoreColor = (score) => {
//     if (score >= 70) return "text-green-600";
//     if (score >= 40) return "text-yellow-500";
//     return "text-red-500";
//   };

//   const getScoreBg = (score) => {
//     if (score >= 70) return "bg-green-50 border-green-200";
//     if (score >= 40) return "bg-yellow-50 border-yellow-200";
//     return "bg-red-50 border-red-200";
//   };

//   const getScoreLabel = (score) => {
//     if (score >= 70) return "Great Match";
//     if (score >= 40) return "Partial Match";
//     return "Low Match";
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Toaster position="top-right" />
//       <Navbar />

//       <div className="max-w-3xl mx-auto px-4 py-10">
//         {/* Back */}
//         <button
//           onClick={() => navigate("/dashboard")}
//           className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-6 transition"
//         >
//           <FiArrowLeft size={16} />
//           Back to Dashboard
//         </button>

//         <h1 className="text-2xl font-bold text-gray-800 mb-2">
//           JD Match Score
//         </h1>
//         <p className="text-gray-500 text-sm mb-8">
//           Paste a job description to see how well your resume matches it
//         </p>

//         {/* Input */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Paste Job Description
//           </label>
//           <textarea
//             rows={6}
//             value={jobDescription}
//             onChange={(e) => setJobDescription(e.target.value)}
//             placeholder="e.g. We are looking for a React Developer with experience in JavaScript, Node.js, REST APIs, Git..."
//             className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
//           />
//           <div className="flex items-center justify-between mt-3">
//             <p className="text-xs text-gray-400">
//               {jobDescription.length} characters
//             </p>
//             <button
//               onClick={handleMatch}
//               disabled={loading}
//               className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition disabled:opacity-60"
//             >
//               {loading ? "Analyzing..." : "Analyze Match"}
//             </button>
//           </div>
//         </div>

//         {/* Result */}
//         {result && (
//           <div className="space-y-6 mb-8">
//             {/* Score */}
//             <div
//               className={`rounded-xl border p-8 text-center ${getScoreBg(result.matchScore)}`}
//             >
//               <p className="text-gray-500 text-sm mb-2">Match Score</p>
//               <p
//                 className={`text-7xl font-bold ${getScoreColor(result.matchScore)}`}
//               >
//                 {result.matchScore}
//                 <span className="text-3xl text-gray-400">%</span>
//               </p>
//               <p
//                 className={`text-lg font-semibold mt-3 ${getScoreColor(result.matchScore)}`}
//               >
//                 {getScoreLabel(result.matchScore)}
//               </p>
//             </div>

//             {/* Matched Keywords */}
//             {result.matchedKeywords.length > 0 && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                   <FiCheckCircle className="text-green-500" />
//                   Matched Keywords ({result.matchedKeywords.length})
//                 </h2>
//                 <div className="flex flex-wrap gap-2">
//                   {result.matchedKeywords.map((kw, i) => (
//                     <span
//                       key={i}
//                       className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full border border-green-200"
//                     >
//                       {kw}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Missing Keywords */}
//             {result.missingKeywords.length > 0 && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                   <FiXCircle className="text-red-400" />
//                   Missing Keywords ({result.missingKeywords.length})
//                 </h2>
//                 <div className="flex flex-wrap gap-2">
//                   {result.missingKeywords.map((kw, i) => (
//                     <span
//                       key={i}
//                       className="bg-red-50 text-red-600 text-xs font-medium px-3 py-1.5 rounded-full border border-red-200"
//                     >
//                       {kw}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* History */}
//         {!historyLoading && history.length > 1 && (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">
//               Previous Matches
//             </h2>
//             <div className="space-y-3">
//               {history.slice(1).map((h, i) => (
//                 <div
//                   key={i}
//                   onClick={() => setResult(h)}
//                   className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition"
//                 >
//                   <p className="text-sm text-gray-600 truncate max-w-xs">
//                     {h.jobDescription.slice(0, 60)}...
//                   </p>
//                   <span
//                     className={`text-sm font-bold ${getScoreColor(h.matchScore)}`}
//                   >
//                     {h.matchScore}%
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JDMatch;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FiArrowLeft, FiCheckCircle, FiXCircle } from "react-icons/fi";
import Navbar from "../components/Navbar";
import api from "../services/api";

const JDMatch = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);
      const res = await api.get(`/jd/${resumeId}`);
      setHistory(res.data);
      if (res.data.length > 0) setResult(res.data[0]);
    } catch (error) {
      toast.error("Failed to load history");
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleMatch = async () => {
    if (!jobDescription.trim() || jobDescription.trim().length < 20) {
      toast.error("Please enter a valid job description (min 20 characters)");
      return;
    }
    try {
      setLoading(true);
      toast.loading("Analyzing match...", { id: "jd" });
      const res = await api.post(`/jd/${resumeId}`, { jobDescription });
      setResult(res.data.result);
      setHistory((prev) => [res.data.result, ...prev]);
      setJobDescription("");
      toast.success("Match score generated!", { id: "jd" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to analyze", {
        id: "jd",
      });
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 70) return "text-green-400";
    if (score >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBg = (score) => {
    if (score >= 70) return "bg-green-950 border-green-800";
    if (score >= 40) return "bg-yellow-950 border-yellow-800";
    return "bg-red-950 border-red-800";
  };

  const getScoreLabel = (score) => {
    if (score >= 70) return "Great Match";
    if (score >= 40) return "Partial Match";
    return "Low Match";
  };

  return (
    <div className="min-h-screen bg-[#0f1117]">
      <Toaster position="top-right" />
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm mb-6 transition"
        >
          <FiArrowLeft size={16} />
          Back to Dashboard
        </button>

        <h1 className="text-2xl font-bold text-gray-100 mb-2">
          JD Match Score
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Paste a job description to see how well your resume matches it
        </p>

        {/* Input */}
        <div className="bg-[#161b27] rounded-xl border border-gray-800 p-6 mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Paste Job Description
          </label>
          <textarea
            rows={6}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="e.g. We are looking for a React Developer..."
            className="w-full bg-[#0f1117] border border-gray-700 text-gray-100 placeholder-gray-600 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          />
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-gray-600">
              {jobDescription.length} characters
            </p>
            <button
              onClick={handleMatch}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition disabled:opacity-60"
            >
              {loading ? "Analyzing..." : "Analyze Match"}
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="space-y-6 mb-8">
            <div
              className={`rounded-xl border p-8 text-center ${getScoreBg(result.matchScore)}`}
            >
              <p className="text-gray-400 text-sm mb-2">Match Score</p>
              <p
                className={`text-7xl font-bold ${getScoreColor(result.matchScore)}`}
              >
                {result.matchScore}
                <span className="text-3xl text-gray-500">%</span>
              </p>
              <p
                className={`text-lg font-semibold mt-3 ${getScoreColor(result.matchScore)}`}
              >
                {getScoreLabel(result.matchScore)}
              </p>
            </div>

            {result.matchedKeywords.length > 0 && (
              <div className="bg-[#161b27] rounded-xl border border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                  <FiCheckCircle className="text-green-400" />
                  Matched Keywords ({result.matchedKeywords.length})
                </h2>
                <div className="flex flex-wrap gap-2">
                  {result.matchedKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="bg-green-950 text-green-400 text-xs font-medium px-3 py-1.5 rounded-full border border-green-800"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.missingKeywords.length > 0 && (
              <div className="bg-[#161b27] rounded-xl border border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                  <FiXCircle className="text-red-400" />
                  Missing Keywords ({result.missingKeywords.length})
                </h2>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="bg-red-950 text-red-400 text-xs font-medium px-3 py-1.5 rounded-full border border-red-800"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* History */}
        {!historyLoading && history.length > 1 && (
          <div className="bg-[#161b27] rounded-xl border border-gray-800 p-6">
            <h2 className="text-lg font-semibold text-gray-100 mb-4">
              Previous Matches
            </h2>
            <div className="space-y-3">
              {history.slice(1).map((h, i) => (
                <div
                  key={i}
                  onClick={() => setResult(h)}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-800 hover:bg-[#0f1117] cursor-pointer transition"
                >
                  <p className="text-sm text-gray-400 truncate max-w-xs">
                    {h.jobDescription.slice(0, 60)}...
                  </p>
                  <span
                    className={`text-sm font-bold ${getScoreColor(h.matchScore)}`}
                  >
                    {h.matchScore}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JDMatch;