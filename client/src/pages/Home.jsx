// import { useNavigate } from "react-router-dom";
// import { FiFileText, FiBarChart2, FiLink, FiCheckCircle } from "react-icons/fi";
// import { useAuth } from "../context/AuthContext";

// const Home = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const features = [
//     {
//       icon: <FiFileText size={24} className="text-blue-600" />,
//       title: "Resume Upload",
//       description: "Upload your PDF resume and store it securely in the cloud.",
//     },
//     {
//       icon: <FiBarChart2 size={24} className="text-green-600" />,
//       title: "ATS Score",
//       description:
//         "Get a detailed ATS score with breakdown of what is missing.",
//     },
//     {
//       icon: <FiBarChart2 size={24} className="text-purple-600" />,
//       title: "JD Match Score",
//       description:
//         "Paste a job description and see how well your resume matches it.",
//     },
//     {
//       icon: <FiLink size={24} className="text-yellow-600" />,
//       title: "Feedback via Link",
//       description:
//         "Share a unique link and collect feedback from friends or seniors.",
//     },
//   ];

//   const steps = [
//     {
//       step: "01",
//       title: "Create Account",
//       description: "Sign up for free in seconds.",
//     },
//     {
//       step: "02",
//       title: "Upload Resume",
//       description: "Upload your PDF resume to get started.",
//     },
//     {
//       step: "03",
//       title: "Analyze",
//       description: "Get ATS score and JD match results instantly.",
//     },
//     {
//       step: "04",
//       title: "Share & Improve",
//       description: "Share your resume link and collect feedback.",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navbar */}
//       <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 bg-white z-50 shadow-sm">
//         <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
//           <FiFileText size={24} />
//           <span>ResumeAnalyzer</span>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => navigate("/login")}
//             className="text-sm font-medium text-gray-600 hover:text-gray-800 transition"
//           >
//             Login
//           </button>
//           <button
//             onClick={() => navigate("/register")}
//             className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//           >
//             Get Started
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="max-w-4xl mx-auto px-4 py-24 text-center">
//         <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-6">
//           Free Resume Analyzer
//         </span>
//         <h1 className="text-5xl font-bold text-gray-800 leading-tight mb-6">
//           Get Your Resume
//           <span className="text-blue-600"> ATS Ready</span>
//         </h1>
//         <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
//           Upload your resume, get an ATS score, match it against job
//           descriptions, and collect feedback from peers — all in one place.
//         </p>
//         <div className="flex items-center justify-center gap-4">
//           <button
//             onClick={() => navigate(user ? "/dashboard" : "/register")}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition text-sm"
//           >
//             {user ? "Go to Dashboard" : "Get Started Free"}
//           </button>
//           <button
//             onClick={() => navigate("/login")}
//             className="text-gray-600 hover:text-gray-800 font-medium text-sm transition"
//           >
//             Login →
//           </button>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="bg-gray-50 py-20 px-4">
//         <div className="max-w-5xl mx-auto">
//           <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
//             Everything you need
//           </h2>
//           <p className="text-gray-500 text-center text-sm mb-12">
//             All tools to make your resume stand out
//           </p>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
//               >
//                 <div className="bg-gray-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//                   {feature.icon}
//                 </div>
//                 <h3 className="font-semibold text-gray-800 mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-500 text-sm">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How it works */}
//       <section className="py-20 px-4">
//         <div className="max-w-4xl mx-auto">
//           <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
//             How it works
//           </h2>
//           <p className="text-gray-500 text-center text-sm mb-12">
//             Get started in 4 simple steps
//           </p>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {steps.map((item, index) => (
//               <div key={index} className="text-center">
//                 <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-4">
//                   {item.step}
//                 </div>
//                 <h3 className="font-semibold text-gray-800 mb-1">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-500 text-sm">{item.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="bg-blue-600 py-20 px-4 text-center">
//         <h2 className="text-3xl font-bold text-white mb-4">
//           Ready to improve your resume?
//         </h2>
//         <p className="text-blue-100 text-sm mb-8">
//           Join students who are getting more interviews with better resumes.
//         </p>
//         <button
//           onClick={() => navigate(user ? "/dashboard" : "/register")}
//           className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition text-sm"
//         >
//           {user ? "Go to Dashboard" : "Get Started Free"}
//         </button>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-gray-100 py-8 text-center">
//         <div className="flex items-center justify-center gap-2 text-blue-600 font-bold mb-2">
//           <FiFileText size={18} />
//           <span>ResumeAnalyzer</span>
//         </div>
//         <p className="text-gray-800 text-xs">
//           © All rights reserved to Resume Analyzer
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default Home;

import { useNavigate } from "react-router-dom";
import { FiFileText, FiBarChart2, FiLink } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: <FiFileText size={24} className="text-blue-400" />,
      title: "Resume Upload",
      description: "Upload your PDF resume and store it securely in the cloud.",
    },
    {
      icon: <FiBarChart2 size={24} className="text-green-400" />,
      title: "ATS Score",
      description:
        "Get a detailed ATS score with breakdown of what is missing.",
    },
    {
      icon: <FiBarChart2 size={24} className="text-purple-400" />,
      title: "JD Match Score",
      description:
        "Paste a job description and see how well your resume matches it.",
    },
    {
      icon: <FiLink size={24} className="text-yellow-400" />,
      title: "Feedback via Link",
      description:
        "Share a unique link and collect feedback from friends or seniors.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Create Account",
      description: "Sign up for free in seconds.",
    },
    {
      step: "02",
      title: "Upload Resume",
      description: "Upload your PDF resume to get started.",
    },
    {
      step: "03",
      title: "Analyze",
      description: "Get ATS score and JD match results instantly.",
    },
    {
      step: "04",
      title: "Share & Improve",
      description: "Share your resume link and collect feedback.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f1117] text-gray-100">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#0f1117] z-50">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-xl">
          <FiFileText size={24} />
          <span>Resume Analyzer</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="text-sm font-medium text-gray-400 hover:text-gray-200 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center">
        <span className="inline-block bg-blue-900 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full mb-6">
          Free Resume Analyzer
        </span>
        <h1 className="text-5xl font-bold text-gray-100 leading-tight mb-6">
          Get Your Resume
          <span className="text-blue-400"> ATS Ready</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
          Upload your resume, get an ATS score, match it against job
          descriptions, and collect feedback from peers — all in one place.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => navigate(user ? "/dashboard" : "/register")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition text-sm"
          >
            {user ? "Go to Dashboard" : "Get Started Free"}
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-gray-400 hover:text-gray-200 font-medium text-sm transition"
          >
            Login →
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#161b27] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-100 text-center mb-4">
            Everything you need
          </h2>
          <p className="text-gray-500 text-center text-sm mb-12">
            All tools to make your resume stand out
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#0f1117] rounded-xl p-6 border border-gray-800 hover:border-blue-800 transition"
              >
                <div className="bg-[#161b27] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-100 text-center mb-4">
            How it works
          </h2>
          <p className="text-gray-500 text-center text-sm mb-12">
            Get started in 4 simple steps
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-100 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#161b27] py-20 px-4 text-center border-t border-gray-800">
        <h2 className="text-3xl font-bold text-gray-100 mb-4">
          Ready to improve your resume?
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Join students who are getting more interviews with better resumes.
        </p>
        <button
          onClick={() => navigate(user ? "/dashboard" : "/register")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition text-sm"
        >
          {user ? "Go to Dashboard" : "Get Started Free"}
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center">
        <div className="flex items-center justify-center gap-2 text-blue-400 font-bold mb-2">
          <FiFileText size={18} />
          <span>Resume Analyzer</span>
        </div>
        <p className="text-gray-600 text-xs">
          © All rights reserved to Resume Analyzer
        </p>
      </footer>
    </div>
  );
};

export default Home;