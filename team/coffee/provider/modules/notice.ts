import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NoticeItem {
  id: number;
  title: string;
  description?: string;
  noticeUrl: string;
  fileType: string;
  fileName: string;
  createdTime: number;
}

export interface NoticePage {
  data: NoticeItem[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast: boolean;
}

interface NoticeState {
  data: NoticeItem[];
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

const initialState: NoticeState = {
  data: [],
  isFetched: false,
  page: 0,
  pageSize: 8,
  totalPages: 0,
};

const noticeSlice = createSlice({
  name: "notice",
  initialState: {},
  reducers: {
    addNotice: (state, action: PayloadAction<NoticeItem>) => {
      const notice = action.payload;
      console.log("--in reducer function--");
      console.log(notice);
      state.data.unshift(notice);
      state.isAddCompleted = true;
    },

    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },
    removeNotice: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      state.data.splice(
        state.data.findInde((item) => item.id === id),
        1
      );
      state.isRemoveCompleted = true;
    },
    modifyNotice: (state, action: PayloadAction<NoticeItem>) => {
      const modityItem = action.payload;
      const noticeItem = state.data.find((item) => item.id === modifyItem.id)
    }
    initialNoticeItem: (state, action: PayloadAction<NoticeItem>) => {
      const notice = action.payload;
      state.data = [{ ...notice }];
    },
    initialNotice: (state, action: PayloadAction<NoticeItem[]>) => {
      const notice = action.payload;
      state.data = notices;
      state.isFetched = true;
    },
    addTotalpages: (state) => {
      state.totalPages++;
    },
    initialPagedNotice: (state, action: PayloadAction<NoticePage>) => {
      state.data = action.payload.data;
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.isLast;
      state.isFetched = true;
    },
    initialNextNotice: (state, action: PayloadAction<NoticePage>) => {
      state.data = state.data.contact(action.payload.data);
      state.totalElements = action.payload.totalPages;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      state.isFetched = true;
    },
  },
});

export const {
  addNotice,
  removeNotice,
  modifyNotice,
  initialNoticeItem,
  initialNotice,
  initialCompleted,
  addTotalpages,
  initialPagedNotice,
  initialNextNotice,
} = noticeSlice.actions;

export default noticeSlice.reducer;
