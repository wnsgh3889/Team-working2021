import { useRouter } from "next/dist/client/router";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";
import { NoticeItem } from "../../provider/modules/notice";

const NoticeCreate = () => {
  const titleInput = useRef<HTMLInputElement>(null);
  const descTxta = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const noticeData = useSelector((state: RootState) => state.notice.data);
  const isAddCompleted = useSelector(
    (state: RootState) => state.notice.isAddCompleted
  );

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    console.log("--isAddCompleted 변경: " + isAddCompleted);

    isAddCompleted && router.push("/notices");
  }, [isAddCompleted, router, dispatch]);

  const handleAddClick = () => {
    if (fileInput.current?.files?.length) {
    }
    if (fileInput.current?.files?.length) {
      const imageFile = fileInput.current.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const item: NoticeItem = {
          id: noticeData.length ? noticeData[0].id + 1 : 1,
          title: titleInput.current ? titleInput.current.value : "",
          description: descTxta.current?.value,
          createdTime: new Date().getTime(),
        };
      };
      reader.readAsDataURL(imageFile);
    }
  };
  return (
    <section style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Notice create</h2>
      <form>
        <table className="table">
          <tbody>
            <tr>
              <th>제목</th>
              <td>
                <input className="form-control" type="text" ref={titleInput} />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea
                  className="form-control"
                  style={{ height: "40vh" }}
                  ref={descTxta}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div>
        <button
          className="btn btn-secdary float-start"
          onClick={() => {
            router.push("/notices");
          }}
        >
          <i className="bi bi-grid-3x3-gap me-1"></i>
          목록
        </button>
        <button
          className="btn btn-secondary float-end"
          onClick={() => {
            handleAddClick();
          }}
        >
          <i className="bi bi-check" />
          저장
        </button>
      </div>
    </section>
  );
};
