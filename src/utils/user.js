const user = () => {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem("user");
        return JSON.parse(user);
    }
}

export default user