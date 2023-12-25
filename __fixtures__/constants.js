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

export const testDiffTextStylishColored = `{
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

export const testDiffTextStylishColored2 = `{
  \x1b[31m- follow: false\x1b[0m
    host: hexlet.io
  \x1b[31m- proxy: 123.234.53.22\x1b[0m
  \x1b[31m- timeout: 50\x1b[0m
  \x1b[32m+ timeout: 20\x1b[0m
  \x1b[32m+ verbose: true\x1b[0m
}`;

export const testDiffTextPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
Property 'list1' was updated. From [complex value] to [complex value]`;

export const testDiffTextPlainColored = `\x1b[32mProperty 'common.follow' was added with value: false\x1b[0m
\x1b[31mProperty 'common.setting2' was removed\x1b[0m
Property 'common.setting3' was updated. From \x1b[31mtrue\x1b[0m to \x1b[32mnull\x1b[0m
\x1b[32mProperty 'common.setting4' was added with value: 'blah blah'\x1b[0m
\x1b[32mProperty 'common.setting5' was added with value: [complex value]\x1b[0m
Property 'common.setting6.doge.wow' was updated. From \x1b[31m''\x1b[0m to \x1b[32m'so much'\x1b[0m
\x1b[32mProperty 'common.setting6.ops' was added with value: 'vops'\x1b[0m
Property 'group1.baz' was updated. From \x1b[31m'bas'\x1b[0m to \x1b[32m'bars'\x1b[0m
Property 'group1.nest' was updated. From \x1b[31m[complex value]\x1b[0m to \x1b[32m'str'\x1b[0m
\x1b[31mProperty 'group2' was removed\x1b[0m
\x1b[32mProperty 'group3' was added with value: [complex value]\x1b[0m
Property 'list1' was updated. From \x1b[31m[complex value]\x1b[0m to \x1b[32m[complex value]\x1b[0m`;

export const testDiffTextJSON = '[{"key":"","value":[{"key":"common","value":[{"key":"follow","value":false,"type":"added"},{"key":"setting1","value":"Value 1","type":"unchanged"},{"key":"setting2","value":200,"type":"removed"},{"key":"setting3","value":[true,null],"type":"updated"},{"key":"setting4","value":"blah blah","type":"added"},{"key":"setting5","value":[{"key":"key5","value":"value5","type":"nested"}],"type":"added"},{"key":"setting6","value":[{"key":"doge","value":[{"key":"wow","value":["","so much"],"type":"updated"}],"type":"changed-object"},{"key":"key","value":"value","type":"unchanged"},{"key":"ops","value":"vops","type":"added"}],"type":"changed-object"}],"type":"changed-object"},{"key":"group1","value":[{"key":"baz","value":["bas","bars"],"type":"updated"},{"key":"foo","value":"bar","type":"unchanged"},{"key":"nest","value":[[{"key":"key","value":"value","type":"nested"}],"str"],"type":"updated"}],"type":"changed-object"},{"key":"group2","value":[{"key":"abc","value":12345,"type":"nested"},{"key":"deep","value":[{"key":"id","value":45,"type":"nested"}],"type":"nested"}],"type":"removed"},{"key":"group3","value":[{"key":"deep","value":[{"key":"id","value":[{"key":"number","value":45,"type":"nested"}],"type":"nested"}],"type":"nested"},{"key":"fee","value":100500,"type":"nested"}],"type":"added"},{"key":"list1","value":[{"array":[{"key":"","value":1,"type":"array-item"},{"key":"","value":"2","type":"array-item"},{"key":"","value":false,"type":"array-item"}]},{"array":[{"key":"","value":1,"type":"array-item"},{"key":"","value":"2","type":"array-item"},{"key":"","value":true,"type":"array-item"}]}],"type":"updated"},{"key":"list2","value":{"array":[{"key":"","value":"first","type":"array-item"},{"key":"","value":"second","type":"array-item"}]},"type":"unchanged"}],"type":"root"}]';
