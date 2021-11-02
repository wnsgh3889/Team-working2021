import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// - 목록조회: 4열 그리드화면으로 목록조회(프로필, 타이틀, 이미지)
// - 사진추가: 추가버튼으로 제목, 설명, 이미지파일 선택 후 추가, 목록버튼

// 데이터구조를 interface로 만듦
export interface ContactItem {
  id: number;
  name: string;
  phone: string;
  email: string;
  memo: string;
  createdTime: string;
}
// 백엔드 연동 고려해서 state 구조를 설계
interface ContactState {
  data: ContactItem[]; // 포토 아이템 배열
  isFetched: boolean; // 서버에서 데이터를 받아온지에 대한 정보
  isAddCompleted? : boolean;
  isRemoveCompleted?: boolean;
  isModifyCompleted?: boolean;
}

// Contact state를 목록 -> array
const initialState: ContactState = {
  data: [
  ],
  isFetched: false,
};

const ContactSlice = createSlice({
  name: "Contact",
  initialState,
  reducers: {
    // PayloadAction<payload타입>
    // payload로 item객체를 받음
    addContact: (state, action: PayloadAction<ContactItem>) => {
      const contact = action.payload;
      console.log("--in reducer function--");
      state.data.unshift(contact);
      state.isAddCompleted = true;
    },
   
    removeContact: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
    },
    modifyContact: (state, action: PayloadAction<ContactItem>) => {
     
      const modifyItem = action.payload;
     
      const ContactItem = state.data.find((item) => item.id === modifyItem.id);
      
      if (ContactItem) {
        ContactItem.name = modifyItem.name;
        ContactItem.phone = modifyItem.phone;
        ContactItem.email = modifyItem.email;
        ContactItem.memo = modifyItem.memo;
        ContactItem.createdTime = modifyItem.createdTime;
      }
    },
    initialContact : (state, action: PayloadAction<ContactItem[]>) => {
      const contact = action.payload;
      state.data = contact;
      state.isFetched = true;
    }
  },
});

export const { addContact, removeContact, modifyContact, initialContact } = ContactSlice.actions;

export default ContactSlice.reducer;