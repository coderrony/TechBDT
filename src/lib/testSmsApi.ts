// export const sendSms = async () => {
//   const apiUrl = 'http://bulksmsbd.net/api/smsapi';
//   const params = new URLSearchParams({
//     api_key: 'vvmPpqP8voHmyCmIEFau',
//     type: 'text',
//     number: '01853988282', // Replace with the recipient's number
//     senderid: process.env.BULKSMSBD_API_KEY!,
//     message: 'Hello, this is a test SMS.',
//   });

//   try {
//     const response = await fetch(`${apiUrl}?${params.toString()}`);
//     const result = await response.json();
//     console.log('SMS API Response:', result);
//   } catch (error) {
//     console.error('Error sending SMS:', error);
//   }
// };


