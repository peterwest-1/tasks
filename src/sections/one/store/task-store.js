import { create } from 'zustand';

import useFilterStore from './filter-store';
import useDateStore from './date-range-store';
import { filterArray, filterTasksByDateRange } from '../components/utils';

const useTaskStore = create((set, get) => ({
  originalData: [],
  data: [],
  setOriginalData: (_data) => {
    set({ originalData: _data });
  },
  applyFilters: () => {
    const { dateRange } = useDateStore.getState();
    const { filters } = useFilterStore.getState();
    const filtersApply = filters.map((filter) => filter.filterFunction);
    const filteredByDate = filterTasksByDateRange(
      get().originalData,
      dateRange[0].toDate(),
      dateRange[1].toDate()
    );
    const filtered = filterArray(filteredByDate, filtersApply);
    set(() => ({ data: filtered }));
  },
}));
export default useTaskStore;
