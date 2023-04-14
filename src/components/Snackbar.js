import React, { useState } from 'react';

function Snackbar({ message }) {
  const [showSnackbar, setShowSnackbar] = useState(true);

  function showSnackbarMessage() {
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000);
  }

  return (
    <>
      {showSnackbar && (
        <div className="snackbar">
          <p>{message}</p>
        </div>
      )}
    </>
  );
}

export default Snackbar;
