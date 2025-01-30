"use client"
import { FC } from 'react';
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/images/techbdtLogo/techbdt-logo.png";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import { formatDate } from '@/utils/dateFormat';
import formatNumber from '@/utils/formatNumber';
import { renderStatus } from './OrderInfo';

interface OrderInvoiceProps {
  className?: string;
  invoiceData:any;
  setInvoiceData:(data:any)=>void;
}

const OrderInvoice: FC<OrderInvoiceProps> = ({invoiceData,setInvoiceData}) => {
  console.log("invoiceData ",invoiceData);
  return (
    <div className=" bg-gray-100 dark:bg-gray-900 py-5 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 p-10 w-full max-w-3xl rounded-lg shadow-lg relative overflow-x-auto">
        {/* Close Button */}
  
        <ButtonClose onClick={()=>setInvoiceData(null)} className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-red-500 bg-gray-100 dark:bg-gray-600" />
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Image width={100} height={100} src={logo} alt="Company Logo" />
          <h3 className="text-2xl font-semibold text-blue-900 dark:text-blue-400">Invoice</h3>
        </div>

        <div className="border-b border-gray-300 dark:border-gray-600 my-4"></div>

        {/* Invoice Details */}
        <div className="flex justify-between text-sm">
          <p>
            <span className="font-bold">Date:</span> {formatDate(invoiceData.date)}
          </p>
          <p>
            <span className="font-bold">Invoice No:</span> #{invoiceData.id.slice(-12)}
          </p>
        </div>

        <div className="border-b border-gray-300 dark:border-gray-600 my-4"></div>
        {/* Invoiced To & Pay To */}
        <div className="grid grid-cols-2  gap-4 text-sm">
          <div>
            <p className="font-bold">Invoiced To:</p>
            <p>{invoiceData?.full_name.toUpperCase()}</p>
            <p>{invoiceData?.phone}</p>
            {invoiceData?.shipping_address.mobile.length > 0 && <p>Additional Mobile:</p>}
            {invoiceData?.shipping_address.mobile.length > 0 && invoiceData.mobile.map((item:any)=>  <p key={item}>{item}</p> )}
            <p>Shipping Address:</p>
            <p>{invoiceData?.shipping_address.house}</p>
            <p>{invoiceData?.shipping_address.division}, {invoiceData?.shipping_address.district}</p>
            <p>{invoiceData?.shipping_address.union},{invoiceData?.shipping_address.upzila}</p>
          </div>
       
          <div className="sm:text-right">
            {/* <p className="font-bold">Pay To:</p> */}
            <p className={renderStatus(invoiceData.status)}>{invoiceData.status}</p>
            <p>{invoiceData.payment_method}</p>
            <p>TrxID: {invoiceData.transaction_id}</p>
            <p>{invoiceData.delivery_type === "Regular" ? "Regular Delivery" : "Cash On Delivery" }</p>
          </div>
        </div>

        <div className="border-b border-gray-300 dark:border-gray-600 my-4"></div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="p-2 text-left font-bold">Product</th>
                <th className="p-2 text-right font-bold">Color</th>
                <th className="p-2 text-right font-bold">Size</th>
                <th className="p-2 text-right font-bold">QTY</th>
                <th className="p-2 text-right font-bold">Amount</th>
              </tr>
            </thead>
            <tbody>

              {invoiceData?.products?.map((product: any) => 
              <tr key={product._id.toString()} className="border-b dark:border-gray-600">
                <td className="p-2 text-left">{product?.product_name}</td>
                <td className="p-2 text-right">{product?.color ? product?.color  : " "}</td>
                <td className="p-2 text-right">{product?.size ? product?.size  : " "}</td>
                <td className="p-2 text-right">{product?.quantity}</td>
                <td className="p-2 text-right">{formatNumber(product?.price)}</td>
              </tr>)}
            
             
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="mt-4 text-sm">
          <div className="flex justify-between border-b dark:border-gray-600 py-1">
            <span className="font-bold">Sub Total:</span>
            <span>{formatNumber(invoiceData.subtotal)}</span>
          </div>
          <div className="flex justify-between border-b dark:border-gray-600 py-1">
            <span className="font-bold">Shipping Cost:</span>
            <span>{formatNumber(invoiceData.shipping_cost)}</span>
          </div>
        
          <div className="flex justify-between border-b text-lg font-bold py-2">
            <span>Total:</span>
            <span>{formatNumber(invoiceData.subtotal + invoiceData.shipping_cost)}</span>
          </div>

          <div className="flex justify-between border-b dark:border-gray-600 py-1">
            <span className="font-bold">Paid:</span>
            <span>{formatNumber(invoiceData.paid)}</span>
          </div>
          <div className="flex justify-between border-b dark:border-gray-600 py-1 text-red-400">
            <span className="font-bold">Due Payment:</span>
            <span >{formatNumber(invoiceData.due_payment)}</span>
          </div>

        </div>

        {/* Footer */}
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-5">
          <span className="font-bold">NOTE:&nbsp;</span>This is a computer-generated receipt and does not require a physical signature.
        </p>

            {/* <div className="text-right text-sm sm:text-base">
            <p className="font-bold">Pay To:</p>
            <p>TechBDT Inc.</p>
            <p>RDC. Enterprise</p>
            <p>+8801814010159</p>
            <p>support@techbdt.com</p>
          </div> */}
      </div>
    </div>
  );
};

export default OrderInvoice;