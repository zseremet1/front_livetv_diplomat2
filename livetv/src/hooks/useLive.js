import { useState, useEffect } from 'react';

let globalLiveState = {};
let listenersLive = [];
let actionsLive = {};

export const useLive = (shouldListen = true) => {
  const setState = useState(globalLiveState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actionsLive[actionIdentifier](globalLiveState, payload);
    globalLiveState = { ...globalLiveState, ...newState };

    for (const listener of listenersLive) {
      listener(globalLiveState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listenersLive.push(setState);
    }

    return () => {
      if (shouldListen) {
        listenersLive = listenersLive.filter(li => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalLiveState, dispatch];
};

export const initStore = (userActionsLive, initialState) => {
  if (initialState) {
    globalLiveState = { ...globalLiveState, ...initialState };
  }
  actionsLive = { ...actionsLive, ...userActionsLive };
};
