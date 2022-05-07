# model-mapper

`@ananay-nag/model-mapper` map a plan json object model( from sql , excel , csv ) in to nested model.

- Easy to use as modules
- Easy to install

# Version-

`@ananay-nag/model-mapper` has released version `1.0.1`.

### v1.0.1 Feature -

- map key with rename it.
- map values with data validation.
- check ModelTypes of data.

### v1.0.1 model mapper attributes -

- `key` is used to mapping key .
- `default` values if validation failed.
- `validate` check value type with defined in validation.

It is still able to use version with `@ananay-nag/model-mapper@1.0.1`

```js
// v1.0.1
const { ModelBuilder, ModelTypes } = require("@ananay-nag/model-mapper");
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
const { ModelBuilder, ModelTypes } = require("@ananay-nag/model-mapper");

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
  name: { key: "name", default: "", validate: ModelTypes.STRING },
  gender: { key: "gender", default: "", validate: ModelTypes.STRING },
  age: { key: "age", default: 0, validate: ModelTypes.NUMBER },
  qualification: {
    SSC: {
      isAttend: { key: "SSC", default: false, validate: ModelTypes.BOOLEAN },
      name: { key: "SSC_name", default: "", validate: ModelTypes.STRING },
      marks: { key: "SSC_marks", default: 0, validate: ModelTypes.NUMBER },
      result: { key: "SSC_result", default: 0, validate: ModelTypes.NUMBER },
      default: {},
    },
    HSC: {
      isAttend: { key: "HSC", default: false, validate: ModelTypes.BOOLEAN },
      name: { key: "HSC_name", default: "", validate: ModelTypes.STRING },
      marks: { key: "HSC_marks", default: 0, validate: ModelTypes.NUMBER },
      result: { key: "HSC_result", default: 0, validate: ModelTypes.NUMBER },
      default: {},
    },
    default: {},
  },
  interest: { key: "hobbies", default: [], validate: ModelTypes.ARRAY },
};

console.log(ModelBuilder(values, mapModel));

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

## v1.0.1 bench marks -
- `1 records` takes `0.538ms`.
- `10 records` takes `1.203ms`.
- `100 records` takes `2.473ms`.
- `1000 records` takes `22.456ms`.
- `10000 records` takes `107.915ms`.
- `100000 records` takes `759.358ms`.
