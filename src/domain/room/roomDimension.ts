import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface RoomDimensionsProps {
    length: number;
    width: number;
}

export class RoomDimension extends ValueObject<RoomDimensionsProps> {
    get length (): number {
        return this.props.length;
    }

    get width (): number {
        return this.props.width;
    }


    private constructor (props: RoomDimensionsProps) {
        super(props);
    }

    public static create (length: number, width: number): Result<RoomDimension> {
        const lengthIsPositive = length > 0;
        const widthIsPositive = width > 0;
        if (!lengthIsPositive || !widthIsPositive) {
            return Result.fail<RoomDimension>("Length and width must be positive numbers");
        } else
            return Result.ok<RoomDimension>(new RoomDimension({ length: length, width: width }));
    }
}