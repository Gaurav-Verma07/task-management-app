import React from "react";
// import { X } from "react-feather";
import { ILabel } from "../../Interfaces/Kanban";
import { IconX } from "@tabler/icons-react";
interface ChipProps {
  item: ILabel;
  removeLabel?: (label: ILabel) => void;
}
export default function Chip(props: ChipProps) {
  const { item, removeLabel } = props;
  return (
    <label style={{ backgroundColor: item.color, color: "#fff" }}>
      {item.text}
      {removeLabel && <IconX onClick={() => removeLabel(item)} />}
    </label>
  );
}
