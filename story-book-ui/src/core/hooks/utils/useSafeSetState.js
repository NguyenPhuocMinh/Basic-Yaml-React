import {
  useState,
  useRef,
  useEffect,
  useCallback
} from 'react';

const useSafeSetState = (initialState) => {
  const [state, setState] = useState(initialState);

  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  const safeSetState = useCallback(
    args => {
      if (mountedRef.current) {
        return setState(args);
      }
    },
    [mountedRef, setState]
  );

  return [state, safeSetState];
};

export default useSafeSetState;