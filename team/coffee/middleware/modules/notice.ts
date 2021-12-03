import noticeReducer, {
  addnotice,
  addTotalpages,
  initialCompleted,
  initialNextnotice,
  initialPagednotice,
  initialnotice,
  initialnoticeItem,
  modifynotice,
  noticePage,
  removenotice,
} from "../../provider/modules/notice";
import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { noticeItem } from "../../provider/modules/notice";
import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "@redux-saga/core/effects";
import api, {
  noticeItemRequest,
  noticeItemResponse,
  noticePagingReponse,
} from "../../api/notice";
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

export const requestAddnotice = createAction<noticeItem>(
  `${noticeReducer.name}/requestAddnotice`
);

export const requestAddnoticePaging = createAction<noticeItem>(
  `${noticeReducer.name}/requestAddnoticePaging`
);

export const requestAddnoticeNext = createAction<noticeItem>(
  `${noticeReducer.name}/requestAddnoticeNext`
);

export const requestFetchnotices = createAction(
  `${noticeReducer.name}/requestFetchnotices`
);

export const requestFetchPagingnotices = createAction<PageRequest>(
  `${noticeReducer.name}/requestFetchPagingnotices`
);

export const requestFetchNextnotices = createAction<PageRequest>(
  `${noticeReducer.name}/requestFetchNextnotices`
);

export const requestFetchnoticeItem = createAction<number>(
  `${noticeReducer.name}/requestFetchnoticeItem`
);

export const requestRemovenotice = createAction<number>(
  `${noticeReducer.name}/requestRemovenotice`
);

export const requestRemovenoticePaging = createAction<number>(
  `${noticeReducer.name}/requestRemovenoticePaging`
);

export const requestRemovenoticeNext = createAction<number>(
  `${noticeReducer.name}/requestRemovenoticeNext`
);

export const requestModifynotice = createAction<noticeItem>(
  `${noticeReducer.name}/requestModifynotice`
);

function* addDataPaging(action: PayloadAction<noticeItem>) {
  yield console.log("--addDataPaging--");
  yield console.log(action);

  try {
    const noticeItemPayload = action.payload;

    yield put(startProgress());

    const file: File = yield call(
      dataUrlToFile,
      noticeItemPayload.noticeUrl,
      noticeItemPayload.fileName,
      noticeItemPayload.fileType
    );

    const formFile = new FormData();
    formFile.set("file", file);

    const fileUrl: AxiosResponse<string> = yield call(fileApi.upload, formFile);

    const noticeItemRequest: noticeItemRequest = {
      title: noticeItemPayload.title,

      description: noticeItemPayload.description,

      noticeUrl: fileUrl.data,
      fileType: noticeItemPayload.fileType,
      fileName: noticeItemPayload.fileName,
    };

    const result: AxiosResponse<noticeItemResponse> = yield call(
      api.add,
      noticeItemRequest
    );

    yield put(endProgress());

    const noticeData: noticeItem[] = yield select(
      (state: RootState) => state.notice.data
    );

    const noticePageSize: number = yield select(
      (state: RootState) => state.notice.pageSize
    );

    if (noticeData.length > 0 && noticeData.length == noticePageSize) {
      const deleteId = noticeData[noticeData.length - 1].id;
      yield put(removenotice(deleteId));

      yield put(addTotalpages);
    }

    const noticeItem: noticeItem = {
      id: result.data.id,
      title: result.data.title,
      description: result.data.description,
      noticeUrl: result.data.noticeUrl,
      fileType: result.data.fileType,
      fileName: result.data.fileName,
      createdTime: result.data.createdTime,
    };

    yield put(addnotice(noticeItem));

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

function* addDataNext(action: PayloadAction<noticeItem>) {
  yield console.log("--addDataNext--");
  yield console.log(action);

  try {
    const noticeItemPayload = action.payload;

    yield put(startProgress());

    const file: File = yield call(
      dataUrlToFile,
      noticeItemPayload.noticeUrl,
      noticeItemPayload.fileName,
      noticeItemPayload.fileType
    );

    const formFile = new FormData();
    formFile.set("file", file);

    const fileUrl: AxiosResponse<string> = yield call(fileApi.upload, formFile);

    const noticeItemRequest: noticeItemRequest = {
      title: noticeItemPayload.title,

      description: noticeItemPayload.description,

      noticeUrl: fileUrl.data,
      fileType: noticeItemPayload.fileType,
      fileName: noticeItemPayload.fileName,
    };

    const result: AxiosResponse<noticeItemResponse> = yield call(
      api.add,
      noticeItemRequest
    );

    yield put(endProgress());

    const noticeItem: noticeItem = {
      id: result.data.id,
      title: result.data.title,
      description: result.data.description,
      noticeUrl: result.data.noticeUrl,
      fileType: result.data.fileType,
      fileName: result.data.fileName,
      createdTime: result.data.createdTime,
    };

    yield put(addnotice(noticeItem));

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

  const result: AxiosResponse<noticeItemResponse[]> = yield call(api.fetch);

  yield put(endProgress());

  const notices = result.data.map(
    (item) =>
      ({
        id: item.id,
        title: item.title,
        description: item.description,
        noticeUrl: item.noticeUrl,
        fileType: item.fileType,
        fileName: item.fileName,
        createdTime: item.createdTime,
      } as noticeItem)
  );

  yield put(initialnotice(notices));
}

function* fetchPagingData(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchPagingData--");

  const page = action.payload.page;
  const size = action.payload.size;

  localStorage.setItem("notice_page_size", size.toString());

  yield put(startProgress());

  try {
    const result: AxiosResponse<noticePagingReponse> = yield call(
      api.fetchPaging,
      page,
      size
    );

    yield put(endProgress());

    const noticePage: noticePage = {
      data: result.data.content.map(
        (item) =>
          ({
            id: item.id,
            title: item.title,
            description: item.description,
            noticeUrl: item.noticeUrl,
            fileType: item.fileType,
            fileName: item.fileName,
            createdTime: item.createdTime,
          } as noticeItem)
      ),
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      page: result.data.number,
      pageSize: result.data.size,
      isLast: result.data.last,
    };

    yield put(initialPagednotice(noticePage));
  } catch (e: any) {
    yield put(endProgress());

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
    const result: AxiosResponse<noticePagingReponse> = yield call(
      api.fetchPaging,
      page,
      size
    );

    yield put(endProgress());

    const noticePage: noticePage = {
      data: result.data.content.map(
        (item) =>
          ({
            id: item.id,
            title: item.title,
            description: item.description,
            noticeUrl: item.noticeUrl,
            fileType: item.fileType,
            fileName: item.fileName,
            createdTime: item.createdTime,
          } as noticeItem)
      ),
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      page: result.data.number,
      pageSize: result.data.size,
      isLast: result.data.last,
    };

    yield put(initialNextnotice(noticePage));
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

  const result: AxiosResponse<noticeItemResponse> = yield call(api.get, id);

  const notice = result.data;
  if (notice) {
    yield put(initialnoticeItem(notice));
  }
}

function* removeDataPaging(action: PayloadAction<number>) {
  yield console.log("--removeData--");

  const id = action.payload;

  yield put(startProgress());

  const noticeItem: noticeItem = yield select((state: RootState) =>
    state.notice.data.find((item) => item.id === id)
  );
  const urlArr = noticeItem.noticeUrl.split("/");
  const objectKey = urlArr[urlArr.length - 1];

  yield call(fileApi.remove, objectKey);

  const result: AxiosResponse<boolean> = yield call(api.remove, id);

  yield put(endProgress());

  if (result.data) {
    yield put(removenotice(id));
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

  const page: number = yield select((state: RootState) => state.notice.page);
  const size: number = yield select(
    (state: RootState) => state.notice.pageSize
  );

  yield put(requestFetchPagingnotices({ page, size }));
}

function* removeDataNext(action: PayloadAction<number>) {
  yield console.log("--removeDataNext--");

  const id = action.payload;

  yield put(startProgress());

  const noticeItem: noticeItem = yield select((state: RootState) =>
    state.notice.data.find((item) => item.id === id)
  );
  const urlArr = noticeItem.noticeUrl.split("/");
  const objectKey = urlArr[urlArr.length - 1];

  // file api 호출해서 s3에 파일 삭제
  yield call(fileApi.remove, objectKey);
  /* ------------------------------------------------- */

  // rest api 연동
  const result: AxiosResponse<boolean> = yield call(api.remove, id);

  // spinner 사라지게 하기
  yield put(endProgress());

  // 반환 값이 true이면
  if (result.data) {
    // state 변경(1건삭제)
    yield put(removenotice(id));
  } else {
    // alert박스를 추가해줌
    yield put(
      addAlert({
        id: nanoid(),
        variant: "danger",
        message: "오류로 저장되지 않았습니다.",
      })
    );
  }

  // completed 속성 삭제
  yield put(initialCompleted());
}

// 수정처리
function* modifyData(action: PayloadAction<noticeItem>) {
  yield console.log("--modifyData--");

  // action의 payload로 넘어온 객체
  const noticeItemPayload = action.payload;

  yield put(startProgress());

  let fileUrl = action.payload.noticeUrl;
  if (action.payload.noticeUrl.startsWith("data")) {
    const noticeItemFile: noticeItem = yield select((state: RootState) =>
      state.notice.data.find((item) => item.id === noticeItemPayload.id)
    );
    const urlArr = noticeItemFile.noticeUrl.split("/");
    const objectKey = urlArr[urlArr.length - 1];

    yield call(fileApi.remove, objectKey);

    const file: File = yield call(
      dataUrlToFile,
      noticeItemPayload.noticeUrl,
      noticeItemPayload.fileName,
      noticeItemPayload.fileType
    );

    const formFile = new FormData();
    formFile.set("file", file);

    const fileRes: AxiosResponse<string> = yield call(fileApi.upload, formFile);
    fileUrl = fileRes.data;
    /*-------------------------------------------------------- */
  }

  const noticeItemRequest: noticeItemRequest = {
    title: noticeItemPayload.title,
    description: noticeItemPayload.description,

    noticeUrl: fileUrl,
    fileType: noticeItemPayload.fileType,
    fileName: noticeItemPayload.fileName,
  };

  const result: AxiosResponse<noticeItemResponse> = yield call(
    api.modify,
    noticeItemPayload.id,
    noticeItemRequest
  );

  yield put(endProgress());

  const noticeItem: noticeItem = {
    id: result.data.id,
    title: result.data.title,
    description: result.data.description,
    noticeUrl: result.data.noticeUrl,
    fileType: result.data.fileType,
    fileName: result.data.fileName,
    createdTime: result.data.createdTime,
  };

  yield put(modifynotice(noticeItem));

  yield put(initialCompleted());
}

export default function* noticeSaga() {
  yield takeEvery(requestAddnotice, addDataNext);
  yield takeEvery(requestAddnoticePaging, addDataPaging);
  yield takeEvery(requestAddnoticeNext, addDataNext);

  yield takeEvery(requestFetchnoticeItem, fetchDataItem);
  yield takeLatest(requestFetchnotices, fetchData);
  yield takeLatest(requestFetchPagingnotices, fetchPagingData);
  yield takeLatest(requestFetchNextnotices, fetchNextData);

  yield takeEvery(requestRemovenotice, removeDataNext);
  yield takeEvery(requestRemovenoticePaging, removeDataPaging);
  yield takeEvery(requestRemovenoticeNext, removeDataNext);

  yield takeEvery(requestModifynotice, modifyData);
}
