import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import { extractNumbers } from "@/utils/extractNumbers";

export const WebcamCapture = ({
  showCamera,
  setDetectedWeights,
  closeCamera,
}: {
  showCamera: boolean;
  setDetectedWeights: React.Dispatch<React.SetStateAction<string[]>>;
  closeCamera: () => void;
}) => {
  const webcamRef = useRef<Webcam>(null);
  let intervalId: NodeJS.Timeout | null = null;
  let captureCount = 0;

  const captureScreenshot = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        Tesseract.recognize(imageSrc, "eng", {
          logger: m => console.log(m),
        }).then(({ data: { text } }) => {
          const detectedNumbers = extractNumbers(text);
          setDetectedWeights(prevDetectedWeights => [
            ...prevDetectedWeights,
            detectedNumbers,
          ]);
          captureCount++;
          if (captureCount >= 50) {
            closeCamera();
          }
        });
      }
    }
  };

  useEffect(() => {
    if (showCamera) {
      intervalId = setInterval(captureScreenshot, 100);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [showCamera]);

  return (
    <div>
      {showCamera ? (
        <div>
          <Webcam audio={false} ref={webcamRef} />
          <p>Processing...</p>
        </div>
      ) : null}
    </div>
  );
};
