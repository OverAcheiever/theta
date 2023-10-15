export const getMostCommonWeight = (weights: string[]) => {
  const weightCounts: { [key: string]: number } = {};

  weights.forEach(weight => {
    const numericWeights = weight.split(", ").map(w => parseFloat(w));
    numericWeights.forEach(numericWeight => {
      weightCounts[numericWeight.toString()] =
        (weightCounts[numericWeight.toString()] || 0) + 1;
    });
  });

  let mostCommonWeight = "Weight couldn't be detected";
  let maxCount = 0;

  Object.keys(weightCounts).forEach(weight => {
    const count = weightCounts[weight];
    if (count > maxCount) {
      maxCount = count;
      mostCommonWeight = weight;
    }
  });

  return mostCommonWeight;
};
