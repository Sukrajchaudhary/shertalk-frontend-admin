"use client";
import React from "react";
const SkeletonLoader = ({ rows = 5, columns = 5 }) => {
  const renderSkeletonCells = () => {
    const cells = [];
    for (let i = 0; i < columns; i++) {
      cells.push(
        <div
          key={i}
          className="h-6 bg-gray-200 animate-pulse rounded w-full my-2"
        />
      );
    }
    return cells;
  };

  const renderSkeletonRows = () => {
    const rowsList = [];
    for (let i = 0; i < rows; i++) {
      rowsList.push(
        <div key={i} className="flex space-x-4 py-2">
          {renderSkeletonCells()}
        </div>
      );
    }
    return rowsList;
  };

  return (
    <div className="w-full">
      <div className="flex space-x-4 py-2 font-bold">
        {renderSkeletonCells()}
      </div>
      {renderSkeletonRows()}
    </div>
  );
};

export default SkeletonLoader;
