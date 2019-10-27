const PREFIX = "__";

function get(name, defaultValue = null) {
  if (!process.browser) return defaultValue;

  if (typeof window.localStorage !== "object") {
    console.log("localStorage is not supported, all cache will be by passed.");
    return defaultValue;
  }
  const cache = window.localStorage.getItem(getName(name));
  return cache === null || typeof cache === "undefined"
    ? defaultValue
    : JSON.parse(cache);
}

function set(name, value) {
  if (!process.browser) return value;

  if (typeof window.localStorage !== "object") {
    console.log("localStorage is not supported, all cache will be by passed.");
    return value;
  }
  window.localStorage.setItem(getName(name), JSON.stringify(value));

  return value;
}

function remove(name) {
  if (!process.browser) return;

  if (typeof window.localStorage !== "object") {
    console.log("localStorage is not supported, all cache will be by passed.");
    return;
  }
  window.localStorage.removeItem(getName(name));
}

function getName(name) {
  return `${PREFIX}${name}`;
}

function cache(name) {
  return {
    load: defaultValue => get(name, defaultValue),
    save: value => set(name, value),
    clear: () => remove(name)
  };
}

export { get, set, remove };

export default cache;
