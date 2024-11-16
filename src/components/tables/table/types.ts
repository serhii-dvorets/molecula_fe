import { Row, ColumnDef, SortingState, Updater } from '@tanstack/react-table';
import { ReactNode } from 'react';

export type { Row, ColumnDef };

export interface ReactTableProps<T extends object> {
  data: T[];
  columns: any[];
  sorting?: SortingState;
  onSortChange?: (updater: Updater<SortingState>) => void;
  emptyMessage?: ReactNode;
  onClickRow?: (...args: any[]) => void;
  dataLoading?: boolean;
}

export interface TableWithGroupingProps<T extends object> extends ReactTableProps<T> {
  groupByColumn?: string;
  renderGroupedRow?: (row: Row<T>) => JSX.Element;
  groupVariant?: 'row' | 'column';
  styleVariant?: 'devices' | 'zebra';
  bordered?: boolean;
}

export type TableActionItem = {
  label: string;
  onClick?: () => void;
};
