# Вычислитель отличий

«Вычислитель отличий» — программа, определяющая разницу между двумя структурами данных.

[![Actions Status](https://github.com/viktor-dorokhov/frontend-project-46/actions/workflows/code-check.yml/badge.svg)](https://github.com/viktor-dorokhov/frontend-project-46/actions)
[![Actions Status](https://github.com/viktor-dorokhov/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/viktor-dorokhov/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/d2dee2ce319ef6b6c93d/maintainability)](https://codeclimate.com/github/viktor-dorokhov/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d2dee2ce319ef6b6c93d/test_coverage)](https://codeclimate.com/github/viktor-dorokhov/frontend-project-46/test_coverage)


## Установка

Для установки выполните следующие команды:
```
git clone git@github.com:viktor-dorokhov/frontend-project-46.git gendiff
cd gendiff
make install
npm link
```

### Использование
```
gendiff [опции] аргументы
```

### Аргументы:
```
<filepath1> <filepath2> - относительные или абсолютные пути для двух файлов
                          поддерживаемые форматы: JSON (.json) и YAML (.yml, .yaml)
```

### Опции:
```
-V, --version        вывод версии программы
-f, --format <type>  формат вывода, возможные значения: "stylish", "plain", "json" (по умолчанию: "stylish")
-c, --color          цветная подсветка для форматов "stylish" и "plain"
-h, --help           вывод справки по программе
```

## Примеры:

### Стандартный вывод в формате "stylish":
```
gendiff file1.json file2.json
```

### Вывод в формате "stylish" с цветной подсветкой
```
gendiff file1.json file2.json -с
```

### Вывод в формате "plain"
```
gendiff file1.json file2.json -f plain
```

### Вывод в формате "plain" с цветной подсветкой
```
gendiff file1.json file2.json -f plain -с
```

### Вывод в формате "json"
```
gendiff file1.json file2.json -f json
```

### Разные форматы файлов
Файлы разных форматов можно сочетать
```
gendiff file1.yml file2.json
gendiff file1.json file2.yml
gendiff file1.yml file2.yml
```

## Демо:

[![asciicast](https://asciinema.org/a/629272.svg)](https://asciinema.org/a/629272)
