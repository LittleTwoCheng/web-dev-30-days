import React, { memo } from "react";

import {
  Container,
  Checkbox,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import Codepen from "react-codepen-embed";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { RichText } from "../../components";

const TodoListItem = memo(
  ({
    item,
    divider = false,
    onCheckBoxToggle,
    checked = false,
    onExpand,
    expanded = false
  }) => {
    return (
      <ExpansionPanel
        expanded={expanded}
        onChange={() => onExpand(item, !expanded)}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${item.key}-content`}
          id={`${item.key}-header`}
        >
          <Typography>
            <Checkbox
              onClick={e => {
                onCheckBoxToggle(item, !checked);
                e.preventDefault();
                e.stopPropagation();
              }}
              checked={checked}
              disableRipple
            />
            {item.subject}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Container maxWidth="lg">
            <RichText>{item.content}</RichText>
            {item.codepens && item.codepens.length
              ? item.codepens.map((codepen, idx) => (
                  <Codepen
                    key={`${codepen.hash}-${codepen.user}-${idx}`}
                    hash={codepen.hash}
                    defaultTab={codepen.defaultTab}
                  />
                ))
              : null}
          </Container>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
);

export default TodoListItem;
