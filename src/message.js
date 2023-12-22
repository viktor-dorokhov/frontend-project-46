const messages = {
  propAdd: 'Property %1 was added with value: %2',
  propRemove: 'Property %1 was removed',
  propUpdate: 'Property %1 was updated. From %2 to %3',
};

export default (code, ...values) => (
  values.reduce((acc, str, index) => acc.replace(`%${index + 1}`, str), messages[code])
);
