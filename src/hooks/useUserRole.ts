import { useEffect, useState } from "react"

const useUserRole = () => {
    const [role, setRole] = useState(null);

    useEffect(()=>{
        try {
            const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}');
            setRole(userInfo.role || null);
        } catch (error) {
            console.error('Error parsing user info:', error);
            setRole(null);
        }
    }, [])

    return role;
}

export default useUserRole;
