import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import BuildingRepo from "../../repos/buildingRepo";

interface BuildingCodeProps {
  code: string;
}

export class BuildingCode extends ValueObject<BuildingCodeProps> {
    get code (): string {
        return this.props.code;
    }

    private constructor (props: BuildingCodeProps) {
        super(props);        
    }

    public static create (code: string): Result<BuildingCode> {
        const codeIsNotEmpty = Guard.againstNullOrUndefined(code, 'code');
        if (!codeIsNotEmpty.succeeded) {
            return Result.fail<BuildingCode>(codeIsNotEmpty.message);
        } 
        
        if (code.length !== 5) {
            return Result.fail<BuildingCode>('BuildingId must have exactly 5 characters.');
        }
        
        return Result.ok<BuildingCode>(new BuildingCode({ code: code }));
    }
}