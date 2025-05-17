import { CategoryOf } from "@utils/enums";

export class CategoryRequestDTO {
  name!: string;

  description?: string;

  categoryOf!: CategoryOf;
}
