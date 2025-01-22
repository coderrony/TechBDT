'use client';

import ButtonSecondary from '@/shared/Button/ButtonSecondary';

import { FC, useState, useTransition } from 'react';

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

const UserAccount: FC<UserAccountProps> = () => {
  const {authData, refetchAuthData } = useAuthData() as any;
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [isSelectAddress, setIsSelectAddress] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleEdit = (address: any) => {
    setSelectedAddress(address);
    setIsSelectAddress(true);
  };

  const manageAddress = () => {
    setSelectedAddress(null);
    setIsSelectAddress(false);
  };

  const handleDelete = (addressId: any) => {
    startTransition(async () => {
      const res = (await axios.delete('/api/user-auth', {
        data: { addressId, userId: authData?.id },
      })) as any;
      const result = res.data;

      if (result.status === 200) {
        refetchAuthData();
        notifyToast(false, 'Account Address', result.message);
      } else {
        notifyToast(true, 'Account Address', result.message);
      }
    });
  };

  const renderOrder = (address: any) => {
    return (
      <div
        key={address._id.toString()}
        className='border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0 my-3'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5'>
          <div>
            <p className='text-lg font-semibold'>Name: {authData?.full_name}</p>
            <p className='text-slate-500 dark:text-slate-400  mt-1.5 sm:mt-2'>
              <span className=' font-semibold'>Phone: {authData?.phone}</span>
              <span className='mx-2'></span>
              <span className='text-green-500'>Verified</span>
            </p>

            <p className='text-slate-500 dark:text-slate-400 mt-3 sm:mt-4'>
              <span>Address: {address?.house}</span> <br />
              <span className='my-2'>
                {address?.division}, {address?.district}, {address?.union},{' '}
                {address?.upzila}
              </span>{' '}
              <br />
              {address?.mobile?.length > 0 && <span>Additional Mobile: </span>}
              {address?.mobile?.length > 0 &&
                address?.mobile?.map((mobile: any) => (
                  <span key={mobile} className='text-primary-500'>
                    {mobile} {'   '}{' '}
                  </span>
                ))}
              {/* <span className="text-primary-500">Verified</span> */}
            </p>
          </div>
          <div className='mt-3 flex flex-col gap-3 sm:mt-0'>
            <ButtonSecondary
              onClick={() => handleEdit(address)}
              sizeClass='py-2.5 px-4 sm:px-6'
              fontSize='text-sm font-medium'>
              EDIT
            </ButtonSecondary>
            {authData.address.length > 1 && (
              <ButtonSecondary
                sizeClass='py-2.5 px-4 sm:px-6'
                fontSize='text-sm font-medium'
                onClick={() => handleDelete(address._id.toString())}>
                DELETE
              </ButtonSecondary>
            )}
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
      {authData?.address?.length > 0 && !isSelectAddress ? (
        <>
          <div className='flex justify-between mb-4'>
            <h2 className='text-lg font-semibold'>Manage Address</h2>
            <ButtonPrimary onClick={() => setIsSelectAddress(true)}>
              Add New Address
            </ButtonPrimary>
          </div>

          {authData?.address.map((item: any) => renderOrder(item))}
        </>
      ) : (
        <AccountInfo
          selectedAddress={selectedAddress}
          onChangeManageAddress={manageAddress}
        />
      )}
  
    </div>
  );
};

export default UserAccount;
