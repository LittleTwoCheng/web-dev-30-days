const contentful = require("contentful");
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
});

function get(id) {
  return client.getEntry(id).then(data => {
    console.log("get", data);
    return data;
  });
}

function fetch(name) {
  return client
    .getEntries({
      content_type: name,
      order: "fields.sort"
    })
    .then(data => {
      return data;
    });
}

export { get, fetch };
