
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";



const UseCount = () => {
    // Tan stack query
    const axiosSecure = useAxiosSecure();
 

    const { refetch, data: assignments = [] } = useQuery({
        queryKey: ['assignments', ],
        queryFn: async () => {
            const res = await axiosSecure.get('/assignments')
            return res.data;
        }
    })
    return [assignments, refetch];

};

export default UseCount;
