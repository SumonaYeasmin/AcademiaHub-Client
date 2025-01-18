
const partners = [
    {
      name: "Google for Education",
      logo: "https://i.ibb.co.com/dfYrT0j/letter-g-education-logo-book-concept-training-career-sign-754537-7704.jpg",
      description: "Empowering classrooms with cutting-edge educational tools.",
    },
    {
      name: "Microsoft Education",
      logo: "https://i.ibb.co.com/8MFnrCH/computer-screen-with-windows-logo-it-1277297-37185.jpg",
      description: "Providing innovative solutions for digital learning.",
    },
    {
      name: "Coursera",
      logo: "https://i.ibb.co.com/xz4PWf0/e-learning-global-community-24877-60109.jpg",
      description: "A leading platform for online courses and certifications.",
    },
    {
      name: "Zoom",
      logo: "https://i.ibb.co.com/pbv2S7g/3d-render-zoom-logo-carved-from-frosted-translucent-blue-plastic-gently-spinning-side-angle-n-102049.jpg",
      description: "Connecting educators and learners through virtual classrooms.",
    },
   
    {
      name: "MIT",
      logo: "https://i.ibb.co.com/xH0wh57/patriotic-mit-logo-with-star-american-flag-straps-letter-mit-logo-with-usa-flag-1101554-36373.jpg",
      description: "Driving innovation through advanced technological education.",
    },
    {
      name: "Dell Technologies",
      logo: "https://i.ibb.co.com/XDSCtZm/modern-stationary-collection-arrangement-23-2149309649.jpg",
      description: "Delivering technology solutions to modernize classrooms.",
    },
  ];
  
  const PartnersSection = () => {
    return (
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          {/* Section Title */}
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Our Trusted Partners
          </h2>
          <p className="text-gray-600 mb-12">
            Collaborating with global leaders to empower education and innovation.
          </p>
  
          {/* Partner Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-left"
              >
                {/* Partner Logo */}
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} Logo`}
                    className="h-16 w-auto"
                  />
                </div>
                {/* Partner Name */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {partner.name}
                </h3>
                {/* Partner Description */}
                <p className="text-gray-600 text-sm">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default PartnersSection;
  