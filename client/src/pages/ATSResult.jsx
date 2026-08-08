// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import { FiArrowLeft, FiCheckCircle, FiXCircle } from "react-icons/fi";
// import Navbar from "../components/Navbar";
// import api from "../services/api";

// const ATSResult = () => {
//   const { resumeId } = useParams();
//   const navigate = useNavigate();
//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [generating, setGenerating] = useState(false);

//   useEffect(() => {
//     fetchReport();
//   }, []);

//   const fetchReport = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get(`/ats/${resumeId}`);
//       setReport(res.data.report ?? res.data);
//     } catch (error) {
//       // 404 means not generated yet — that's fine
//       if (error.response?.status !== 404) {
//         toast.error("Failed to load ATS report");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateReport = async () => {
//     try {
//       setGenerating(true);
//       toast.loading("Analyzing resume...", { id: "ats" });
//       const res = await api.post(`/ats/${resumeId}`);
//       setReport(res.data.report ?? res.data);
//       toast.success("ATS score generated!", { id: "ats" });
//     } catch (error) {
//       toast.error("Failed to generate ATS score", { id: "ats" });
//     } finally {
//       setGenerating(false);
//     }
//   };

//   const getScoreColor = (score) => {
//     if (score >= 80) return "text-green-600";
//     if (score >= 50) return "text-yellow-500";
//     return "text-red-500";
//   };

//   const getScoreBg = (score) => {
//     if (score >= 80) return "bg-green-50 border-green-200";
//     if (score >= 50) return "bg-yellow-50 border-yellow-200";
//     return "bg-red-50 border-red-200";
//   };

//   const getScoreLabel = (score) => {
//     if (score >= 80) return "Excellent";
//     if (score >= 50) return "Needs Improvement";
//     return "Poor";
//   };

//   const breakdownLabels = {
//     hasEmail: "Email Address",
//     hasPhone: "Phone Number",
//     hasGithub: "GitHub Link",
//     hasLinkedin: "LinkedIn Link",
//     hasSkills: "Skills Section",
//     hasProjects: "Projects Section",
//     hasExperience: "Experience Section",
//     hasEducation: "Education Section",
//   };

//   const breakdownPoints = {
//     hasEmail: 10,
//     hasPhone: 10,
//     hasGithub: 10,
//     hasLinkedin: 10,
//     hasSkills: 15,
//     hasProjects: 15,
//     hasExperience: 15,
//     hasEducation: 15,
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Toaster position="top-right" />
//       <Navbar />

//       <div className="max-w-3xl mx-auto px-4 py-10">
//         {/* Back button */}
//         <button
//           onClick={() => navigate("/dashboard")}
//           className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-6 transition"
//         >
//           <FiArrowLeft size={16} />
//           Back to Dashboard
//         </button>

//         <h1 className="text-2xl font-bold text-gray-800 mb-2">ATS Score</h1>
//         <p className="text-gray-500 text-sm mb-8">
//           See how well your resume performs against ATS systems
//         </p>

//         {loading ? (
//           <div className="text-center py-20 text-gray-400">Loading...</div>
//         ) : !report ? (
//           /* Not generated yet */
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
//             <p className="text-gray-500 mb-6">
//               No ATS report found for this resume. Generate one now.
//             </p>
//             <button
//               onClick={generateReport}
//               disabled={generating}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition disabled:opacity-60"
//             >
//               {generating ? "Analyzing..." : "Generate ATS Score"}
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {/* Score Card */}
//             <div
//               className={`rounded-xl border p-8 text-center ${getScoreBg(report.score)}`}
//             >
//               <p className="text-gray-500 text-sm mb-2">Your ATS Score</p>
//               <p
//                 className={`text-7xl font-bold ${getScoreColor(report.score)}`}
//               >
//                 {report.score}
//                 <span className="text-3xl text-gray-400">/100</span>
//               </p>
//               <p
//                 className={`text-lg font-semibold mt-3 ${getScoreColor(report.score)}`}
//               >
//                 {getScoreLabel(report.score)}
//               </p>
//             </div>

//             {/* Breakdown */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                 Score Breakdown
//               </h2>
//               <div className="space-y-3">
//                 {Object.entries(breakdownLabels).map(([key, label]) => (
//                   <div key={key} className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       {report.breakdown[key] ? (
//                         <FiCheckCircle size={18} className="text-green-500" />
//                       ) : (
//                         <FiXCircle size={18} className="text-red-400" />
//                       )}
//                       <span className="text-sm text-gray-700">{label}</span>
//                     </div>
//                     <span
//                       className={`text-sm font-semibold ${report.breakdown[key] ? "text-green-600" : "text-red-400"}`}
//                     >
//                       {report.breakdown[key]
//                         ? `+${breakdownPoints[key]}`
//                         : "+0"}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Missing Items */}
//             {report.missingItems.length > 0 && (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-4">
//                   What to Improve
//                 </h2>
//                 <div className="space-y-2">
//                   {report.missingItems.map((item, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-2 bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg"
//                     >
//                       <FiXCircle size={15} />
//                       Add {item}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Regenerate button */}
//             <button
//               onClick={generateReport}
//               disabled={generating}
//               className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2.5 rounded-lg transition disabled:opacity-60"
//             >
//               {generating ? "Regenerating..." : "Regenerate Score"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ATSResult;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FiArrowLeft, FiCheckCircle, FiXCircle } from "react-icons/fi";
import Navbar from "../components/Navbar";
import api from "../services/api";

const ATSResult = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/ats/${resumeId}`);
      setReport(res.data.report ?? res.data);
    } catch (error) {
      if (error.response?.status !== 404) {
        toast.error("Failed to load ATS report");
      }
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    try {
      setGenerating(true);
      toast.loading("Analyzing resume...", { id: "ats" });
      const res = await api.post(`/ats/${resumeId}`);
      setReport(res.data.report ?? res.data);
      toast.success("ATS score generated!", { id: "ats" });
    } catch (error) {
      toast.error("Failed to generate ATS score", { id: "ats" });
    } finally {
      setGenerating(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBg = (score) => {
    if (score >= 80) return "bg-green-950 border-green-800";
    if (score >= 50) return "bg-yellow-950 border-yellow-800";
    return "bg-red-950 border-red-800";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 50) return "Needs Improvement";
    return "Poor";
  };

  const breakdownLabels = {
    hasEmail: "Email Address",
    hasPhone: "Phone Number",
    hasGithub: "GitHub Link",
    hasLinkedin: "LinkedIn Link",
    hasSkills: "Skills Section",
    hasProjects: "Projects Section",
    hasExperience: "Experience Section",
    hasEducation: "Education Section",
  };

  const breakdownPoints = {
    hasEmail: 10,
    hasPhone: 10,
    hasGithub: 10,
    hasLinkedin: 10,
    hasSkills: 15,
    hasProjects: 15,
    hasExperience: 15,
    hasEducation: 15,
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

        <h1 className="text-2xl font-bold text-gray-100 mb-2">ATS Score</h1>
        <p className="text-gray-400 text-sm mb-8">
          See how well your resume performs against ATS systems
        </p>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading...</div>
        ) : !report ? (
          <div className="bg-[#161b27] rounded-xl border border-gray-800 p-10 text-center">
            <p className="text-gray-400 mb-6">
              No ATS report found. Generate one now.
            </p>
            <button
              onClick={generateReport}
              disabled={generating}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition disabled:opacity-60"
            >
              {generating ? "Analyzing..." : "Generate ATS Score"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Score Card */}
            <div
              className={`rounded-xl border p-8 text-center ${getScoreBg(report.score)}`}
            >
              <p className="text-gray-400 text-sm mb-2">Your ATS Score</p>
              <p
                className={`text-7xl font-bold ${getScoreColor(report.score)}`}
              >
                {report.score}
                <span className="text-3xl text-gray-500">/100</span>
              </p>
              <p
                className={`text-lg font-semibold mt-3 ${getScoreColor(report.score)}`}
              >
                {getScoreLabel(report.score)}
              </p>
            </div>

            {/* Breakdown */}
            <div className="bg-[#161b27] rounded-xl border border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-gray-100 mb-4">
                Score Breakdown
              </h2>
              <div className="space-y-3">
                {Object.entries(breakdownLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {report.breakdown[key] ? (
                        <FiCheckCircle size={18} className="text-green-400" />
                      ) : (
                        <FiXCircle size={18} className="text-red-400" />
                      )}
                      <span className="text-sm text-gray-300">{label}</span>
                    </div>
                    <span
                      className={`text-sm font-semibold ${report.breakdown[key] ? "text-green-400" : "text-red-400"}`}
                    >
                      {report.breakdown[key]
                        ? `+${breakdownPoints[key]}`
                        : "+0"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Items */}
            {report.missingItems.length > 0 && (
              <div className="bg-[#161b27] rounded-xl border border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-gray-100 mb-4">
                  What to Improve
                </h2>
                <div className="space-y-2">
                  {report.missingItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-red-950 text-red-400 text-sm px-4 py-2.5 rounded-lg"
                    >
                      <FiXCircle size={15} />
                      Add {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regenerate */}
            <button
              onClick={generateReport}
              disabled={generating}
              className="w-full border border-blue-700 text-blue-400 hover:bg-blue-900 font-semibold py-2.5 rounded-lg transition disabled:opacity-60"
            >
              {generating ? "Regenerating..." : "Regenerate Score"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ATSResult;