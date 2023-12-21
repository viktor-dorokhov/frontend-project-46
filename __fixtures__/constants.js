import { fileURLToPath } from 'url';
import { dirname, sep } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const dirA = `${__dirname}${sep}..${sep}__fixtures__${sep}`;
export const dirR = `__fixtures__${sep}`;

export const testDiffTextStylish = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
  - list1: [
        1
        2
        false
    ]
  + list1: [
        1
        2
        true
    ]
    list2: [
        first
        second
    ]
}`;

export const testFileContent = `{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  },
  "list1": [1, "2", false],
  "list2": ["first", "second"]
}`;

export const testObject = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
  list1: [
    1,
    '2',
    false,
  ],
  list2: [
    'first',
    'second',
  ],
};

export const testObject2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
  list1: [
    1,
    '2',
    true,
  ],
  list2: [
    'first',
    'second',
  ],
};

export const testDiffTextStylishColor = `{
    common: {
      \x1b[32m+ follow: false\x1b[0m
        setting1: Value 1
      \x1b[31m- setting2: 200\x1b[0m
      \x1b[31m- setting3: true\x1b[0m
      \x1b[32m+ setting3: null\x1b[0m
      \x1b[32m+ setting4: blah blah\x1b[0m
      \x1b[32m+ setting5: {
            key5: value5
        }\x1b[0m
        setting6: {
            doge: {
              \x1b[31m- wow: \x1b[0m
              \x1b[32m+ wow: so much\x1b[0m
            }
            key: value
          \x1b[32m+ ops: vops\x1b[0m
        }
    }
    group1: {
      \x1b[31m- baz: bas\x1b[0m
      \x1b[32m+ baz: bars\x1b[0m
        foo: bar
      \x1b[31m- nest: {
            key: value
        }\x1b[0m
      \x1b[32m+ nest: str\x1b[0m
    }
  \x1b[31m- group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }\x1b[0m
  \x1b[32m+ group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }\x1b[0m
  \x1b[31m- list1: [
        1
        2
        false
    ]\x1b[0m
  \x1b[32m+ list1: [
        1
        2
        true
    ]\x1b[0m
    list2: [
        first
        second
    ]
}`;
