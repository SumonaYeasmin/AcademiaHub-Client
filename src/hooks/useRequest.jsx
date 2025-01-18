
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useRequest = () => {
    // Tan stack query
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const { refetch, data: request = [] } = useQuery({
        queryKey: ['request', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/request?email=${user.email}`)
            return res.data;
        }
    })
    return [request, refetch];

};

export default useRequest;
