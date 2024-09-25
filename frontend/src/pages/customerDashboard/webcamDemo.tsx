import { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { CameraOptions, useFaceDetection } from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import IconButton from '../../components/iconButton/IconButton';
import { hairstyles } from '../../utils/constants';

const width = 350;
const height = 350;

interface BoundingBox {
  xCenter: number;
  yCenter: number;
  width: number;
  height: number;
}

interface Suggestions {
  status: boolean;
  services: string[];
}

const WebcamDemo = (): JSX.Element => {
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const [processing, setProcessing] = useState<boolean>(false);
  const [gotSuggestions, setGotSuggestions] = useState<Suggestions>({
    status: false,
    services: [],
  });

  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      if (videoDevices.length > 0) {
        setDeviceId(videoDevices[1]?.deviceId);
      }
    });
  }, []);

  const { boundingBox, detected } = useFaceDetection({
    faceDetectionOptions: {
      model: 'short',
    },
    faceDetection: new FaceDetection.FaceDetection({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
    camera: ({ mediaSrc, onFrame }: CameraOptions) =>
      new Camera(mediaSrc, {
        onFrame,
        width,
        height,
      }),
  });

  const captureAndSendImage = async () => {
    if (webcamRef.current && boundingBox.length > 0) {
      setProcessing(true);

      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const img = new Image();
        img.src = imageSrc;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) return;

          const box = boundingBox[0]; // Assuming the first bounding box is the one you want to crop

          const sourceX = (box.xCenter * img.width) - ((box.width * img.width) / 2) + 80;
          const sourceY = (box.yCenter * img.height) - ((box.height * img.height) / 2) + 60;
          const sourceWidth = 150;
          const sourceHeight = 170;
          canvas.width = sourceWidth;
          canvas.height = sourceHeight;

          ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);

          const croppedBase64 = canvas.toDataURL('image/jpeg');

          fetch('http://localhost:3000/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: croppedBase64 }),
          })
            .then(response => response.json())
            .then(data => {
              setProcessing(false);
              setGotSuggestions({
                status: true,
                services: data,
              });
            })
            .catch(error => {
              console.error('Error:', error);
              setProcessing(false);
            });
        };
      }
    }
  };

  return (
    <div>
      {gotSuggestions.status ? (
        <>
          <h1 className='font-semibold'>Here are some suggestions for you!</h1>
          <div className="flex flex-row flex-wrap justify-between">
            {gotSuggestions.services.map((service: string, index: number) => (
              <div key={index} className="flex flex-col bg-[#ffffffcd] p-4 rounded-xl shadow-lg mt-2 mb-2" title={hairstyles.find((s) => s.name === service)?.description}>
                <div className="h-32 w-32 bg-cover bg-center rounded-md" style={{ backgroundImage: `url(${hairstyles.find((s) => s.name === service)?.img || ""})` }}></div>
                <span className="font-bold mt-1">{service}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div style={{ width, height, position: 'relative' }}>
            {boundingBox.map((box: BoundingBox, index: number) => (
              <div
                key={index}
                style={{
                  border: '4px solid red',
                  position: 'absolute',
                  top: `${box.yCenter * 100}%`,
                  left: `${box.xCenter * 100}%`,
                  width: `${box.width * 100}%`,
                  height: `${box.height * 100}%`,
                  zIndex: 1,
                }}
              />
            ))}
            <Webcam
              ref={webcamRef}
              videoConstraints={{ deviceId }}
              forceScreenshotSourceSize
              screenshotFormat="image/jpeg"
              style={{
                borderRadius: '0.5rem',
                height,
                width,
                position: 'absolute',
              }}
            />
          </div>
          <IconButton
            disabled={!detected || processing}
            className="w-full z-100 disabled:opacity-50"
            direction="right"
            icon={""}
            text={processing ? 'Processing...' : 'Capture and get haircut suggestion'}
            callback={captureAndSendImage}
          />
        </>
      )}
    </div>
  );
};

export default WebcamDemo;
