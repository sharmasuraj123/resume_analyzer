// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';
// import { FiFileText, FiStar } from 'react-icons/fi';
// import api from '../services/api';

// const PublicFeedback = () => {
//     const { token } = useParams();
//     const [resume, setResume] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [submitting, setSubmitting] = useState(false);
//     const [submitted, setSubmitted] = useState(false);
//     const [rating, setRating] = useState(0);
//     const [hoveredRating, setHoveredRating] = useState(0);
//     const [form, setForm] = useState({
//         reviewerName: '',
//         comment: '',
//         isAnonymous: false
//     });

//     useEffect(() => {
//         fetchResume();
//     }, []);

//     const fetchResume = async () => {
//         try {
//             setLoading(true);
//             const res = await api.get(`/feedback/${token}`);
//             setResume(res.data);
//         } catch (error) {
//             toast.error('Invalid or expired link');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSubmit = async () => {
//         if (rating === 0) {
//             toast.error('Please select a rating');
//             return;
//         }
//         if (!form.comment.trim()) {
//             toast.error('Please write a comment');
//             return;
//         }

//         try {
//             setSubmitting(true);
//             await api.post(`/feedback/${token}`, {
//                 ...form,
//                 rating
//             });
//             setSubmitted(true);
//             toast.success('Feedback submitted!');
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Failed to submit feedback');
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <p className="text-gray-400">Loading...</p>
//             </div>
//         );
//     }

//     if (!resume) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <p className="text-gray-700 font-medium text-lg">Invalid or expired link</p>
//                     <p className="text-gray-400 text-sm mt-2">This resume link does not exist.</p>
//                 </div>
//             </div>
//         );
//     }

//     if (submitted) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//                 <div className="bg-white rounded-2xl shadow-md p-10 text-center max-w-md w-full">
//                     <div className="text-green-500 text-5xl mb-4">✓</div>
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
//                     <p className="text-gray-500 text-sm">
//                         Your feedback has been submitted successfully.
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 px-4 py-10">
//             <Toaster position="top-right" />

//             <div className="max-w-xl mx-auto space-y-6">

//                 {/* Header */}
//                 <div className="text-center">
//                     <h1 className="text-2xl font-bold text-gray-800">Resume Feedback</h1>
//                     <p className="text-gray-500 text-sm mt-1">
//                         You've been asked to review a resume
//                     </p>
//                 </div>

//                 {/* Resume Info */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
//                     <div className="bg-blue-50 p-3 rounded-lg">
//                         <FiFileText size={24} className="text-blue-600" />
//                     </div>
//                     <div>
//                         <p className="font-medium text-gray-800">{resume.fileName}</p>
//                         <p className="text-gray-400 text-xs mt-0.5">
//                             Version {resume.version} • {new Date(resume.createdAt).toLocaleDateString()}
//                         </p>
//                     </div>
//                     <a
//                         href={resume.fileUrl}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="ml-auto text-blue-600 text-sm font-medium hover:underline"
//                     >
//                         View PDF
//                     </a>
//                 </div>

//                 {/* Feedback Form */}
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">

//                     {/* Star Rating */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Rating
//                         </label>
//                         <div className="flex gap-2">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                                 <button
//                                     key={star}
//                                     onClick={() => setRating(star)}
//                                     onMouseEnter={() => setHoveredRating(star)}
//                                     onMouseLeave={() => setHoveredRating(0)}
//                                     className="text-3xl transition"
//                                 >
//                                     <FiStar
//                                         size={32}
//                                         className={`transition ${
//                                             star <= (hoveredRating || rating)
//                                                 ? 'text-yellow-400 fill-yellow-400'
//                                                 : 'text-gray-300'
//                                         }`}
//                                         style={{
//                                             fill: star <= (hoveredRating || rating) ? '#facc15' : 'none'
//                                         }}
//                                     />
//                                 </button>
//                             ))}
//                         </div>
//                         {rating > 0 && (
//                             <p className="text-xs text-gray-400 mt-1">
//                                 {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
//                             </p>
//                         )}
//                     </div>

//                     {/* Reviewer Name */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Your Name
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="John Doe"
//                             disabled={form.isAnonymous}
//                             value={form.reviewerName}
//                             onChange={(e) => setForm({ ...form, reviewerName: e.target.value })}
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition disabled:bg-gray-50 disabled:text-gray-400"
//                         />
//                     </div>

//                     {/* Anonymous toggle */}
//                     <div className="flex items-center gap-2">
//                         <input
//                             type="checkbox"
//                             id="anonymous"
//                             checked={form.isAnonymous}
//                             onChange={(e) => setForm({ ...form, isAnonymous: e.target.checked })}
//                             className="w-4 h-4 accent-blue-600"
//                         />
//                         <label htmlFor="anonymous" className="text-sm text-gray-600 cursor-pointer">
//                             Submit anonymously
//                         </label>
//                     </div>

//                     {/* Comment */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Comment
//                         </label>
//                         <textarea
//                             rows={4}
//                             placeholder="Share your thoughts on this resume..."
//                             value={form.comment}
//                             onChange={(e) => setForm({ ...form, comment: e.target.value })}
//                             className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
//                         />
//                     </div>

//                     {/* Submit */}
//                     <button
//                         onClick={handleSubmit}
//                         disabled={submitting}
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-60"
//                     >
//                         {submitting ? 'Submitting...' : 'Submit Feedback'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PublicFeedback;









import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FiFileText, FiStar } from 'react-icons/fi';
import api from '../services/api';

const PublicFeedback = () => {
    const { token } = useParams();
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [form, setForm] = useState({
        reviewerName: '',
        comment: '',
        isAnonymous: false
    });

    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/feedback/${token}`);
            setResume(res.data);
        } catch (error) {
            toast.error('Invalid or expired link');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }
        if (!form.comment.trim()) {
            toast.error('Please write a comment');
            return;
        }
        try {
            setSubmitting(true);
            await api.post(`/feedback/${token}`, { ...form, rating });
            setSubmitted(true);
            toast.success('Feedback submitted!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit feedback');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (!resume) {
        return (
            <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-100 font-medium text-lg">Invalid or expired link</p>
                    <p className="text-gray-500 text-sm mt-2">This resume link does not exist.</p>
                </div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4">
                <div className="bg-[#161b27] rounded-2xl border border-gray-800 p-10 text-center max-w-md w-full">
                    <div className="text-green-400 text-5xl mb-4">✓</div>
                    <h2 className="text-2xl font-bold text-gray-100 mb-2">Thank You!</h2>
                    <p className="text-gray-400 text-sm">
                        Your feedback has been submitted successfully.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f1117] px-4 py-10">
            <Toaster position="top-right" />

            <div className="max-w-xl mx-auto space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-100">Resume Feedback</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        You've been asked to review a resume
                    </p>
                </div>

                {/* Resume Info */}
                <div className="bg-[#161b27] rounded-xl border border-gray-800 p-5 flex items-center gap-4">
                    <div className="bg-[#0f1117] p-3 rounded-lg">
                        <FiFileText size={24} className="text-blue-400" />
                    </div>
                    <div>
                        <p className="font-medium text-gray-100">{resume.fileName}</p>
                        <p className="text-gray-500 text-xs mt-0.5">
                            Version {resume.version} • {new Date(resume.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    
                    <a    href={resume.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-auto text-blue-400 text-sm font-medium hover:underline"
                    >
                        View PDF
                    </a>
                </div>

                {/* Feedback Form */}
                <div className="bg-[#161b27] rounded-xl border border-gray-800 p-6 space-y-5">

                    {/* Star Rating */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Rating
                        </label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    className="text-3xl transition"
                                >
                                    <FiStar
                                        size={32}
                                        className="transition"
                                        style={{
                                            fill: star <= (hoveredRating || rating) ? '#facc15' : 'none',
                                            color: star <= (hoveredRating || rating) ? '#facc15' : '#4b5563'
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                        {rating > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                                {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
                            </p>
                        )}
                    </div>

                    {/* Reviewer Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Your Name
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            disabled={form.isAnonymous}
                            value={form.reviewerName}
                            onChange={(e) => setForm({ ...form, reviewerName: e.target.value })}
                            className="w-full bg-[#0f1117] border border-gray-700 text-gray-100 placeholder-gray-600 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
                        />
                    </div>

                    {/* Anonymous */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="anonymous"
                            checked={form.isAnonymous}
                            onChange={(e) => setForm({ ...form, isAnonymous: e.target.checked })}
                            className="w-4 h-4 accent-blue-600"
                        />
                        <label htmlFor="anonymous" className="text-sm text-gray-400 cursor-pointer">
                            Submit anonymously
                        </label>
                    </div>

                    {/* Comment */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Comment
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Share your thoughts on this resume..."
                            value={form.comment}
                            onChange={(e) => setForm({ ...form, comment: e.target.value })}
                            className="w-full bg-[#0f1117] border border-gray-700 text-gray-100 placeholder-gray-600 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-60"
                    >
                        {submitting ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PublicFeedback;