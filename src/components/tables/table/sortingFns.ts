import { SortingFns } from '@tanstack/table-core';
import { SortingFn } from '@tanstack/react-table';

declare module '@tanstack/table-core' {
  interface SortingFns {
    caseInsensitive: SortingFn<unknown>;
  }
}

const sortingFns: SortingFns = {
	caseInsensitive: (rowA: any, rowB: any, columnId: any): number => {
		return String(rowA.getValue(columnId)).toLowerCase() > String(rowB.getValue(columnId)).toLowerCase() ? 1 : -1;
	}
};

export default sortingFns;
