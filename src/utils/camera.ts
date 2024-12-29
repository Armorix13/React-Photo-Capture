export async function initializeCamera() {
  try {
    console.log('Requesting camera access...');
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false,
    });
    console.log('Camera access granted');
    return { stream, error: null };
  } catch (err) {
    console.error('Camera initialization error:', err);
    let errorMessage = 'Failed to access camera. Please try again.';
    
    if (err instanceof Error) {
      switch (err.name) {
        case 'NotAllowedError':
          errorMessage = 'Camera access denied. Please allow camera access in your browser settings.';
          break;
        case 'NotFoundError':
          errorMessage = 'No camera found on your device.';
          break;
        case 'NotReadableError':
          errorMessage = 'Camera is already in use by another application.';
          break;
      }
    }
    return { stream: null, error: errorMessage };
  }
}

export function capturePhoto(videoElement: HTMLVideoElement): string | null {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      console.error('Failed to get canvas context');
      return null;
    }
    
    ctx.drawImage(videoElement, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.8);
  } catch (err) {
    console.error('Photo capture error:', err);
    return null;
  }
}