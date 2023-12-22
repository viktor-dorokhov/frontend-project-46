const messages = {
  propAdd: 'Property %1 was added with value: %2',
  propRemove: 'Property %1 was removed',
  propUpdate: 'Property %1 was updated. From %2 to %3',
  fileError: 'The file cannot be opened: %1',
  parseError: 'Incorrect %1 content. Please check file: %2',
  fileTypeError: 'Please use the following file types: %1',
  formatTypeError: 'Please use the following format types: %1',
};

export default (code, values) => (
  values.reduce((acc, str, index) => acc.replace(`%${index + 1}`, str), messages[code])
);
