
import Signup from './_components/Signup';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Signup"
};
const PageSignUp = async () => {
  return (
    <>
    <Signup />
    </>
  );
};

export default PageSignUp;
