
const errors = {
  connectionError: () => 'Something went wrong while data load from api!\nCheck your internet connection.',
  apiErrors: (error, searchText) => {
    let message = '';
    if (error === 'Movie not found!') {
      message = `No results were found for '${searchText}'`;
    } else if (error === 'Too many results.') {
      message = `Too many results for '${searchText}'`;
    } else {
      message = error;
    }
    return message;
  },
};

export default errors;
