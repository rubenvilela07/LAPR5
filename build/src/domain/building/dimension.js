"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dimension = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
class Dimension extends ValueObject_1.ValueObject {
    get length() {
        return this.props.length;
    }
    get width() {
        return this.props.width;
    }
    constructor(props) {
        super(props);
    }
    static create(length, width) {
        const lengthIsPositive = length > 0;
        const widthIsPositive = width > 0;
        if (!lengthIsPositive || !widthIsPositive) {
            return Result_1.Result.fail("Length and width must be positive numbers");
        }
        else
            return Result_1.Result.ok(new Dimension({ length: length, width: width }));
    }
}
exports.Dimension = Dimension;
//# sourceMappingURL=dimension.js.map