export const extractNumbers = (text: string) => {
  const numbersArray = text.match(/\d+(\.\d+)?/g);
  if (numbersArray) {
    return numbersArray.join(", ");
  } else {
    return "No numbers detected";
  }
};
