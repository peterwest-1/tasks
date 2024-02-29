import dayjs from 'dayjs';
import { create } from 'zustand';

const startDateDefault = dayjs(new Date('2023-03-01'));
const endDateDefault = dayjs(new Date('2024-03-10'));

const useDateStore = create((set) => ({
  dateRange: [dayjs(startDateDefault), dayjs(endDateDefault)],
  setDateRange: (newDateRange) => {
    set({ dateRange: newDateRange });
  },
  resetDateRange: () => {
    set({ dateRange: [dayjs(startDateDefault), dayjs(endDateDefault)] });
  },
}));
export default useDateStore;
