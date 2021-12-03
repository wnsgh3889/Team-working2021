import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../provider";

const noticeDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const id = router.query.id as string;
  console.log(id);

  let noticeItem = useSelector((state: RootState) =>
    state.notice.data.find((item: { id: number }) => item.id === +id)
  );

  const isRemoveCompleted = useSelector(
    (state: RootState) => state.notice.isRemoveCompleted
  );

  useEffect(() => {
    isRemoveCompleted && router.push("/notices");
  }, [isRemoveCompleted, router]);

  const handDeleteClick = () => {};
  return (
    <div style={{ width: "40vw" }} className="d-flex mx-auto flex-column my-3">
      <h2 className="text-center">notice Memo Detail</h2>
      <table className="table my-5">
        <tbody>
          <tr>
            <th>제목</th>
            <td>{noticeItem.title}</td>
          </tr>
          <tr>
            <th style={{ width: "80px" }}>내용</th>
            <td>{noticeItem.description}</td>
          </tr>
        </tbody>
      </table>

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
    </div>
  );
};

export default noticeDetail;
