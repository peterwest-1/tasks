import { useState, useEffect } from 'react';

import uuidv4 from 'src/utils/uuidv4';

import useTaskStore from '../store/task-store';
import useFilterStore from '../store/filter-store';

const useFilter = () => {
  const data = useTaskStore((state) => state.data);
  const [localData, setLocalData] = useState([]);
  const { addFilter, removeFilter } = useFilterStore();
  const filters = useFilterStore((state) => state.filters);

  const applyFilters = useTaskStore((state) => state.applyFilters);

  const [canReset, setCanReset] = useState(false);
  const [componentId, setComponentId] = useState(null);

  const applyFilter = (filterFunction) => {
    if (componentId == null && !canReset) {
      const id = uuidv4();
      setComponentId(id);
      setLocalData(data);
      addFilter(filterFunction, id);
      setCanReset(true);
    }
    applyFilters();
  };

  const removeFilterFromComp = () => {
    if (componentId != null) {
      removeFilter(componentId);
      setComponentId(() => null);
    }
    applyFilters();
  };

  useEffect(() => {
    if (componentId != null) {
      if (filters.length > 0) {
        if (filters[filters.length - 1].componentId === componentId) {
          setCanReset(true);
          return;
        }
      }
    }

    setCanReset(false);
  }, [filters, componentId, canReset, data]);

  ///
  // useEffect(() => {
  //   if (componentId == null) {
  //     setLocalData(data);
  //   }
  // }, [data, componentId]);

  return {
    applyFilter,
    removeFilterFromComp,
    canReset,
    setCanReset,
    data: componentId != null ? localData : data,
  };
};

export default useFilter;
