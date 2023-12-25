import parseJSON from './json.js';
import parseYAML from './yaml.js';

const parseFns = {
  json: parseJSON,
  yaml: parseYAML,
};

export default (data, type) => parseFns[type](data);
