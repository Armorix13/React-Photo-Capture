import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { Camera as CameraIcon, AlertCircle } from 'lucide-react';
import { PhotoGallery } from './PhotoGallery';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "environment"
};

export function Camera() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [error, setError] = useState<string>('');
  const webcamRef = React.useRef<Webcam>(null);

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setPhotos(prev => [...prev, imageSrc]);
      }
    }
  }, [webcamRef]);

  const handleUserMediaError = (error: string | DOMException) => {
    console.error('Camera error:', error);
    setError(typeof error === 'string' ? error : error.message);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}
          
          {!isCameraOpen ? (
            <button
              onClick={() => setIsCameraOpen(true)}
              className="flex items-center justify-center w-full gap-2 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <CameraIcon size={24} />
              Open Camera
            </button>
          ) : (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  onUserMediaError={handleUserMediaError}
                  className="w-full"
                />
                <button
                  onClick={capture}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-lg hover:bg-gray-100 transition-all active:scale-95"
                >
                  <div className="w-8 h-8 rounded-full border-4 border-blue-500" />
                </button>
              </div>
              <button
                onClick={() => {
                  setIsCameraOpen(false);
                  setError('');
                }}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
              >
                Close Camera
              </button>
            </div>
          )}
        </div>

        <PhotoGallery photos={photos} />
      </div>
    </div>
  );
}