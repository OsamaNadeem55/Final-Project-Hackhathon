import { type SchemaTypeDefinition } from "sanity";
import { blockContentType } from "./blockContentType";
import { productTypes } from "./productType";
import { productListType } from "./productListType";
import { productApi } from "./products";
import order from "./order";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, productTypes, productListType, productApi,order],
};
