// utils/helpers.js

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US');
  };
  
  const paginate = (array, page = 1, size = 10) => {
    const start = (page - 1) * size;
    return array.slice(start, start + size);
  };
  
  module.exports = {
    formatDate,
    paginate,
  };
  