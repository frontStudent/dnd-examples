import React, { useState } from "react";
import DragArea from "@Common/DragArea";
import SortArea from "./SortArea";
export const Container = (props) => {
  return (
    <div style={{ display: "flex" }}>
      <DragArea />
      <SortArea />
    </div>
  );
};
