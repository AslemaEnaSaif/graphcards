import { Handle, Position } from "@xyflow/react";
import styles from "./CardNode.module.scss";
import { CardFields } from "../Types/types";

export function CardNode({ data }: { data: CardFields }) {
  const handleStyle = {
    background: "white",
    border: "1px solid black",
    width: "7px",
    height: "7px",
  };
  return (
    <>
      <Handle
        id={"1"}
        type="source"
        position={Position.Top}
        style={handleStyle}
      />
      <Handle
        id={"3"}
        type="source"
        position={Position.Left}
        style={handleStyle}
      />
      <Handle
        id={"4"}
        type="source"
        position={Position.Right}
        style={handleStyle}
      />
      <Handle
        id={"2"}
        type="source"
        position={Position.Bottom}
        style={handleStyle}
      />
      <div className={`${styles.cardNode}`}>
        <h3 className={`${styles.front}`}>{data.front}</h3>
        <p className={`${styles.back}`}>{data.back}</p>
      </div>
    </>
  );
}
