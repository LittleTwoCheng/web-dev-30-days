import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import marked from "./marked";

import "./style.css";

class Markdown extends PureComponent {
  rawMarkdown(text) {
    if (!text) {
      return {
        __html: ""
      };
    }

    const { sanitize, breaks } = this.props;
    return {
      __html: marked(text, {
        sanitize: sanitize,
        breaks: breaks,
        //disable 'Headers' gramma for underline-ish style '======' or '------'
        disableRules: ["lheading", "code"]
      })
    };
  }
  render() {
    const { children, forwardedRef } = this.props;
    return (
      <div
        ref={forwardedRef}
        className="Markdown"
        dangerouslySetInnerHTML={this.rawMarkdown(children)}
      />
    );
  }
}

Markdown.defaultProps = {
  sanitize: true,
  breaks: false,
  children: ""
};

Markdown.propTypes = {
  children: PropTypes.string,
  sanitize: PropTypes.bool,
  breaks: PropTypes.bool
};

const RefForwarded = React.forwardRef((props, ref) => (
  <Markdown {...props} forwardedRef={ref} />
));

export default RefForwarded;
