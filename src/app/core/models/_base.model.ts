import { Constants } from "@core/constants/constants";

export abstract class Base {
  constructor(
    public id: string = Constants.DEFAULT_UUID,
    public createdAt: Date | null = null,
    public updatedAt: Date | null = null,
  ) {}
}
