import { createSelector } from "@reduxjs/toolkit";
interface Row {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
}

interface State {
  taskStore: {
    rows: Row[];
    searchQuery: string;
    filterStatus: string;
  };
}




const selectRows = (state: State) => state.taskStore.rows;
const selectSearchQuery = (state: State) => state.taskStore.searchQuery;
const selectFilterStatus = (state:State) => state.taskStore.filterStatus;



export const selectFilteredAndSearchedRows = createSelector(
  [selectRows, selectSearchQuery, selectFilterStatus],
  (rows = [], searchQuery = '', filterStatus = 'all') => {
    const lowercaseSearchValue = searchQuery.toLowerCase();
    return rows.filter(item => {
      const matchesSearchQuery =
        item?.name?.toLowerCase().includes(lowercaseSearchValue) ||
        item?.type?.toLowerCase().includes(lowercaseSearchValue) ||
        item?.description?.toLowerCase().includes(lowercaseSearchValue);
      const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
      return matchesSearchQuery && matchesFilter;
    });
  }
);


