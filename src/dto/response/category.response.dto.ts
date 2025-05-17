import { CategoryOf } from "@utils/enums";

export class CategoryResponseDTO {
  id!: string;

  name!: string;

  description?: string;

  categoryOf!: CategoryOf;
}
