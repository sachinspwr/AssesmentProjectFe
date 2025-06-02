import { UserResponseDTO } from "./user-response.dto";

export class SubscriptionAccountUserResponseDTO {
    public createdById?: string;
    public updatedById?: string;
    public isPublic!: boolean;
    public user?: UserResponseDTO;
    public tenant?: string;
}