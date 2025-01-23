import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: role = [], isLoading } = useQuery({
        queryKey: ["role", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            // if (!user?.email) return [];
            const result = await axiosSecure.get(`/users/role/${user?.email}`);
            // console.log(result.data);
            return result.data.role;
        },
    });
    return [role, isLoading]
};

export default useRole;