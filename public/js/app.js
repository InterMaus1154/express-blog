export const token = localStorage.getItem("token");

export const requireAuth = () => {
    if (!token) window.location = "/login";
};

export const apiFetch = async (path, options = {}) => {
    const res = await fetch(path, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers
        }
    });

    if(res.status === 401){
        localStorage.removeItem("token");
        window.location = '/login';
        return;
    }

    return res.json();
};