// Utility function to truncate 
export const truncate1 = (text: string , startChars: number = 6, endChars: number = 6): string => {
  if (text.length <= startChars + endChars) {
    return text;
  }
  return `${text.substring(0, startChars)}...${text.substring(text.length - endChars)}`;
};


export const truncate2 = (text: string , startChars: number = 3, endChars: number = 3): string => {
  if (text.length <= startChars + endChars) {
    return text;
  }
  return `${text.substring(0, startChars)}...${text.substring(text.length - endChars)}`;
};