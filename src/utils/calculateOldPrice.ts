

export default function calculateOldPrice(price: number, percentage: number): number {
  const oldPrice = price / (1 - (percentage / 100));
  
  if(price && percentage) {
    return Math.floor(oldPrice)
  }else{ 
    return 0
  }

}