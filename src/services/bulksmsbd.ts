

export const otpSender = async (phone: string, otp: string) => {
  try {
    const message = encodeURIComponent(
      `(TechBDT.com) Please use code ${otp} to verify your phone number`,
    );
    const apiUrl = `http://bulksmsbd.net/api/smsapi?api_key=${
      process.env.BULKSMSBD_API_KEY
    }&senderid=${
      process.env.BULKSMSBD_SENDER_ID
    }&type=text&number=${`${phone}`}&message=${message}`;
  
    const response = await fetch(apiUrl, {
      method: 'GET',
    });
  
    const responseBody = (await response.text()) as any;

    console.log('SMS API Response:', responseBody);
    return responseBody;
    
  } catch (error: any) {
    throw new Error(error.message);
    
  }
}