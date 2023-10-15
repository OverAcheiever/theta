"use client";
import { useState } from "react";
import { getMostCommonWeight } from "@/utils/getMostCommonWeight";
import { WebcamCapture } from "@/components/webcam/WebcamCapture";
import { filterWeights } from "@/utils/filterWeights";

const App = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [detectedWeights, setDetectedWeights] = useState<string[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  let intervalId: NodeJS.Timeout | null = null; // Declare intervalId here

  const openCamera = () => {
    setShowCamera(true);
    setIsFirstLoad(false);
    setDetectedWeights([]);
  };

  const closeCamera = () => {
    setShowCamera(false);

    if (
      detectedWeights.length > 0 &&
      detectedWeights.every(weight => weight === "No numbers detected")
    ) {
      setDetectedWeights(prev => [...prev, "Weight couldn't be detected"]);
    }

    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const numericWeights = filterWeights(
    detectedWeights.filter(weight => weight !== "No numbers detected")
  );

  const mostCommonWeight = getMostCommonWeight(numericWeights);

  return (
    <div>
      {!showCamera && (
        <button onClick={openCamera} className="btn">
          Open Camera
        </button>
      )}
      <WebcamCapture
        showCamera={showCamera}
        setDetectedWeights={setDetectedWeights}
        closeCamera={closeCamera}
      />
      {!showCamera && (
        <div>
          {numericWeights.length > 0 && (
            <p>Detected Weights: {numericWeights.join(", ")}</p>
          )}
          {mostCommonWeight !== "Weight couldn't be detected" && (
            <p>Most Common Weight: {mostCommonWeight}</p>
          )}
        </div>
      )}
      {!showCamera &&
        !isFirstLoad &&
        mostCommonWeight === "Weight couldn't be detected" && (
          <p>Weight Couldn't be detected, Please try again!</p>
        )}
    </div>
  );
};

export default App;
