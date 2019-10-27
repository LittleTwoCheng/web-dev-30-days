import marked from "marked";
const matcher = /.+@.+\..+/;

const isEmail = str => {
  return matcher.test(str);
};

const pattern = {
  url: /(?:www\.)?([-a-zA-Z0-9:%._+~#=]{2,256}\.[a-z]{2,6}\b)([\d\w.-]*)*(?:\?(.+))?/gi
};

const defaultRenderer = new marked.Renderer();

//define our custom paragraph style & format
defaultRenderer.paragraph = function(text) {
  return "<p>" + text.split(/\n/).join("<br/>") + "</p>";
};

defaultRenderer.text = function(text) {
  if (!isEmail(text) && pattern.url.exec(text)) {
    return text.replace(pattern.url, s => {
      return `<a href="http://${s}" target="_blank">${s}</a>`;
    });
  }

  return text;
};

defaultRenderer.link = function(href, title, text) {
  return (
    '<a target="_blank" href="' +
    href +
    '" title="' +
    title +
    '">' +
    text +
    "</a>"
  );
};

defaultRenderer.blockquote = function(quote) {
  return '<blockquote class="quote">\n' + quote + "</blockquote>\n";
};

const merge = (...args) => {
  const obj = args[0];
  let i;
  for (i = 1; i < args.length; i++) {
    const target = args[i];
    let key;
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
};

const noop = () => {};
noop.exec = noop;

const markedPatched = (text, options) => {
  let mutatedOptions = { ...options };
  if (!mutatedOptions["renderer"]) {
    //if not specified, always use our default renderer.
    mutatedOptions["renderer"] = defaultRenderer;
  }

  let disableRules = mutatedOptions["disableRules"];
  delete mutatedOptions["disableRules"];

  if (mutatedOptions) {
    mutatedOptions = merge({}, marked.defaults, mutatedOptions);
  }

  let lexer = new marked.Lexer(mutatedOptions);

  if (disableRules && disableRules.length) {
    //attempt to disable rule
    disableRules.forEach(disableRule => {
      lexer.rules[disableRule] = noop;
    });
  }

  return marked.parser(lexer.lex(text), mutatedOptions);
};
export default markedPatched;
