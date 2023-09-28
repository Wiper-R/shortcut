import useAuthContext from "./useAuthContext";

const useLogin = () => {
  const { dispatch } = useAuthContext();
  const login = async (username_or_email: string, password: string) => {
    await fetch("")
  };
};

export default useLogin;
