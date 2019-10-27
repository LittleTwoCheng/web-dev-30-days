import React from "react";
import RichText from "@madebyconnor/rich-text-to-jsx";
import { Typography, Link } from "@material-ui/core";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

// https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer
// https://github.com/connor-baer/rich-text-to-jsx
const OVERRIDES = {
  [BLOCKS.PARAGRAPH]: {
    component: Typography,
    props: {
      component: "p",
      variant: "body2",
      paragraph: true
    }
  },
  [INLINES.HYPERLINK]: {
    component: Link,
    props: {
      target: "_blank"
    }
  }
};

export default function({ children }) {
  return <RichText richText={children} overrides={OVERRIDES} />;
}
