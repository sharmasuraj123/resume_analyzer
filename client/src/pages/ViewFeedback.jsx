// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import { FiArrowLeft, FiStar, FiUser } from "react-icons/fi";
// import Navbar from "../components/Navbar";
// import api from "../services/api";

// const ViewFeedback = () => {
//   const { resumeId } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchFeedback();
//   }, []);

//   const fetchFeedback = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get(`/feedback/resume/${resumeId}`);
//       setData(res.data);
//     } catch (error) {
//       toast.error("Failed to load feedback");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderStars = (count) => {
//     return [1, 2, 3, 4, 5].map((star) => (
//       <FiStar
//         key={star}
//         size={14}
//         style={{ fill: star <= count ? "#facc15" : "none" }}
//         className={star <= count ? "text-yellow-400" : "text-gray-300"}
//       />
//     ));
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
//           Resume Feedback
//         </h1>
//         <p className="text-gray-500 text-sm mb-8">
//           Feedback collected from your shared resume link
//         </p>

//         {loading ? (
//           <div className="text-center py-20 text-gray-400">Loading...</div>
//         ) : !data || data.totalFeedbacks === 0 ? (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
//             <p className="text-gray-500">No feedback yet.</p>
//             <p className="text-gray-400 text-sm mt-1">
//               Share your resume link to collect feedback.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {/* Summary */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-8">
//               <div className="text-center">
//                 <p className="text-5xl font-bold text-yellow-400">
//                   {data.averageRating}
//                 </p>
//                 <div className="flex gap-0.5 justify-center mt-1">
//                   {renderStars(Math.round(data.averageRating))}
//                 </div>
//                 <p className="text-gray-400 text-xs mt-1">Average Rating</p>
//               </div>
//               <div className="border-l border-gray-100 pl-8">
//                 <p className="text-3xl font-bold text-gray-800">
//                   {data.totalFeedbacks}
//                 </p>
//                 <p className="text-gray-400 text-sm mt-1">Total Reviews</p>
//               </div>
//             </div>

//             {/* Individual feedbacks */}
//             <div className="space-y-4">
//               {data.feedbacks.map((fb) => (
//                 <div
//                   key={fb._id}
//                   className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
//                 >
//                   <div className="flex items-center justify-between mb-3">
//                     <div className="flex items-center gap-2">
//                       <div className="bg-gray-100 p-2 rounded-full">
//                         <FiUser size={14} className="text-gray-500" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-gray-800">
//                           {fb.isAnonymous ? "Anonymous" : fb.reviewerName}
//                         </p>
//                         <p className="text-xs text-gray-400">
//                           {new Date(fb.createdAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex gap-0.5">{renderStars(fb.rating)}</div>
//                   </div>
//                   {fb.comment && (
//                     <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-4 py-3">
//                       {fb.comment}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewFeedback;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FiArrowLeft, FiStar, FiUser } from "react-icons/fi";
import Navbar from "../components/Navbar";
import api from "../services/api";

const ViewFeedback = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/feedback/resume/${resumeId}`);
      setData(res.data);
    } catch (error) {
      toast.error("Failed to load feedback");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (count) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <FiStar
        key={star}
        size={14}
        style={{ fill: star <= count ? "#facc15" : "none" }}
        className={star <= count ? "text-yellow-400" : "text-gray-600"}
      />
    ));
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
          Resume Feedback
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Feedback collected from your shared resume link
        </p>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading...</div>
        ) : !data || data.totalFeedbacks === 0 ? (
          <div className="bg-[#161b27] rounded-xl border border-gray-800 p-10 text-center">
            <p className="text-gray-400">No feedback yet.</p>
            <p className="text-gray-600 text-sm mt-1">
              Share your resume link to collect feedback.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-[#161b27] rounded-xl border border-gray-800 p-6 flex items-center gap-8">
              <div className="text-center">
                <p className="text-5xl font-bold text-yellow-400">
                  {data.averageRating}
                </p>
                <div className="flex gap-0.5 justify-center mt-1">
                  {renderStars(Math.round(data.averageRating))}
                </div>
                <p className="text-gray-500 text-xs mt-1">Average Rating</p>
              </div>
              <div className="border-l border-gray-800 pl-8">
                <p className="text-3xl font-bold text-gray-100">
                  {data.totalFeedbacks}
                </p>
                <p className="text-gray-500 text-sm mt-1">Total Reviews</p>
              </div>
            </div>

            {/* Individual feedbacks */}
            <div className="space-y-4">
              {data.feedbacks.map((fb) => (
                <div
                  key={fb._id}
                  className="bg-[#161b27] rounded-xl border border-gray-800 p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-[#0f1117] p-2 rounded-full">
                        <FiUser size={14} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-100">
                          {fb.isAnonymous ? "Anonymous" : fb.reviewerName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(fb.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">{renderStars(fb.rating)}</div>
                  </div>
                  {fb.comment && (
                    <p className="text-sm text-gray-400 bg-[#0f1117] rounded-lg px-4 py-3">
                      {fb.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewFeedback;