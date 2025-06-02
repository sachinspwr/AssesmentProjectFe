/* eslint-disable @typescript-eslint/no-explicit-any */
import { Middleware } from '@reduxjs/toolkit';
import { syncTestState } from '../../middleware/workflow.middleware';


let syncInterval: NodeJS.Timeout | null = null;
let lastSyncTime = 0;

export const syncStateMiddleware: Middleware = (storeAPI) => (next) => (action:any) => {
  const result = next(action);
  const state = storeAPI.getState();

  const IMMEDIATE_SYNC_ACTIONS = new Set([
    'answers/saveAnswer',
    'navigation/setCurrentSection',
    'navigation/setCurrentQuestion',
  ]);

  if (action.type === 'participant/initializeTestSessionSuccess') {
    const sessionToken = state.participant?.session?.token;
    if (!sessionToken) return result;

    if (syncInterval) {
      clearInterval(syncInterval);
      syncInterval = null;
    }

    const SYNC_INTERVAL = 30000;

    const performSync = () => {
      const now = Date.now();
      if (now - lastSyncTime >= SYNC_INTERVAL) {
        storeAPI.dispatch(syncTestState(sessionToken) as any);
        lastSyncTime = now;
      }
    };

    setTimeout(performSync, 10000);
    syncInterval = setInterval(performSync, SYNC_INTERVAL);
  }

  if (
    action.type === 'participant/submitTestSessionSuccess' ||
    action.type === 'participant/endTestSession'
  ) {
    if (syncInterval) {
      clearInterval(syncInterval);
      syncInterval = null;
    }
  }

  const [domain, type] = action.type.split('/');
  const actionKey = `${domain}/${type}`;

  if (
    IMMEDIATE_SYNC_ACTIONS.has(actionKey) &&
    state.participant?.session?.token
  ) {
    storeAPI.dispatch(syncTestState(state.participant.session.token) as any);
    lastSyncTime = Date.now();
  }

  return result;
};
