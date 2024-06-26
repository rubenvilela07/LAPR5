import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface DimensionsProps {
    length: number;
    width: number;
}

export class Dimension extends ValueObject<DimensionsProps> {
    get length (): number {
        return this.props.length;
    }

    get width (): number {
        return this.props.width;
    }
    private constructor (props: DimensionsProps) {
        super(props);
    }

    public static create (length: number, width: number): Result<Dimension> {
        const lengthIsPositive = length > 0;
        const widthIsPositive = width > 0;
        if (!lengthIsPositive || !widthIsPositive) {
            return Result.fail<Dimension>("Length and width must be positive numbers");
        } else
        return Result.ok<Dimension>(new Dimension({length: length, width: width}));
    }
}