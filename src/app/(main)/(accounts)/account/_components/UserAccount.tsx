"use client"
import Prices from '@/components/Prices';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import Image from 'next/image';
import { FC, useState, useTransition } from 'react';
import taka from '@/images/taka.png';
import useAuthData from '@/hooks/useAuthData';
import AccountInfo from './AccountInfo';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import axios from 'axios';
import toast from 'react-hot-toast';
import NotifyAlert from '@/components/NotifyToaster';
import { notify_duration } from '@/data/defaultValue';
import LoadingIndicator from '@/components/LoadingIndicator';
interface UserAccountProps {
  className?: string;
}

// const PRODUCTS = [
//   {
//     id: "6",
//     name: "Bluetooth Speaker",
//     price: 3500,
//     stock:36,
//     discount:47,
//     productRole:"active",
//     // image: productSport5,
  
//     category: "Audio",
//     subCategory: "speaker",
//     color: "Red",
//     status: "New in",
//     sizes: ["LARGE","SMALL"],
//     productContent: [
//       {
//         name: "Description",
//         content:`  
//              <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl">
            
//               <p>
//                 The St. Louis Meramec Canoe Company was founded by Alfred Wickett in
//                 1922. Wickett had previously worked for the Old Town Canoe Co from
//                 1900 to 1914. Manufacturing of the classic wooden canoes in Valley
//                 Park, Missouri ceased in 1978.
//               </p>
    
//               <ul class="list-disc list-inside leading-7 mt-3"
//                <li> </li>
//                 <li> Regular fit, mid-weight t-shirt </li>
//                 <li>Natural color, 100% premium combed organic cotton</li>
//                 <li>Natural color, 100% premium combed organic cotton</li>
//                 <li>
//                   Quality cotton grown without the use of herbicides or pesticides -
//                   GOTS certified
//                 </li>
//                 <li>Soft touch water based printed in the USA</li>
//               </ul>
//               </div>
//             `,
//       },
//     ],
//     reviews: [
//       {
//         userId: "7",
//         message: "Perfect for outdoor use.",
//         username: "james",
//         rating: 4,
      
//       },
//     ],
//     variants: [
//       {
//         productId: "jgh2345dsfg",
    
//         color: "red",
//       },
//     ],
//   },

// ]


const UserAccount: FC<UserAccountProps> = () => {
  const { authDataFetch:{authData,refetchAuthData} } = useAuthData() as any;
  const [selectedAddress,setSelectedAddress] = useState<any>(null)
  const [isSelectAddress,setIsSelectAddress] = useState(false)
  const [isPending, startTransition] = useTransition();

  console.log("UserAccount authData ",authData);
  

  // const renderProductItem = (product: any, index: number) => {
  //   const { name } = product;
  //   return (
  //     <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
  //       <div className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
  //         <Image
  //           fill
  //           sizes="100px"
  //           src={taka}
  //           alt={name}
  //           className="h-full w-full object-cover object-center"
  //         />
  //       </div>

  //       <div className="ml-4 flex flex-1 flex-col">
  //         <div>
  //           <div className="flex justify-between ">
  //             <div>
  //               <h3 className="text-base font-medium line-clamp-1">{name}</h3>
  //               <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
  //                 <span>{"Natural"}</span>
  //                 <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
  //                 <span>{"XL"}</span>
  //               </p>
  //             </div>
  //             <Prices className="mt-0.5 ml-2" />
  //           </div>
  //         </div>
  //         <div className="flex flex-1 items-end justify-between text-sm">
  //           <p className="text-gray-500 dark:text-slate-400 flex items-center">
  //             <span className="hidden sm:inline-block">Qty</span>
  //             <span className="inline-block sm:hidden">x</span>
  //             <span className="ml-2">1</span>
  //           </p>

  //           <div className="flex">
  //             <button
  //               type="button"
  //               className="font-medium text-indigo-600 dark:text-primary-500 "
  //             >
  //               Leave review
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const handleEdit = (address:any)=>{ 
    setSelectedAddress(address)
    setIsSelectAddress(true)
  }

  const manageAddress = ()=>{
    setSelectedAddress(null)
    setIsSelectAddress(false)
  }

  const handleDelete = (addressId:any)=>{ 
    startTransition(async()=>{
      const res = (await axios.delete('/api/user-auth', {
        data: { addressId, userId:authData?.id },
      })) as any;
      const result = res.data;

      console.log("result ",result);
      
      if(result.status === 200){
        refetchAuthData()
        notifyToast(false, 'Account Address',result.message);
      }else{ 
        notifyToast(true, 'Account Address',result.message);
      }
    })
  
  }

  const renderOrder = (address:any) => {
    return (
      <div key={address._id.toString()} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0 my-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
         <div>
            <p className="text-lg font-semibold">Name: {authData?.full_name}</p>
            <p className="text-slate-500 dark:text-slate-400  mt-1.5 sm:mt-2">
              <span className=" font-semibold">Phone: {authData?.phone}</span>
              <span className="mx-2"></span>
              <span className="text-green-500">Verified</span>
            </p>
           
            <p className="text-slate-500 dark:text-slate-400 mt-3 sm:mt-4">
              <span>Address: {address?.house}</span> <br/>
              <span className="my-2">{address?.division}, {address?.district}, {address?.union}, {address?.upzila}</span>  <br/>
              {address?.mobile?.length > 0 &&  <span>Additional Mobile: </span> }
             
              {address?.mobile?.length > 0 && address?.mobile?.map((mobile:any)=>  <span key={mobile} className="text-primary-500">{mobile} {"   "} </span> )}
              {/* <span className="text-primary-500">Verified</span> */}
            </p>
          </div>
          <div className="mt-3 flex flex-col gap-3 sm:mt-0">
            <ButtonSecondary
              onClick={()=> handleEdit(address)}
              sizeClass="py-2.5 px-4 sm:px-6"
              fontSize="text-sm font-medium"
            >
              EDIT
            </ButtonSecondary>
            {authData.address.length > 1 && 
             <ButtonSecondary
              sizeClass="py-2.5 px-4 sm:px-6"
              fontSize="text-sm font-medium"
              onClick={()=> handleDelete(address._id.toString())}
            >
              DELETE
            </ButtonSecondary> }
         
          </div>
        </div>
   
      </div>
    );
  };

  const notifyToast = (isError: boolean, title: string, message: string) => {
    toast.custom(
      t => (
        <NotifyAlert
          show={t.visible}
          isError={isError}
          title={title}
          message={message}
        />
      ),
      {
        position: 'top-right',
        id: 'nc-product-notify',
        duration: notify_duration,
      },
    );
  };
  if (isPending) return <LoadingIndicator />;

  return (
    <div>
      {authData?.address?.length > 0 && !isSelectAddress  ?
       <>
       <div className="flex justify-between mb-4">
         <h2 className='text-lg font-semibold'>Manage Address</h2>
         <ButtonPrimary onClick={()=> setIsSelectAddress(true)}>Add New Address</ButtonPrimary>
       </div>
       
      {authData?.address.map((item:any)=> renderOrder(item))}
      
      </>  : <AccountInfo selectedAddress={selectedAddress} onChangeManageAddress={manageAddress} />}
     {/* {renderOrder()} */}
    </div>
  );
};

export default UserAccount;