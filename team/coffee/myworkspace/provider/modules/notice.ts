import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface coffeeItem {
  id: number;
  title: string;
  description?: string;
  coffeeUrl: string;
  fileType: string;
  fileName: string;
  createdTime: number;
}

export interface coffeePage {
  data: coffeeItem[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast: boolean;
}

interface coffeeState {
  data: coffeeItem[]; 
  isFetched: boolean; 
  isAddCompleted?: boolean; 
  isRemoveCompleted?: boolean; 
  isModifyCompleted?: boolean;
  totalElements?: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast?: boolean;
}


const initialState: coffeeState = {
  data: [],
  isFetched: false,
  page: 0,
  pageSize: 8,
  totalPages: 0,
};

const coffeeSlice = createSlice({
  name: "coffee",
  initialState,
  reducers: {
    addcoffee: (state, action: PayloadAction<coffeeItem>) => {
      const coffee = action.payload;
      console.log("--in reducer function--");
      console.log(coffee);
      state.data.unshift(coffee);
      state.isAddCompleted = true; 
    },
    
    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },
    
    removecoffee: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
      state.isRemoveCompleted = true; 
    },
    modifycoffee: (state, action: PayloadAction<coffeeItem>) => {
      const modifyItem = action.payload;
      const coffeeItem = state.data.find((item) => item.id === modifyItem.id);
      if (coffeeItem) {
        coffeeItem.title = modifyItem.title;
        coffeeItem.description = modifyItem.description;
        coffeeItem.coffeeUrl = modifyItem.coffeeUrl;
        coffeeItem.fileName = modifyItem.fileName;
        coffeeItem.fileType = modifyItem.fileType;
      }
      state.isModifyCompleted = true; // 변경 되었음을 표시
    },
    initialcoffeeItem: (state, action: PayloadAction<coffeeItem>) => {
      const coffee = action.payload;
      state.data = [{ ...coffee }];
    },
    initialcoffee: (state, action: PayloadAction<coffeeItem[]>) => {
      const coffees = action.payload;
      state.data = coffees;
      state.isFetched = true;
    },
    addTotalpages: (state) => {
      state.totalPages++;
    },
    
    initialPagedcoffee: (state, action: PayloadAction<coffeePage>) => {
      
      state.data = action.payload.data;
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      state.isFetched = true;
    },
    initialNextcoffee: (state, action: PayloadAction<coffeePage>) => {
      
      state.data = state.data.concat(action.payload.data);
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      state.isFetched = true;
    },
  },
});


export const {
  addcoffee,
  removecoffee,
  modifycoffee,
  initialcoffeeItem,
  initialcoffee,
  initialCompleted,
  addTotalpages,
  initialPagedcoffee,
  initialNextcoffee,
} = coffeeSlice.actions;

export default coffeeSlice.reducer;