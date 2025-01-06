
// import { createClientServer } from '@/supabase/server';
import Signup from './_components/Signup';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Signup"

};

const PageSignUp = async () => {
  // const supabase = await createClientServer()

  // const { data, error } = await supabase.auth.getUser()
  // if(data) console.log(" PageSignUp data ",data);
  // if(error) console.log(" PageSignUp error ",error);
  
  // if (error || !data?.user) {
  //   redirect('/login')
  // }
  return (

    <>
    <Signup />
    </>
  );
};

export default PageSignUp;
