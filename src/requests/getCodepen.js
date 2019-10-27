import { get } from "./contentful";

const getCodepen = async () => {
  return get("codepen");
};
export default getCodepen;
