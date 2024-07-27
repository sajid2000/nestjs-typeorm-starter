import { ObjectLiteral } from "typeorm";

import { CursorPaginationDto } from "../dtos/cursor-pagination.dto";
import { OffsetPaginationDto } from "../dtos/offset-pagination.dto";

export type CursorPaginationOptions<T extends ObjectLiteral> = CursorPaginationDto & {
  searchField: keyof T;
  cursorField: keyof T;
  cursorType: "string" | "number" | "date";
};

export type OffsetPaginationOptions<T extends ObjectLiteral> = OffsetPaginationDto & {
  searchField: keyof T;
};
