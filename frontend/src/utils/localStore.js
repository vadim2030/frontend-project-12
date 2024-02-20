export const getUserLocalStore = () => JSON.parse(localStorage.getItem('user')) || null;

export const setUserLocalStore = (data) => {
  if (!data) {
    localStorage.removeItem('user');
  } else {
    localStorage.setItem('user', JSON.stringify(data));
  }
};
