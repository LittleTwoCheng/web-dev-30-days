import { fetch } from "./contentful";

function getCodepens(data, codepens) {
  if (!codepens) return [];
  return codepens.map(codepen => {
    console.log("codepen", codepen);
    const target = data.includes.Entry.find(entry => {
      console.log("Entry", entry);
      return entry.sys.id === codepen.sys.id;
    });
    return target.fields;
  });
}
const fetchItems = async () => {
  return fetch("webDevItem").then(data => {
    console.log("data", data);
    return data.items.map(item => {
      return {
        ...item.fields,
        codepens: getCodepens(data, item.fields.codepens)
      };
    });
  });
};
export default fetchItems;
