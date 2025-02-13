

export const renderStatus = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'text-orange-700 bg-orange-100 dark:text-white dark:bg-orange-600 p-1 rounded';
    case 'PROCESSING':
      return 'text-blue-700 bg-blue-100 dark:text-blue-100 dark:bg-blue-700 p-1 rounded';
    case 'SHIPPED':
      return 'text-teal-700 bg-teal-100 dark:text-teal-100 dark:bg-teal-700 p-1 rounded'; // Changed SHIPPED color to teal for distinction
    case 'DELIVERED':
      return 'text-green-800 bg-green-200 dark:text-green-200 dark:bg-green-800 p-1 rounded'; // Darker green for DELIVERED
    default:
      return 'bg-gray-100 text-gray-700';
  }
}