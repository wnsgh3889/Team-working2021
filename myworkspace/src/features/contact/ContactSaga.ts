import ContactReducer, {
    addContact,
    initialContact,
    modifyContact,
    removeContact,
  } from "./ContactSlice";
  import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
  import { ContactItem } from "./ContactSlice";
  import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
  import api, { ContactItemRequest, ContactItemResponse } from "./ContactApi";
  import { AxiosResponse } from "axios";
  import {
    endProgress,
    startProgress,
  } from "../../components/progress/progressSlice";
  import { addAlert } from "../../components/alert/alertSlice";
import { initialCompleted } from "../photo/photoSlice";
  
  
  export const requestAddContact = createAction<ContactItem>(
    `${ContactReducer.name}/requestAddContact`
  );
 
  export const requestFetchContacts = createAction(
    `${ContactReducer.name}/requestFetchContacts`
  );
  
  export const requestRemoveContact = createAction<number>(
    `${ContactReducer.name}/requestRemoveContact`
  );
  
  export const requestModifyContact = createAction<ContactItem>(
    `${ContactReducer.name}/requestModifyContact`
  );
  
  function* addData(action: PayloadAction<ContactItem>) {
    yield console.log("--addData--");
  
    try {
      const ContactItemPayload = action.payload;
  
      const ContactItemRequest: ContactItemRequest = {
        name:ContactItemPayload.name,
        phone:ContactItemPayload.phone,
        email:ContactItemPayload.email,
        memo:ContactItemPayload.memo
      };
     
      yield put(startProgress());

      const result: AxiosResponse<ContactItemResponse> = yield call(
        api.add,
        ContactItemRequest
      );
  
      yield put(endProgress());
  
      const ContactItem: ContactItem = {
       id: result.data.id,
       name:result.data.name,
       email:result.data.email,
       phone:result.data.phone,
       memo:result.data.memo,
       createdTime: new Date(result.data.createdTime).toLocaleTimeString(),
      };
  
      yield put(addContact(ContactItem));
  
      yield put(initialCompleted());
  
      yield put(
        addAlert({ id: nanoid(), variant: "success", message: "저장되었습니다." })
      );
    } catch (e: any) {
      
      yield put(endProgress());
  
      yield put(
        addAlert({ id: nanoid(), variant: "danger", message: e.message })
      );

    }
  }
  
  function* fetchData() {
    yield console.log("--fetchData--");
  
    yield put(startProgress());
  
    const result: AxiosResponse<ContactItemResponse[]> = yield call(api.fetch);

    yield put(endProgress());
  
    const contacts = result.data.map(
      (item)=>
      ({
      id : item.id,
      name : item.name,
      phone: item.phone,
      email: item.email,
      memo: item.memo,
      createdTime : new Date(item.createdTime).toLocaleTimeString(),
    }as ContactItem)
    );
  
    yield put(initialContact(contacts));
  }
  
  function* removeData(action: PayloadAction<number>) {
    yield console.log("--removeData--");
  
    const id = action.payload;
  
    yield put(startProgress());
  
    const result: AxiosResponse<boolean> = yield call(api.remove, id);

    yield put(endProgress());
  
    if (result.data) {
      yield put(removeContact(id));
    }
  
    yield put(initialCompleted());
  }
  
  function* modifyData(action: PayloadAction<ContactItem>) {
    yield console.log("--modifyData--");
  
    const ContactItemPayload = action.payload;
  
    const ContactItemRequest: ContactItemRequest = {
     name: ContactItemPayload.name,
     phone: ContactItemPayload.phone,
     email : ContactItemPayload.email,
     memo : ContactItemPayload.memo
    };
  
    yield put(startProgress());
  
    const result: AxiosResponse<ContactItemResponse> = yield call(
      api.modify,
      ContactItemPayload.id,
      ContactItemRequest
    );
  
    yield put(endProgress());
  
    const ContactItem: ContactItem = {
     id: result.data.id,
     name: result.data.name,
     phone : result.data.phone,
     email : result.data.email,
     memo : result.data.memo,
     createdTime : new Date(result.data.createdTime).toLocaleTimeString(),
    };
  
    yield put(modifyContact(ContactItem));
  
    yield put(initialCompleted());
  }
  
  export default function* ContactSaga() {
    yield takeEvery(requestAddContact, addData);
  
    yield takeLatest(requestFetchContacts, fetchData);
  
    yield takeEvery(requestRemoveContact, removeData);
  
    yield takeEvery(requestModifyContact, modifyData);
  }
  