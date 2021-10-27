export class VariableAccessor {
    private value: string | number | boolean | object;

    constructor(value: string | number | boolean | object) {
        this.value = value;
    }

    public getValue(): string | number | boolean | object {
        return this.value;
    }

    public setValue(value: string | number | boolean | object): void {
        this.value = value;
    }

}