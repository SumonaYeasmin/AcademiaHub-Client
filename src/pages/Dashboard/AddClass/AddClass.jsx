import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddClass = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    // console.log(user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target
        const title = e.target.title.value;
        const name = e.target.name.value;
        const email = e.target.email.value;
        const price = e.target.price.value;
        const description = e.target.description.value;
        // console.log(name, title, email, price, description);

        const image = e.target.image.files[0];
        // console.log(image);
        const imageFile = { image };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        // console.log(res.data);
        const photoURL = res.data.data.display_url;
        // console.log(photoURL);

        const addClassInfo = {
            name,
            title,
            email,
            price,
            description,
            photoURL,
            status: 'pending',
            totalEnrolment: 0
        }
        // console.log(addClassInfo);

        const response = await axiosSecure.post('/add-class', addClassInfo)
        // console.log(response.data);
        try {
            if (response.data.insertedId) {
                console.log("Added to mongoDB");
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Request submitted successfully!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                form.reset()

            }
        }
        catch {
            // console.log('Error');
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Failed to submit request. Please try again later.",
                showConfirmButton: false,
                timer: 2000,
            });
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add a New class</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
                        <input type="text" id="title" name="title" placeholder="Enter class title" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                        <input type="text" id="name" name="name" defaultValue={user?.displayName} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" readOnly />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                        <input type="email" id="email" name="email" defaultValue={user?.email} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" readOnly />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price</label>
                        <input type="number" id="price" name="price" placeholder="Enter class price" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" min='1' required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea id="description" name="description" placeholder="Enter class description" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Image</label>
                        <input type="file" id="image" name="image" accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Add className</button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default AddClass;