export const useGetUserInfo = () => {
  const { name, email, photoURL, isAuth, createdAt, userId } =
    JSON.parse(localStorage.getItem("auth")) || {};

  return { name, email, photoURL, isAuth, createdAt, userId };
};
