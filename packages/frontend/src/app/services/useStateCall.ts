import { useState, useEffect } from "react";

function useStateCall() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [state, setState] = useState("");

  useEffect(() => {
    if (state === "loading") {
      setLoading(true);
      setError(false);
      setSuccess(false);
    } else if (state === "success") {
      setLoading(false);
      setError(false);
      setSuccess(true);
    } else if (state === "error") {
      setLoading(false);
      setError(true);
      setSuccess(false);
    }

    return () => {
      setLoading(false);
      setError(false);
      setSuccess(false);
    };
  }, [state]);

  const reset = () => {
    setLoading(false);
    setError(false);
    setSuccess(false);
  };

  return { setState, loading, success, error, reset };
}

export default useStateCall;
