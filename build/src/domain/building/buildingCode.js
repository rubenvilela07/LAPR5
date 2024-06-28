"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingCode = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
const Guard_1 = require("../../core/logic/Guard");
class BuildingCode extends ValueObject_1.ValueObject {
    get code() {
        return this.props.code;
    }
    constructor(props) {
        super(props);
    }
    static create(code) {
        const codeIsNotEmpty = Guard_1.Guard.againstNullOrUndefined(code, 'code');
        if (!codeIsNotEmpty.succeeded) {
            return Result_1.Result.fail(codeIsNotEmpty.message);
        }
        if (code.length !== 5) {
            return Result_1.Result.fail('BuildingId must have exactly 5 characters.');
        }
        return Result_1.Result.ok(new BuildingCode({ code: code }));
    }
}
exports.BuildingCode = BuildingCode;
//# sourceMappingURL=buildingCode.js.map