import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";

export class RoomId {
    // Conjunto para rastrear buildingIds existentes
    private static existingIds: Set<string> = new Set();

    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    get id(): string {
        return this.value;
    }

    public static create(buildingId: string): Result<RoomId> {

        // Verifica se o roomId tem exatamente 5 caracteres
        if (buildingId.length !== 5) {
            return Result.fail<RoomId>('RoomId must have exactly 5 characters.');
        }

        // Verifica se o buildingId já existe no conjunto existingIds
        if (RoomId.existingIds.has(buildingId)) {
            return Result.fail<RoomId>('RoomId must be unique.');
        }

        RoomId.existingIds.add(buildingId);

        return Result.ok<RoomId>(new RoomId(buildingId));
    }
}
