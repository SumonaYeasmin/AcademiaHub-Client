import { Link } from "react-router-dom";

const SuccessStories = () => {
  const alumni = [
    {
      id: 1,
      name: "Aisha Rahman",
      course: "Full-Stack Web Development",
      currentPosition: "Software Engineer at Google",
      image: "https://i.ibb.co.com/Zp6qhtDz/30.jpg",
    },
    {
      id: 2,
      name: "Rahul Chatterjee",
      course: "Digital Marketing Masterclass",
      currentPosition: "Marketing Manager at Facebook",
      image: "https://i.ibb.co.com/jk7PGV3n/b4c73096fe542775480e9ad316786e06.jpg",
    },
    {
      id: 3,
      name: "Nadia Hossain",
      course: "UI/UX Design Fundamentals",
      currentPosition: "Product Designer at Apple",
      image: "https://i.ibb.co.com/275gkDnM/borkha-pora-profile-picture-63-photocollectionokb-okbangla.jpg",
    },
    {
      id: 4,
      name: "Imran Ahmed",
      course: "Graphic Design Masterclass",
      currentPosition: "Senior Graphic Designer at Adobe",
      image: "https://i.ibb.co.com/R4cp6tBp/young-man-very-smiley-during-260nw-389055514.webp",
     
  }
  ];

  return (
    <section className="py-10 bg-gray-100 mt-10 mb-16 border">
      <div className="container mx-auto px-5 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Success Stories & Alumni
        </h2>
        <p className="mb-8 text-gray-600">Meet our graduates who are excelling in their careers!</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {alumni.map((student) => (
            <div
              key={student.id}
              className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <img
                src={student.image}
                alt={student.name}
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {student.name}
              </h3>
              <p className="text-gray-600">{student.course}</p>
              <p className="text-teal-600 font-medium my-2">
                {student.currentPosition}
              </p>
              
          
              <Link to={`/successStoriesDetails/${student.id}`} className="bg-blue-500 text-white px-2 py-1 rounded-md  hover:bg-blue-600">
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
