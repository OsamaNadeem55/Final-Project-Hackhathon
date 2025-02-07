import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Bandage Online Store")
    .items([
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("productList").title("Product List"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["product", "productList"].includes(item.getId()!)
      ),
    ]);
