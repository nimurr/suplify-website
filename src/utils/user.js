// @/utils/user.js
const getUser = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const userJson = localStorage.getItem("user");
  if (!userJson) {
    return null;
  }

  try {
    return JSON.parse(userJson);
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    return null;
  }
};

export default getUser;