# @bonitasoft/bonita-ui-designer-context-binding

![github release](https://img.shields.io/github/v/release/bonitasoft/bonita-ui-designer-context-binding)
![npm](https://img.shields.io/npm/v/@bonitasoft/ui-designer-context-binding)

This project contains module to manage binding and communication between https://github.com/bonitasoft/bonita-ui-designer[bonita-ui-designer] variable and bonita widget properties.

A widget property can be bound with one ui-designer variable by one of this binding type:

| Binding type   | getValue  | setValue  | comments |
|---|---|---|---|
| constant | yes | no ||
| interpolation| yes| no | Need to interpolate angular pipe for exemple `| date, | `
| expression | yes | no |
| variable | yes | yes | similar to two way data-binding

## Usage

Run `npm install @bonitasoft/ui-designer-context-binding`

    import { Model, Variables } from '@bonitasoft/ui-designer-context-binding';

    // Create a model
    let model = new Model();

    // Fill variable accessor
    model.fillVariableAccessors(yourUidVariableAsMap);

    // Get variable accessor
    model.getVariableAccessors();


## Development

Each development must be tested. To run test suite, you can use `npm run test`.