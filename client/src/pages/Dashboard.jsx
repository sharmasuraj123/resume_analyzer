// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import {
//   FiUpload,
//   FiFileText,
//   FiTrash2,
//   FiBarChart2,
//   FiLink,
// } from "react-icons/fi";
// import Navbar from "../components/Navbar";
// import api from "../services/api";

// const Dashboard = () => {
//   const [resumes, setResumes] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Fetch all resumes on load
//   useEffect(() => {
//     fetchResumes();
//   }, []);

//   const fetchResumes = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/resume");
//       setResumes(res.data);
//     } catch (error) {
//       toast.error("Failed to load resumes");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.type !== "application/pdf") {
//       toast.error("Only PDF files are allowed");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("resume", file);

//     try {
//       setUploading(true);
//       toast.loading("Uploading resume...", { id: "upload" });
//       await api.post("/resume/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Resume uploaded successfully!", { id: "upload" });
//       fetchResumes();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Upload failed", {
//         id: "upload",
//       });
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDelete = async (resumeId) => {
//     if (!window.confirm("Are you sure you want to delete this resume?")) return;
//     try {
//       await api.delete(`/resume/${resumeId}`);
//       toast.success("Resume deleted");
//       setResumes((prev) => prev.filter((r) => r._id !== resumeId));
//     } catch (error) {
//       toast.error("Failed to delete resume");
//     }
//   };

//   const copyFeedbackLink = (token) => {
//     const link = `${window.location.origin}/feedback/${token}`;
//     navigator.clipboard.writeText(link);
//     toast.success("Feedback link copied!");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Toaster position="top-right" />
//       <Navbar />

//       <div className="max-w-5xl mx-auto px-4 py-10">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">My Resumes</h1>
//             <p className="text-gray-500 text-sm mt-1">
//               Upload, analyze, and share your resumes
//             </p>
//           </div>

//           {/* Upload button */}
//           <label
//             className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg cursor-pointer transition ${uploading ? "opacity-60 cursor-not-allowed" : ""}`}
//           >
//             <FiUpload size={16} />
//             {uploading ? "Uploading..." : "Upload Resume"}
//             <input
//               type="file"
//               accept=".pdf"
//               className="hidden"
//               onChange={handleUpload}
//               disabled={uploading}
//             />
//           </label>
//         </div>

//         {/* Resume list */}
//         {loading ? (
//           <div className="text-center py-20 text-gray-400">
//             Loading resumes...
//           </div>
//         ) : resumes.length === 0 ? (
//           <div className="text-center py-20">
//             <FiFileText size={48} className="mx-auto text-gray-300 mb-4" />
//             <p className="text-gray-500 text-lg font-medium">No resumes yet</p>
//             <p className="text-gray-400 text-sm mt-1">
//               Upload your first resume to get started
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-4">
//             {resumes.map((resume) => (
//               <div
//                 key={resume._id}
//                 className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
//               >
//                 {/* Resume info */}
//                 <div className="flex items-center gap-3">
//                   <div className="bg-blue-50 p-2.5 rounded-lg">
//                     <FiFileText size={20} className="text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-800 text-sm">
//                       {resume.fileName}
//                     </p>
//                     <p className="text-gray-400 text-xs mt-0.5">
//                       Version {resume.version} •{" "}
//                       {new Date(resume.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex items-center gap-2 flex-wrap">
//                   {/* ATS Score */}
//                   <button
//                     onClick={() => navigate(`/ats/${resume._id}`)}
//                     className="flex items-center gap-1.5 text-xs font-medium bg-green-50 text-green-600 hover:bg-green-100 px-3 py-2 rounded-lg transition"
//                   >
//                     <FiBarChart2 size={14} />
//                     ATS Score
//                   </button>

//                   {/* JD Match */}
//                   <button
//                     onClick={() => navigate(`/jd/${resume._id}`)}
//                     className="flex items-center gap-1.5 text-xs font-medium bg-purple-50 text-purple-600 hover:bg-purple-100 px-3 py-2 rounded-lg transition"
//                   >
//                     <FiBarChart2 size={14} />
//                     JD Match
//                   </button>

//                   {/* Copy feedback link */}
//                   <button
//                     onClick={() => copyFeedbackLink(resume.feedbackToken)}
//                     className="flex items-center gap-1.5 text-xs font-medium bg-yellow-50 text-yellow-600 hover:bg-yellow-100 px-3 py-2 rounded-lg transition"
//                   >
//                     <FiLink size={14} />
//                     Share
//                   </button>

//                   {/* View Feedback */}
//                   <button
//                     onClick={() => navigate(`/resume/${resume._id}/feedback`)}
//                     className="flex items-center gap-1.5 text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg transition"
//                   >
//                     <FiFileText size={14} />
//                     Feedback
//                   </button>

//                   {/* Delete */}
//                   <button
//                     onClick={() => handleDelete(resume._id)}
//                     className="flex items-center gap-1.5 text-xs font-medium bg-red-50 text-red-500 hover:bg-red-100 px-3 py-2 rounded-lg transition"
//                   >
//                     <FiTrash2 size={14} />
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  FiUpload,
  FiFileText,
  FiTrash2,
  FiBarChart2,
  FiLink,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import api from "../services/api";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const res = await api.get("/resume");
      setResumes(res.data);
    } catch (error) {
      toast.error("Failed to load resumes");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }
    const formData = new FormData();
    formData.append("resume", file);
    try {
      setUploading(true);
      toast.loading("Uploading resume...", { id: "upload" });
      await api.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Resume uploaded successfully!", { id: "upload" });
      fetchResumes();
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed", {
        id: "upload",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (resumeId) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
    try {
      await api.delete(`/resume/${resumeId}`);
      toast.success("Resume deleted");
      setResumes((prev) => prev.filter((r) => r._id !== resumeId));
    } catch (error) {
      toast.error("Failed to delete resume");
    }
  };

  const copyFeedbackLink = (token) => {
    const link = `${window.location.origin}/feedback/${token}`;
    navigator.clipboard.writeText(link);
    toast.success("Feedback link copied!");
  };

  return (
    <div className="min-h-screen bg-[#0f1117]">
      <Toaster position="top-right" />
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">My Resumes</h1>
            <p className="text-gray-400 text-sm mt-1">
              Upload, analyze, and share your resumes
            </p>
          </div>

          {/* Upload button */}
          <label
            className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg cursor-pointer transition ${uploading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <FiUpload size={16} />
            {uploading ? "Uploading..." : "Upload Resume"}
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>

        {/* Resume list */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            Loading resumes...
          </div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-20">
            <FiFileText size={48} className="mx-auto text-gray-700 mb-4" />
            <p className="text-gray-400 text-lg font-medium">No resumes yet</p>
            <p className="text-gray-600 text-sm mt-1">
              Upload your first resume to get started
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-[#161b27] rounded-xl border border-gray-800 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Resume info */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#0f1117] p-2.5 rounded-lg">
                    <FiFileText size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-100 text-sm">
                      {resume.fileName}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      Version {resume.version} •{" "}
                      {new Date(resume.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => navigate(`/ats/${resume._id}`)}
                    className="flex items-center gap-1.5 text-xs font-medium bg-green-900 text-green-400 hover:bg-green-800 px-3 py-2 rounded-lg transition"
                  >
                    <FiBarChart2 size={14} />
                    ATS Score
                  </button>

                  <button
                    onClick={() => navigate(`/jd/${resume._id}`)}
                    className="flex items-center gap-1.5 text-xs font-medium bg-purple-900 text-purple-400 hover:bg-purple-800 px-3 py-2 rounded-lg transition"
                  >
                    <FiBarChart2 size={14} />
                    JD Match
                  </button>

                  <button
                    onClick={() => copyFeedbackLink(resume.feedbackToken)}
                    className="flex items-center gap-1.5 text-xs font-medium bg-yellow-900 text-yellow-400 hover:bg-yellow-800 px-3 py-2 rounded-lg transition"
                  >
                    <FiLink size={14} />
                    Share
                  </button>

                  <button
                    onClick={() => navigate(`/resume/${resume._id}/feedback`)}
                    className="flex items-center gap-1.5 text-xs font-medium bg-blue-900 text-blue-400 hover:bg-blue-800 px-3 py-2 rounded-lg transition"
                  >
                    <FiFileText size={14} />
                    Feedback
                  </button>

                  <button
                    onClick={() => handleDelete(resume._id)}
                    className="flex items-center gap-1.5 text-xs font-medium bg-red-900 text-red-400 hover:bg-red-800 px-3 py-2 rounded-lg transition"
                  >
                    <FiTrash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;