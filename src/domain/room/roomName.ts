import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface RoomNameProps {
    name: string;
}

export class RoomName extends ValueObject<RoomNameProps> {
    get name (): string {
        return this.props.name;
    }

    private constructor (props: RoomNameProps) {
        super(props);
    }

    public static create (name: string): Result<RoomName> {
        const nameIsNotEmpty = Guard.againstNullOrUndefined(name, 'name');
        if (!nameIsNotEmpty.succeeded) {
            return Result.fail<RoomName>(nameIsNotEmpty.message);
        }

        if (name.length < 1 || name.length > 5) {
            return Result.fail<RoomName>('Name length must be between 1 and 5 characters.');
        }

        return Result.ok<RoomName>(new RoomName({ name: name }));
    }
}