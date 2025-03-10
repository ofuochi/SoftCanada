import React, { useState } from "react";
import { Table } from "antd";
import type { TablePaginationConfig, TableProps } from "antd/es/table";

interface Props<T> extends TableProps<T> {
  loading: boolean;
  pagination: { current: number; pageSize: number; total: number };
  onPageChange: (pagination: TablePaginationConfig) => void;
  onRowSelect?: (selectedRow: T | null) => void; // Single row selection
}

export const TableComponent = <T extends object>({
  dataSource,
  columns,
  loading,
  pagination,
  onPageChange,
  onRowSelect,
  ...restProps
}: Props<T>) => {
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const handleRowClick = (row: T) => {
    const newSelection = selectedRow === row ? null : row;
    setSelectedRow(newSelection);
    onRowSelect?.(newSelection);
  };

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        pagination={{ ...pagination, showSizeChanger: true }}
        onChange={onPageChange}
        rowClassName={(record) => (selectedRow === record ? "bg-gray-100" : "")}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        {...restProps}
      />
    </>
  );
};

