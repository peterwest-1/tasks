import { create } from 'zustand';

const useFilterStore = create((set, get) => ({
  filters: [],
  addFilter: (filterFunction, componentId) => {
    set((state) => ({
      filters: [...state.filters, { filterFunction, componentId }],
    }));
  },
  removeFilter: (componentId) => {
    set((state) => ({
      filters: state.filters.filter((filter) => filter.componentId !== componentId),
    }));
  },
  clearFilters: () => {
    set({ filters: [] });
  },
  applyFilters: (array) =>
    array.filter((item) => get().filters.every((filter) => filter.filterFunction(item))),
}));

export default useFilterStore;
