import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex justify-center mt-96 items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-typo"></div>
    </div>
  );
}

export default LoadingSpinner;