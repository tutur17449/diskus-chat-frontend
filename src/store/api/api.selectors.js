export const getLoading = (payload) => (state) => {
  return state.api.loaders.indexOf(payload) !== -1;
};
