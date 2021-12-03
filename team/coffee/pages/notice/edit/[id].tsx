import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../provider";

const NoticeEdit = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const noticeItem = useSelector((state: RootState) =>
    state.notice.data.find((item: { id: number }) => item.id === +id)
  );

  const isModifyCompleted = useSelector(
    (state: RootState) => state.notice.isModifyCompleted
  );

  const dispatch = useDispatch<AppDispatch>();

  const [url, setUrl] = useState<string | undefined>(noticeItem?.noticeUrl);

  const titleInput = useRef<HTMLInputElement>(null);
  const descTxta = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    isModifyCompleted && router.push("/notices");
  }, [isModifyCompleted, router]);

  const changeFile = () => {
    console.log("change");
    if (fileInput.current?.files?.length) {
      const imageFile = fileInput.current.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setUrl(reader.result?.toString());
      };
    }
  };

  const handleSaveClick = () => {
    if (fileInput.current?.files?.length) {
      const imageFile = fileInput.current.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (noticeItem) {
          const item = {...noticeItem};
          item.title = titleInput.current ? titleInput.current.value : "";
          item.description = reader.result ? reader.result.toString() : "";
          item.photoUrl = reader.result ? reader.result.toString() : "";
          item.fileType = imageFile.type;
          item.fileName = imageFile.name;

          saveItem(item);
        }
        }
      };

      const saveItem = (item: NoticeItem) => {
  };
  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Notice Edit</h2>
      <form>
        <table className="table ">
          <tbody>
            <tr>
              <th>제목</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={noticeItem?.title}
                  ref={titleInput}
                />
              </td>
            </tr>
            <tr>
              <th style={{ width: "80px" }}>내용</th>
              <td style={{ width: "450px" }}>
                <textarea
                  className="form-control"
                  style={{ height: "40vh" }}
                  defaultValue={noticeItem.description}
                  ref={descTxta}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-secondary me-1"
          onClick={() => {
            router.push("/notices");
          }}
        >
          <i className="bi bi-grid-3x3-gap me-1"></i>
          목록
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            handleSaveClick();
          }}
        >
          <i className="bi bi-check" />
          저장
        </button>
      </div>
    </div>
  );
};
export default NoticeEdit;
  