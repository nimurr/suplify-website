const user = () => {
    let user = null;
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem("user");
        user = JSON.parse(user);
    }
    return user
}

export default user