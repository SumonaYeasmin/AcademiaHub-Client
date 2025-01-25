

const Features = () => {
    const features = [
        {
          id: 1,
          title: "Streamlined Class Management",
          description: "Efficiently manage classes, schedules, and attendance.",
          icon: "📚",
        },
        {
          id: 2,
          title: "Interactive Learning Tools",
          description:
            "Enable real-time collaboration between tutors and students.",
          icon: "💻",
        },
        {
          id: 3,
          title: "Comprehensive Analytics",
          description:
            "Gain insights into student performance and course efficiency.",
          icon: "📊",
        },
        {
          id: 4,
          title: "Customizable Access Levels",
          description:
            "Separate dashboards for institutions, tutors, and students.",
          icon: "🔒",
        },
      ];
    return (
        <div className="my-16">
            <div className=" py-16 bg-gradient-to-br from-teal-300 via-indigo-200 to-purple-300  px-6 md:px-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Why Choose AcademiaHub?
      </h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
        </div>
    );
};

export default Features;