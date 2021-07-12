# model-mapper

`@ananay-nag/model-mapper` map a plan json object model( from sql , excel , csv ) in to nested model.

- Easy to use as modules
- Easy to install

# Versions-

`@ananay-nag/model-mapper` has released version `1.0.0`.

### v1.0.0 Feature -

- map key with rename it.
- map values with data validation.
- check types of data.

### v1.0.0 model mapper attributes -

- `key` is used to mapping key .
- `default` values if validation failed.
- `validate` check value type with defined in validation.

It is still able to use version with `@ananay-nag/model-mapper@1.0.0`

```js
// v1.0.0
const { splitObject } = require("@ananay-nag/model-mapper");
```

# Quick Start

- [As Library](#library)

## Library

### Installation

```
npm i --save @ananay-nag/model-mapper
```

### example -

```js
const { types, modelBuilder } = require("@ananay-nag/model-mapper");

let values = {
  name: "xyz",
  gender: "male",
  age: 20,
  SSC: true,
  SSC_name: "abc",
  SSC_marks: 300,
  SSC_result: 2,
  HSC: true,
  HSC_name: "mno",
  HSC_marks: 360,
  HSC_result: 1,
  hobbies: ["a", "b"],
};

let mapModel = {
  name: { key: "name", default: "", validate: types.STRING },
  gender: { key: "gender", default: "", validate: types.STRING },
  age: { key: "age", default: 0, validate: types.NUMBER },
  qualification: {
    SSC: {
      isAttend: { key: "SSC", default: false, validate: types.BOOLEAN },
      name: { key: "SSC_name", default: "", validate: types.STRING },
      marks: { key: "SSC_marks", default: 0, validate: types.NUMBER },
      result: { key: "SSC_result", default: 0, validate: types.NUMBER },
      default: {},
    },
    HSC: {
      isAttend: { key: "HSC", default: false, validate: types.BOOLEAN },
      name: { key: "HSC_name", default: "", validate: types.STRING },
      marks: { key: "HSC_marks", default: 0, validate: types.NUMBER },
      result: { key: "HSC_result", default: 0, validate: types.NUMBER },
      default: {},
    },
    default: {},
  },
  interest: { key: "hobbies", default: [], validate: types.ARRAY },
};

console.log(modelBuilder(values, mapModel));

/*
{
    "name": "xyz",
    "gender": "male",
    "age": 20,
    "qualification": {
        "SSC": {
            "isAttend": true,
            "name": "abc",
            "marks": 300,
            "result": 2
        },
        "HSC": {
            "isAttend": true,
            "name": "mno",
            "marks": 360,
            "result": 1
        }
    },
    "interest": [
        "a",
        "b"
    ]
}
*/
```

## v1.0.0 bench marks -

- `10 records` takes `7.804ms`.
- `100 records` takes `10.210ms`.
- `1000 records` takes `179.349ms`.
- `10000 records` takes `237.599ms`.
- `15000 records` takes `542.888ms`.
