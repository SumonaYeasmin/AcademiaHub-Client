
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";




const UseCount = () => {
    const {user} = useAuth()
    // Tan stack query
    const axiosSecure = useAxiosSecure();
 

    const { refetch, data: assignments = [] } = useQuery({
        queryKey: ['assignments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assignments/${user?.email}`)
            return res.data;
        }
    })
    return [assignments, refetch];

};

export default UseCount;
