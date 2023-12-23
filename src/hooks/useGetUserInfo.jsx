export const useGetUserInfo = () => {
  const { name, email, photoURL, isAuth, timestamp, userId } =
    JSON.parse(localStorage.getItem("auth")) || {};

  return { name, email, photoURL, isAuth, timestamp, userId };
};
