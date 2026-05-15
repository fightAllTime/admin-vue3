import { computed, reactive, ref } from "vue";

const useRoleCrud = <T extends Record<string, any>>(
  mockData: T[],
  keyField: keyof T,
) => {
  const currentPage = ref<number>(1);
  const pageSize = ref<number>(10);
  const initData = reactive<T[]>(mockData);
  const visible = ref<boolean>(false);
  const data = initData as T[];
  
  const currentRow = ref<T | null>(null);
  const setCurrentRow = (cr:T | null) => currentRow.value = cr
  
  // 总数
  const total = computed(() => {
    return data.filter((m) => m.roleName.includes(keyWord.value)).length;
  });

  // 表单渲染的数据，computed自动计算
  const tableData = computed(() => {
    //查询时过滤
    const filteredData = data.filter((m) => m.roleName.includes(keyWord.value));
    // 分页
    const start = (currentPage.value - 1) * pageSize.value;
    return filteredData.slice(start, start + pageSize.value);
  });

  // 表格数据进行computed时的判断依据
  const keyWord = ref<string>("");

  const setKeyword = (kw: string) => (keyWord.value = kw);

  const saveRow = (payload: T) => {
    // 如果传回来的数据携带roleId，则证明是编辑
    const idx = data.findIndex((m) => m[keyField] === payload[keyField]);
    if (idx !== -1) {
      data[idx] = { ...data[idx], ...payload };
    } else {
      // 否则为新增
      data.push(payload);
    }
  };

  // 删除表格行
  const doDeleteRow = (row: T) => {
    const start = data.findIndex((m) => m[keyField] === row[keyField]);
    initData.splice(start, 1);
  };

  return {
    currentPage,
    pageSize,
    initData,
    visible,
    currentRow,
    total,
    tableData,
    setKeyword,
    setCurrentRow,
    saveRow,
    doDeleteRow,
  };
};

export default useRoleCrud;
