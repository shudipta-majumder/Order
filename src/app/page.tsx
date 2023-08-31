import LoginForm from "@/components/pageComponents/login/LoginForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

type Props = {};

const Login = async (props: Props) => {
  const session = await getServerSession(authOptions);
  if (session) {
    //@ts-ignore
    session.user.data.is_management
      ? redirect("/admin")
      : redirect("/quotation");
  }
  return <LoginForm />;
};

export default Login;
