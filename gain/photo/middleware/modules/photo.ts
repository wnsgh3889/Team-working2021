import photoReducer, {
  addPhoto,
  addTotalpages,
  initialCompleted,
  initialNextPhoto,
  initialPagedPhoto,
  initialPhoto,
  initialPhotoItem,
  modifyPhoto,
  PhotoPage,
  removePhoto,
} from "../../provider/modules/photo";
import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { PhotoItem } from "../../provider/modules/photo";
import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "@redux-saga/core/effects";
import api, {
  PhotoItemRequest,
  PhotoItemResponse,
  PhotoPagingReponse,
} from "../../api/photo";
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

export const requestAddPhoto = createAction<PhotoItem>(
  `${photoReducer.name}/requestAddPhoto`
);

export const requestAddPhotoPaging = createAction<PhotoItem>(
  `${photoReducer.name}/requestAddPhotoPaging`
);

export const requestAddPhotoNext = createAction<PhotoItem>(
  `${photoReducer.name}/requestAddPhotoNext`
);

export const requestFetchPhotos = createAction(
  `${photoReducer.name}/requestFetchPhotos`
);

export const requestFetchPagingPhotos = createAction<PageRequest>(
  `${photoReducer.name}/requestFetchPagingPhotos`
);

export const requestFetchNextPhotos = createAction<PageRequest>(
  `${photoReducer.name}/requestFetchNextPhotos`
);

export const requestFetchPhotoItem = createAction<number>(
  `${photoReducer.name}/requestFetchPhotoItem`
);

export const requestRemovePhoto = createAction<number>(
  `${photoReducer.name}/requestRemovePhoto`
);

export const requestRemovePhotoPaging = createAction<number>(
  `${photoReducer.name}/requestRemovePhotoPaging`
);

export const requestRemovePhotoNext = createAction<number>(
  `${photoReducer.name}/requestRemovePhotoNext`
);

export const requestModifyPhoto = createAction<PhotoItem>(
  `${photoReducer.name}/requestModifyPhoto`
);

function* addDataPaging(action: PayloadAction<PhotoItem>) {
  yield console.log("--addDataPaging--");
  yield console.log(action);

  try {
    const photoItemPayload = action.payload;

    yield put(startProgress());

    const file: File = yield call(
      dataUrlToFile,
      photoItemPayload.photoUrl,
      photoItemPayload.fileName,
      photoItemPayload.fileType
    );

    const formFile = new FormData();
    formFile.set("file", file);

    const fileUrl: AxiosResponse<string> = yield call(fileApi.upload, formFile);

    const photoItemRequest: PhotoItemRequest = {
      title: photoItemPayload.title,

      description: photoItemPayload.description,

      photoUrl: fileUrl.data,
      fileType: photoItemPayload.fileType,
      fileName: photoItemPayload.fileName,
    };

    const result: AxiosResponse<PhotoItemResponse> = yield call(
      api.add,
      photoItemRequest
    );

    yield put(endProgress());

    const photoData: PhotoItem[] = yield select(
      (state: RootState) => state.photo.data
    );

    const photoPageSize: number = yield select(
      (state: RootState) => state.photo.pageSize
    );

    if (photoData.length > 0 && photoData.length == photoPageSize) {
      const deleteId = photoData[photoData.length - 1].id;
      yield put(removePhoto(deleteId));

      yield put(addTotalpages);
    }

    const photoItem: PhotoItem = {
      id: result.data.id,
      title: result.data.title,
      description: result.data.description,
      photoUrl: result.data.photoUrl,
      fileType: result.data.fileType,
      fileName: result.data.fileName,
      createdTime: result.data.createdTime,
    };

    yield put(addPhoto(photoItem));

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

function* addDataNext(action: PayloadAction<PhotoItem>) {
  yield console.log("--addDataNext--");
  yield console.log(action);

  try {
    const photoItemPayload = action.payload;

    yield put(startProgress());

    const file: File = yield call(
      dataUrlToFile,
      photoItemPayload.photoUrl,
      photoItemPayload.fileName,
      photoItemPayload.fileType
    );

    const formFile = new FormData();
    formFile.set("file", file);

    const fileUrl: AxiosResponse<string> = yield call(fileApi.upload, formFile);

    const photoItemRequest: PhotoItemRequest = {
      title: photoItemPayload.title,

      description: photoItemPayload.description,

      photoUrl: fileUrl.data,
      fileType: photoItemPayload.fileType,
      fileName: photoItemPayload.fileName,
    };

    const result: AxiosResponse<PhotoItemResponse> = yield call(
      api.add,
      photoItemRequest
    );

    yield put(endProgress());

    const photoItem: PhotoItem = {
      id: result.data.id,
      title: result.data.title,
      description: result.data.description,
      photoUrl: result.data.photoUrl,
      fileType: result.data.fileType,
      fileName: result.data.fileName,
      createdTime: result.data.createdTime,
    };

    yield put(addPhoto(photoItem));

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

  const result: AxiosResponse<PhotoItemResponse[]> = yield call(api.fetch);

  yield put(endProgress());

  const photos = result.data.map(
    (item) =>
      ({
        id: item.id,
        title: item.title,
        description: item.description,
        photoUrl: item.photoUrl,
        fileType: item.fileType,
        fileName: item.fileName,
        createdTime: item.createdTime,
      } as PhotoItem)
  );

  yield put(initialPhoto(photos));
}

function* fetchPagingData(action: PayloadAction<PageRequest>) {
  yield console.log("--fetchPagingData--");

  const page = action.payload.page;
  const size = action.payload.size;

  localStorage.setItem("photo_page_size", size.toString());

  yield put(startProgress());

  try {
    const result: AxiosResponse<PhotoPagingReponse> = yield call(
      api.fetchPaging,
      page,
      size
    );

    yield put(endProgress());

    const photoPage: PhotoPage = {
      data: result.data.content.map(
        (item) =>
          ({
            id: item.id,
            title: item.title,
            description: item.description,
            photoUrl: item.photoUrl,
            fileType: item.fileType,
            fileName: item.fileName,
            createdTime: item.createdTime,
          } as PhotoItem)
      ),
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      page: result.data.number,
      pageSize: result.data.size,
      isLast: result.data.last,
    };

    yield put(initialPagedPhoto(photoPage));
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
    const result: AxiosResponse<PhotoPagingReponse> = yield call(
      api.fetchPaging,
      page,
      size
    );

    yield put(endProgress());

    const photoPage: PhotoPage = {
      data: result.data.content.map(
        (item) =>
          ({
            id: item.id,
            title: item.title,
            description: item.description,
            photoUrl: item.photoUrl,
            fileType: item.fileType,
            fileName: item.fileName,
            createdTime: item.createdTime,
          } as PhotoItem)
      ),
      totalElements: result.data.totalElements,
      totalPages: result.data.totalPages,
      page: result.data.number,
      pageSize: result.data.size,
      isLast: result.data.last,
    };

    yield put(initialNextPhoto(photoPage));
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

  const result: AxiosResponse<PhotoItemResponse> = yield call(api.get, id);

  const photo = result.data;
  if (photo) {
    yield put(initialPhotoItem(photo));
  }
}

function* removeDataPaging(action: PayloadAction<number>) {
  yield console.log("--removeData--");

  const id = action.payload;

  yield put(startProgress());

  const photoItem: PhotoItem = yield select((state: RootState) =>
    state.photo.data.find((item) => item.id === id)
  );
  const urlArr = photoItem.photoUrl.split("/");
  const objectKey = urlArr[urlArr.length - 1];

  yield call(fileApi.remove, objectKey);

  const result: AxiosResponse<boolean> = yield call(api.remove, id);

  yield put(endProgress());

  if (result.data) {
    yield put(removePhoto(id));
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

  const page: number = yield select((state: RootState) => state.photo.page);
  const size: number = yield select((state: RootState) => state.photo.pageSize);

  yield put(requestFetchPagingPhotos({ page, size }));
}

function* removeDataNext(action: PayloadAction<number>) {
  yield console.log("--removeDataNext--");

  const id = action.payload;

  yield put(startProgress());

  const photoItem: PhotoItem = yield select((state: RootState) =>
    state.photo.data.find((item) => item.id === id)
  );
  const urlArr = photoItem.photoUrl.split("/");
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
    yield put(removePhoto(id));
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
function* modifyData(action: PayloadAction<PhotoItem>) {
  yield console.log("--modifyData--");

  // action의 payload로 넘어온 객체
  const photoItemPayload = action.payload;

  yield put(startProgress());

  let fileUrl = action.payload.photoUrl;
  if (action.payload.photoUrl.startsWith("data")) {
    const photoItemFile: PhotoItem = yield select((state: RootState) =>
      state.photo.data.find((item) => item.id === photoItemPayload.id)
    );
    const urlArr = photoItemFile.photoUrl.split("/");
    const objectKey = urlArr[urlArr.length - 1];

    yield call(fileApi.remove, objectKey);

    const file: File = yield call(
      dataUrlToFile,
      photoItemPayload.photoUrl,
      photoItemPayload.fileName,
      photoItemPayload.fileType
    );

    const formFile = new FormData();
    formFile.set("file", file);

    const fileRes: AxiosResponse<string> = yield call(fileApi.upload, formFile);
    fileUrl = fileRes.data;
    /*-------------------------------------------------------- */
  }

  const photoItemRequest: PhotoItemRequest = {
    title: photoItemPayload.title,
    description: photoItemPayload.description,

    photoUrl: fileUrl,
    fileType: photoItemPayload.fileType,
    fileName: photoItemPayload.fileName,
  };

  const result: AxiosResponse<PhotoItemResponse> = yield call(
    api.modify,
    photoItemPayload.id,
    photoItemRequest
  );

  yield put(endProgress());

  const photoItem: PhotoItem = {
    id: result.data.id,
    title: result.data.title,
    description: result.data.description,
    photoUrl: result.data.photoUrl,
    fileType: result.data.fileType,
    fileName: result.data.fileName,
    createdTime: result.data.createdTime,
  };

  yield put(modifyPhoto(photoItem));

  yield put(initialCompleted());
}

export default function* photoSaga() {
  yield takeEvery(requestAddPhoto, addDataNext);
  yield takeEvery(requestAddPhotoPaging, addDataPaging);
  yield takeEvery(requestAddPhotoNext, addDataNext);

  yield takeEvery(requestFetchPhotoItem, fetchDataItem);
  yield takeLatest(requestFetchPhotos, fetchData);
  yield takeLatest(requestFetchPagingPhotos, fetchPagingData);
  yield takeLatest(requestFetchNextPhotos, fetchNextData);

  yield takeEvery(requestRemovePhoto, removeDataNext);
  yield takeEvery(requestRemovePhotoPaging, removeDataPaging);
  yield takeEvery(requestRemovePhotoNext, removeDataNext);

  yield takeEvery(requestModifyPhoto, modifyData);
}
