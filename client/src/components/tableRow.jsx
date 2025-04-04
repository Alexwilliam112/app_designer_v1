"use client";
import React from "react";

const TableRow = ({ data, onClick }) => {
  return (
    <tr onClick={onClick}>
      {data.map((cell, index) => (
        <td key={index}>{cell}</td>
      ))}
    </tr>
  );
};

export default TableRow;


