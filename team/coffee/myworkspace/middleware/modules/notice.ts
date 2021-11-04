import coffeeReducer, {
    addcoffee,
    addTotalpages,
    initialCompleted,
    initialNextcoffee,
    initialPagedcoffee,
    initialcoffee,
    initialcoffeeItem,
    modifycoffee,
    coffeePage,
    removecoffee,
  } from "../../provider/modules/coffee";
  import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
  import { coffeeItem } from "../../provider/modules/coffee";
  import {
    call,
    put,
    select,
    takeEvery,
    takeLatest,
  } from "@redux-saga/core/effects";
  import api, {
    coffeeItemRequest,
    coffeeItemResponse,
    coffeePagingReponse,
  } from "../../api/coffee";
  import { AxiosResponse } from "axios";
  import { endProgress, startProgress } from "../../provider/modules/progress";
  import { addAlert } from "../../provider/modules/alert";
  import { RootState } from "../../provider";
  import { dataUrlToFile } from "../../lib/string";
  import fileApi from "../../api/file";
  
  
  export interface PageRequest {
    page: number;
    size: number;
  }
  
 
  export const requestAddcoffee = createAction<coffeeItem>(
    `${coffeeReducer.name}/requestAddcoffee`
  );
  
 
  export const requestAddcoffeePaging = createAction<coffeeItem>(
    `${coffeeReducer.name}/requestAddcoffeePaging`
  );
  
  
  export const requestAddcoffeeNext = createAction<coffeeItem>(
    `${coffeeReducer.name}/requestAddcoffeeNext`
  );
  
  
  export const requestFetchcoffees = createAction(
    `${coffeeReducer.name}/requestFetchcoffees`
  );
  
  
  export const requestFetchPagingcoffees = createAction<PageRequest>(
    `${coffeeReducer.name}/requestFetchPagingcoffees`
  );
  
  
  export const requestFetchNextcoffees = createAction<PageRequest>(
    `${coffeeReducer.name}/requestFetchNextcoffees`
  );
  
  
  export const requestFetchcoffeeItem = createAction<number>(
    `${coffeeReducer.name}/requestFetchcoffeeItem`
  );
  
  
  export const requestRemovecoffee = createAction<number>(
    `${coffeeReducer.name}/requestRemovecoffee`
  );
  
  
  export const requestRemovecoffeePaging = createAction<number>(
    `${coffeeReducer.name}/requestRemovecoffeePaging`
  );
  
 
  export const requestRemovecoffeeNext = createAction<number>(
    `${coffeeReducer.name}/requestRemovecoffeeNext`
  );
  
 
  export const requestModifycoffee = createAction<coffeeItem>(
    `${coffeeReducer.name}/requestModifycoffee`
  );
  
  function* addDataPaging(action: PayloadAction<coffeeItem>) {
    yield console.log("--addDataPaging--");
    yield console.log(action);
  
    try {
     
      const coffeeItemPayload = action.payload;
  
    
      yield put(startProgress());
  
      
      const file: File = yield call(
        dataUrlToFile,
        coffeeItemPayload.coffeeUrl,
        coffeeItemPayload.fileName,
        coffeeItemPayload.fileType
      );
  
     
      const formFile = new FormData();
      formFile.set("file", file); 
  
     
      const fileUrl: AxiosResponse<string> = yield call(fileApi.upload, formFile);
      
      const coffeeItemRequest: coffeeItemRequest = {
        title: coffeeItemPayload.title, 
        description: coffeeItemPayload.description,
        coffeeUrl: fileUrl.data,
        fileType: coffeeItemPayload.fileType,
        fileName: coffeeItemPayload.fileName,
      };
  
      

      const result: AxiosResponse<coffeeItemResponse> = yield call(
        api.add,
        coffeeItemRequest
      );
  
     
      yield put(endProgress());
  
      const coffeeData: coffeeItem[] = yield select(
        (state: RootState) => state.coffee.data
      );
  
      const coffeePageSize: number = yield select(
        (state: RootState) => state.coffee.pageSize
      );
      
        if (coffeeData.length > 0 && coffeeData.length == coffeePageSize) {
        const deleteId = coffeeData[coffeeData.length - 1].id;
        yield put(removecoffee(deleteId));
        yield put(addTotalpages);
      }
  
      
      const coffeeItem: coffeeItem = {
        id: result.data.id,
        title: result.data.title,
        description: result.data.description,
        coffeeUrl: result.data.coffeeUrl,
        fileType: result.data.fileType,
        fileName: result.data.fileName,
        createdTime: result.data.createdTime,
      };
  
     
      yield put(addcoffee(coffeeItem));
  
    
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
  
  function* addDataNext(action: PayloadAction<coffeeItem>) {
    yield console.log("--addDataNext--");
    yield console.log(action);
  
    try {
      const coffeeItemPayload = action.payload;
  
      yield put(startProgress());
  
      const file: File = yield call(
        dataUrlToFile,
        coffeeItemPayload.coffeeUrl,
        coffeeItemPayload.fileName,
        coffeeItemPayload.fileType
      );
  
      const formFile = new FormData();
      formFile.set("file", file);
  
      const fileUrl: AxiosResponse<string> = yield call(fileApi.upload, formFile);
  
      const coffeeItemRequest: coffeeItemRequest = {
        title: coffeeItemPayload.title,
        description: coffeeItemPayload.description,
        coffeeUrl: fileUrl.data,
        fileType: coffeeItemPayload.fileType,
        fileName: coffeeItemPayload.fileName,
      };
  
      const result: AxiosResponse<coffeeItemResponse> = yield call(
        api.add,
        coffeeItemRequest
      );
  
      // spinner 사라지게 하기
      yield put(endProgress());
  
      
      const coffeeItem: coffeeItem = {
        id: result.data.id,
        title: result.data.title,
        description: result.data.description,
        coffeeUrl: result.data.coffeeUrl,
        fileType: result.data.fileType,
        fileName: result.data.fileName,
        createdTime: result.data.createdTime,
      };
  
      yield put(addcoffee(coffeeItem));
  
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
  
    const result: AxiosResponse<coffeeItemResponse[]> = yield call(api.fetch);
  
    yield put(endProgress());
  
    const coffees = result.data.map(
      (item) =>
        ({
          id: item.id,
          title: item.title,
          description: item.description,
          coffeeUrl: item.coffeeUrl,
          fileType: item.fileType,
          fileName: item.fileName,
          createdTime: item.createdTime,
        } as coffeeItem)
    );
  
    yield put(initialcoffee(coffees));
  }
  
  function* fetchPagingData(action: PayloadAction<PageRequest>) {
    yield console.log("--fetchPagingData--");
  
    const page = action.payload.page;
    const size = action.payload.size;
  
    localStorage.setItem("coffee_page_size", size.toString());
  
    
    yield put(startProgress());
  
    try {
     
      const result: AxiosResponse<coffeePagingReponse> = yield call(
        api.fetchPaging,
        page,
        size
      );
  
      
      yield put(endProgress());
  
     
      const coffeePage: coffeePage = {
       
        data: result.data.content.map(
          (item) =>
            ({
              id: item.id,
              title: item.title,
              description: item.description,
              coffeeUrl: item.coffeeUrl,
              fileType: item.fileType,
              fileName: item.fileName,
              createdTime: item.createdTime,
            } as coffeeItem)
        ),
        totalElements: result.data.totalElements,
        totalPages: result.data.totalPages,
        page: result.data.number,
        pageSize: result.data.size,
        isLast: result.data.last,
      };
  
      
      yield put(initialPagedcoffee(coffeePage));
    } catch (e: any) {
      
      yield put(
        addAlert({ id: nanoid(), variant: "danger", message: e.message })
      );
    }
  }
  
 
  function* fetchNextData(action: PayloadAction<PageRequest>) {
    yield console.log("--fetchNextData--");
  
    const page = action.payload.page;
    const size = action.payload.size;
  
   
    yield put(startProgress());
  
    try {
      const result: AxiosResponse<coffeePagingReponse> = yield call(
        api.fetchPaging,
        page,
        size
      );
  
      yield put(endProgress());
  
      const coffeePage: coffeePage = {
        data: result.data.content.map(
          (item) =>
            ({
              id: item.id,
              title: item.title,
              description: item.description,
              coffeeUrl: item.coffeeUrl,
              fileType: item.fileType,
              fileName: item.fileName,
              createdTime: item.createdTime,
            } as coffeeItem)
        ),
        totalElements: result.data.totalElements,
        totalPages: result.data.totalPages,
        page: result.data.number,
        pageSize: result.data.size,
        isLast: result.data.last,
      };
  
     
      yield put(initialNextcoffee(coffeePage));
    } catch (e: any) {
      yield put(endProgress());
      yield put(
        addAlert({ id: nanoid(), variant: "danger", message: e.message })
      );
    }
  }
  function* fetchDataItem(action: PayloadAction<number>) {
    yield console.log("--fetchDataItem--");
  
    const id = action.payload;
    const result: AxiosResponse<coffeeItemResponse> = yield call(api.get, id);
  
    const coffee = result.data;
    if (coffee) {
      yield put(initialcoffeeItem(coffee));
    }
  }
  
  function* removeDataPaging(action: PayloadAction<number>) {
    yield console.log("--removeData--");
  
    const id = action.payload;
  
    yield put(startProgress());
  
    const coffeeItem: coffeeItem = yield select((state: RootState) =>
      state.coffee.data.find((item) => item.id === id)
    );
    const urlArr = coffeeItem.coffeeUrl.split("/");
    const objectKey = urlArr[urlArr.length - 1];
  
    
    yield call(fileApi.remove, objectKey);
  
  
    
    const result: AxiosResponse<boolean> = yield call(api.remove, id);
  
    
    yield put(endProgress());
  
    
    if (result.data) {
      yield put(removecoffee(id));
    } else {
      yield put(
        addAlert({
          id: nanoid(),
          variant: "danger",
          message: "오류로 저장되지 않았습니다.",
        })
      );
    }
  
    yield put(initialCompleted());
  
    const page: number = yield select((state: RootState) => state.coffee.page);
    const size: number = yield select((state: RootState) => state.coffee.pageSize);
  
    yield put(requestFetchPagingcoffees({ page, size }));
  }
  
  function* removeDataNext(action: PayloadAction<number>) {
    yield console.log("--removeDataNext--");
  
    const id = action.payload;
  
    yield put(startProgress());
  
    const coffeeItem: coffeeItem = yield select((state: RootState) =>
      state.coffee.data.find((item) => item.id === id)
    );
    const urlArr = coffeeItem.coffeeUrl.split("/");
    const objectKey = urlArr[urlArr.length - 1];
  
    yield call(fileApi.remove, objectKey);
    const result: AxiosResponse<boolean> = yield call(api.remove, id);
  
    yield put(endProgress());
  
    if (result.data) {
      yield put(removecoffee(id));
    } else {
      yield put(
        addAlert({
          id: nanoid(),
          variant: "danger",
          message: "오류로 저장되지 않았습니다.",
        })
      );
    }
  
    yield put(initialCompleted());
  }
  
  function* modifyData(action: PayloadAction<coffeeItem>) {
    yield console.log("--modifyData--");
  
    const coffeeItemPayload = action.payload;
  
    
    yield put(startProgress());
  
    
    let fileUrl = action.payload.coffeeUrl;
    if (action.payload.coffeeUrl.startsWith("data")) {
      
      const coffeeItemFile: coffeeItem = yield select((state: RootState) =>
        state.coffee.data.find((item) => item.id === coffeeItemPayload.id)
      );
      const urlArr = coffeeItemFile.coffeeUrl.split("/");
      const objectKey = urlArr[urlArr.length - 1];
  
    
      yield call(fileApi.remove, objectKey);
      
      const file: File = yield call(
        dataUrlToFile,
        coffeeItemPayload.coffeeUrl,
        coffeeItemPayload.fileName,
        coffeeItemPayload.fileType
      );
  
      const formFile = new FormData();
      formFile.set("file", file);
  
      
      const fileRes: AxiosResponse<string> = yield call(fileApi.upload, formFile);
      fileUrl = fileRes.data;

    }
  
    
    const coffeeItemRequest: coffeeItemRequest = {
      title: coffeeItemPayload.title,
      description: coffeeItemPayload.description,
      coffeeUrl: fileUrl,
      fileType: coffeeItemPayload.fileType,
      fileName: coffeeItemPayload.fileName,
    };
  
    const result: AxiosResponse<coffeeItemResponse> = yield call(
      api.modify,
      coffeeItemPayload.id,
      coffeeItemRequest
    );
  
    yield put(endProgress());
  
    const coffeeItem: coffeeItem = {
      id: result.data.id,
      title: result.data.title,
      description: result.data.description,
      coffeeUrl: result.data.coffeeUrl,
      fileType: result.data.fileType,
      fileName: result.data.fileName,
      createdTime: result.data.createdTime,
    };
  
    yield put(modifycoffee(coffeeItem));
  
    yield put(initialCompleted());
  }
  

  export default function* coffeeSaga() {
    yield takeEvery(requestAddcoffee, addDataNext);
    yield takeEvery(requestAddcoffeePaging, addDataPaging);
    yield takeEvery(requestAddcoffeeNext, addDataNext);
  
    yield takeEvery(requestFetchcoffeeItem, fetchDataItem);
    yield takeLatest(requestFetchcoffees, fetchData);
    yield takeLatest(requestFetchPagingcoffees, fetchPagingData);
    yield takeLatest(requestFetchNextcoffees, fetchNextData);
  
    yield takeEvery(requestRemovecoffee, removeDataNext);
    yield takeEvery(requestRemovecoffeePaging, removeDataPaging);
    yield takeEvery(requestRemovecoffeeNext, removeDataNext);
  
    
    yield takeEvery(requestModifycoffee, modifyData);
  }