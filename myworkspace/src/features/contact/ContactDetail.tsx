import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { requestRemoveContact } from "./ContactSaga";

const ContactDetail = () => {
    const { id } = useParams<{ id: string }>();
    const contactMemo = useSelector((state: RootState) =>
      state.contact.data.find((item) => item.id === +id)
    );
  
    const history = useHistory();
    const dispatch = useDispatch<AppDispatch>();

    const handleRemove = () => {
      dispatch(requestRemoveContact(+id));
      history.push("/contacts");
    };
  
    return (
      <div style={{ width: "40vw" }} className="d-flex mx-auto flex-column my-3">
        <h2 className="text-center">contact Memo Detail</h2>
        <table className="table my-5">
          <tbody>
            <tr>
              <th>이름</th>
              <td>{contactMemo?.name}</td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>{contactMemo?.phone}</td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>{contactMemo?.email}</td>
            </tr>
            <tr>
              <th style={{ width: "80px" }}>메모</th>
              <td>{contactMemo?.memo}</td>
            </tr>
          </tbody>
        </table>
  
        <div className="d-flex">
          <div style={{ width: "50%" }}>
            <button
              className="btn btn-secondary me-1"
              onClick={() => {
                history.push("/contacts");
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
                history.push(`/contacts/edit/${id}`);
              }}
            >
              <i className="bi bi-pencil me-1" />
              수정
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                handleRemove();
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

export default ContactDetail;