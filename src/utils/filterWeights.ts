export const filterWeights = (weights: string[]) => {
  const minWeight = 40; // Minimum adult weight (in kilograms)
  const maxWeight = 150; // Maximum adult weight (in kilograms)

  return weights.filter(weight => {
    const numericWeights = weight
      .split(", ")
      .map(w => parseFloat(w.replace(",", "")));
    return numericWeights.some(numericWeight => {
      return numericWeight >= minWeight && numericWeight <= maxWeight;
    });
  });
};
