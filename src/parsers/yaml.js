import yaml from 'js-yaml';

export default (data) => {
  try {
    const result = yaml.load(data);
    return result;
  } catch (err) {
    return null;
  }
};
