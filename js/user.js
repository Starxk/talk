class FieldValidator {
    constructor(txtId, validatorFunc) {
        this.input = $(`#${txtId}`);
        this.p = this.input.nextElementSibling;
        this.func = validatorFunc;
        this.input.onblur = () => {
            this.validator();
        }
    };
    async validator() {
        const value = this.input.value;
        var err = await this.func(value)
        if (err) {
            this.p.innerText = err;
            return false;
        } else {
            this.p.innerText = '';
            return true;
        }
    }
    static async validata() {
        const newArr = [];
        for (const item of arguments) {
            newArr.push(await item.validator());
        }
        const result = newArr.every(v => v);
        return result;
    }
}