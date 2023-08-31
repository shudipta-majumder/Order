import MainMenuItems from "@/utility/MainMenuItems";
import { TreeItem, TreeView } from "@mui/lab";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const MainNavXs = () => {
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState([]);
  const router = useRouter();

  const hdlSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };
  const hdlToggle = (nodeId, parent) => {
    if (expanded.includes(nodeId)) {
      let toggleNodeIdIndex = expanded.indexOf(nodeId);
      let toggleNodeIds =
        toggleNodeIdIndex != -1 ? expanded.slice(0, toggleNodeIdIndex) : [];
      setExpanded(toggleNodeIds);
    } else {
      if (!expanded.includes(parent)) {
        setExpanded([nodeId]);
      } else {
        setExpanded((prevNodeIds) => {
          let indexOfParentId = prevNodeIds.indexOf(parent);
          prevNodeIds.splice(indexOfParentId + 1, prevNodeIds.length - 1);
          return [...prevNodeIds, nodeId];
        });
      }
    }
  };

  const showChildMenu = (children, parentKey) => {
    return children.map((cItem) => {
      if (cItem.children) {
        return (
          <TreeItem
            nodeId={cItem.key}
            label={cItem.label}
            key={cItem.label}
            onClick={() => {
              hdlToggle(cItem.key, parentKey);
            }}
          >
            {showChildMenu(cItem.children, cItem.key)}
          </TreeItem>
        );
      }
      return (
        <TreeItem
          key={cItem.key}
          nodeId={cItem.key}
          label={cItem.label}
          onClick={() => {
            hdlToggle(cItem?.key, parentKey);
            router.push(cItem.url);
          }}
        />
      );
    });
  };

  return (
    <TreeView
      aria-label="controlled"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
      // onNodeToggle={hdlToggle}
      onNodeSelect={hdlSelect}
      sx={{
        padding: "5px 0px",
        ul: {
          marginLeft: "0px !important",
          ".MuiTreeItem-content": { pl: 2 },
        },
        a: { cursor: "pointer", display: "block" },
        ".MuiTreeItem-content": {
          padding: "5px 10px",
        },
        ".MuiTreeItem-label": { pl: 0.4 },
        ".MuiTreeItem-iconContainer": { mr: "0 !important" },
        ".Mui-selected .MuiTreeItem-label": { fontWeight: 500 },
      }}
    >
      {MainMenuItems.map((item) => {
        if (item.children) {
          return (
            <TreeItem
              key={item.key}
              nodeId={item.key}
              label={item.label}
              onClick={() => {
                hdlToggle(item?.key, "0");
              }}
            >
              {showChildMenu(item.children, item.key)}
            </TreeItem>
          );
        }
        return (
          <TreeItem
            key={item.key}
            nodeId={item.key}
            label={item.label}
            onClick={() => {
              hdlToggle(item?.key, "0");
              router.push(item.url);
            }}
          />
        );
      })}
    </TreeView>
  );
};

export default MainNavXs;
