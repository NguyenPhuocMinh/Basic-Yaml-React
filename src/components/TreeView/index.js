import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({
  root: {
    height: 'auto',
    flexGrow: 1,
    minWidth: 250,
    background: '#FFF',
    margin: 8,
    minHeight: '100vh'
  },
});

const ControlledTreeView = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      <TreeItem nodeId="1" label="Category 1">
        <TreeItem nodeId="2" label="Subcategory1">
          <TreeItem nodeId="3" label="Sub-Subcategory1" />
        </TreeItem>
        <TreeItem nodeId="4" label="Subcategory2">
          <TreeItem nodeId="5" label="Sub-Subcategory1" />
        </TreeItem>
      </TreeItem>
      <TreeItem nodeId="6" label="Category 2">
        <TreeItem nodeId="7" label="Subcategory1">
          <TreeItem nodeId="8" label="Sub-Subcategory1" />
        </TreeItem>
        <TreeItem nodeId="9" label="Subcategory2">
          <TreeItem nodeId="10" label="Sub-Subcategory1" />
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
}

export default ControlledTreeView;