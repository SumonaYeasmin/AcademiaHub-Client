import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const alumniData = [
    {
        id: 1,
        name: "Aisha Rahman",
        course: "Full-Stack Web Development",
        currentPosition: "Software Engineer at Google",
        image: "https://i.ibb.co/Zp6qhtDz/30.jpg",
        successStory: "After completing the Full-Stack Web Development course, I secured a position at Google as a software engineer. The learning experience was truly life-changing!"
    },
    {
        id: 2,
        name: "Rahul Chatterjee",
        course: "Digital Marketing Masterclass",
        currentPosition: "Marketing Manager at Facebook",
        image: "https://i.ibb.co/jk7PGV3n/b4c73096fe542775480e9ad316786e06.jpg",
        successStory: "Thanks to the Digital Marketing Masterclass, I now work at Facebook as a Marketing Manager. The course gave me practical insights that helped me land this dream job!"
    },
    {
        id: 3,
        name: "Nadia Hossain",
        course: "UI/UX Design Fundamentals",
        currentPosition: "Product Designer at Apple",
        image: "https://i.ibb.co/275gkDnM/borkha-pora-profile-picture-63-photocollectionokb-okbangla.jpg",
        successStory: "The UI/UX Design Fundamentals course was instrumental in helping me become a Product Designer at Apple. The hands-on approach made learning easy and effective."
    },
    {
        id: 4,
        name: "Imran Ahmed",
        course: "Graphic Design Masterclass",
        currentPosition: "Senior Graphic Designer at Adobe",
        image: "https://i.ibb.co/R4cp6tBp/young-man-very-smiley-during-260nw-389055514.webp",
        successStory: "The Graphic Design Masterclass gave me the skills I needed to excel as a designer. Now, I work as a Senior Graphic Designer at Adobe, creating visually stunning content for global brands!"
    }
];

const SuccessStoriesDetails = () => {
    const { id } = useParams();
    const [alumni, setAlumni] = useState(null);

    useEffect(() => {
        const selectedAlumni = alumniData.find((student) => student.id === parseInt(id));
        setAlumni(selectedAlumni);
    }, [id]);

    if (!alumni) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    return (
        <div className="max-w-2xl mx-auto p-5 bg-white shadow-lg rounded-lg my-10 border">
            <img src={alumni.image} alt={alumni.name} className="w-full h-2/4 object-cover rounded-lg shadow-md" />
            <h1 className="text-3xl font-bold mt-4 text-gray-800">{alumni.name}</h1>
            <p className="text-lg text-gray-600 mt-2 font-semibold">Completed Course: {alumni.course}</p>
            <p className="text-lg text-teal-700 mt-1">{alumni.currentPosition}</p>
            <p className="text-gray-700 mt-4 leading-relaxed">{alumni.successStory}</p>

            {/* ✅ "Go Back to Home" Button */}
            <div className="mt-6 text-center">
                <Link to="/" className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all">
                    ⬅️ Go Back to Home
                </Link>
            </div>
        </div>
    );
};

export default SuccessStoriesDetails;
