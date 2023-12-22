export default (data) => {
  try {
    const result = JSON.parse(data);
    return result;
  } catch (err) {
    return null;
  }
};
