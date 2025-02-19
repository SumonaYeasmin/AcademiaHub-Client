const ContactUs = () => {
    return (
      <div className="max-w-3xl mx-auto p-10 bg-gray-100 my-16 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">📞 Contact Us</h1>
  
        <div className="bg-white shadow-lg rounded-lg p-8 w-full md:w-3/4 lg:w-1/2 text-center">
          <p className="text-gray-600 text-lg">
            Have any questions? Feel free to reach out to us!
          </p>
  
          <div className="mt-6 space-y-4 text-gray-700">
            <p className="text-xl">
              📍 <strong>Address:</strong> 123 Learning Street, Education City, USA
            </p>
            <p className="text-xl">
              ✉️ <strong>Email:</strong> support@academiahub.com
            </p>
            <p className="text-xl">
              📞 <strong>Phone:</strong> +1 234 567 890
            </p>
            <p className="text-xl">
              🌍 <strong>Website:</strong> www.academiahub.com
            </p>
          </div>
  
          <div className="mt-6">
            <p className="text-gray-500 text-sm">We are available Monday - Friday, 9AM - 6PM (EST).</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default ContactUs;
  