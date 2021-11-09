import * as React from 'react';

export default function useMountedState<S>(
  initialState: S | (() => S),
): [S, React.Dispatch<React.SetStateAction<S>>] {
  const [state, setState] = React.useState(initialState);
  const ref = React.useRef(false);

  const updateState = React.useCallback((value: React.SetStateAction<S>) => {
    ref.current && setState(value);
  }, []);

  React.useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);

  return [state, updateState];
}
