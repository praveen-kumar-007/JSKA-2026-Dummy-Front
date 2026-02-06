const LOGIN_ALERTS_READ_KEY = 'loginAlertsReadState';

const safeParse = (value: string): Record<string, string> => {
  try {
    const parsed = JSON.parse(value);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return Object.fromEntries(Object.entries(parsed).map(([key, val]) => [String(key), String(val)]));
    }
  } catch {
    // fallthrough
  }
  return {};
};

const persistReadState = (state: Record<string, string>) => {
  localStorage.setItem(LOGIN_ALERTS_READ_KEY, JSON.stringify(state));
};

export const getLoginAlertReadState = (): Record<string, string> => {
  const stored = localStorage.getItem(LOGIN_ALERTS_READ_KEY);
  if (!stored) return {};
  return safeParse(stored);
};

export const markLoginAlertRead = (userKey: string, timestamp?: string) => {
  if (!userKey) return;
  const state = getLoginAlertReadState();
  const currentTimestamp = timestamp || new Date().toISOString();
  if (state[userKey] && new Date(state[userKey]).getTime() >= new Date(currentTimestamp).getTime()) {
    return;
  }
  persistReadState({
    ...state,
    [userKey]: currentTimestamp,
  });
};

export const resetLoginAlertReadState = () => {
  localStorage.removeItem(LOGIN_ALERTS_READ_KEY);
};
