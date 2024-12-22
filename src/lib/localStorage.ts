export const saveToLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Could not save to localStorage", error);
  }
};

export const loadFromLocalStorage = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return undefined; // No data in localStorage
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Could not load from localStorage", error);
    return undefined;
  }
};
