import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../provider";
import {
  requestFetchnoticeItem,
  requestRemovenoticeNext,
  requestRemovenoticePaging,
} from "../../../middleware/modules/notice";


import Layout from "../../../components/layout";
import { noticeItem } from "../../../provider/modules/notice";

const noticeDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const id = router.query.id as string;
  console.log(id);

  let noticeItem = useSelector((state: RootState) =>
    state.notice.data.find((item) => item.id === +id)
  );

  if (id) {
    if (!noticeItem) {
      dispatch(requestFetchnoticeItem(+id));
    }
  }

  // 삭제 여부 감지 및 가져오기
  const isRemoveCompleted = useSelector(
    (state: RootState) => state.notice.isRemoveCompleted
  );

  useEffect(() => {
    isRemoveCompleted && router.push("/notices");
  }, [isRemoveCompleted, router]);

  const handDeleteClick = () => {
  
    dispatch(requestRemovenoticeNext(+id));

  };

  return (
    <Layout>
      <section style={{ width: "40vw" }} className="mx-auto">
        <h2 className="text-center">notice Detail</h2>
        {!noticeItem && (
          <div className="text-center my-5">데이터가 없습니다.</div>
        )}
        {noticeItem && (
          <table className="table">
            <tbody>
              <tr>
                <th>제목</th>
                <td>{noticeItem.title}</td>
              </tr>
              <tr>
                <th>내용</th>
                <td>{noticeItem.description}</td>
              </tr>
            </tbody>
          </table>
        )}

        <div className="d-flex">
          <div style={{ width: "50%" }}>
            <button
              className="btn btn-secondary me-1"
              onClick={() => {
                router.push("/notices");
              }}
            >
              <i className="bi bi-grid-3x3-gap me-1"></i>
              목록
            </button>
          </div>
          <div style={{ width: "50%" }} className="d-flex justify-content-end">
            <button
              className="btn btn-primary me-1"
              onClick={() => {
                router.push(`/notices/edit/${id}`);
              }}
            >
              <i className="bi bi-pencil me-1" />
              수정
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handDeleteClick();
              }}
            >
              <i className="bi bi-trash me-1" />
              삭제
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default noticeDetail;