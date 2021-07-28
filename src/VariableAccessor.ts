export class VariableAccessor {
    private value: string | number | boolean;

    constructor(value: string | number | boolean) {
        this.value = value;
    }

    public getValue(): string | number | boolean {
        return this.value;
    }

    public setValue(value: string | number | boolean): void {
        this.value = value;
    }

}