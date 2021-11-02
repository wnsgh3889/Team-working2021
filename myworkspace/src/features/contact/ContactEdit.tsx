import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
// import { modifyContactMemo } from "./ContactMemoSlice";
import { requestModifyContact } from "./ContactSaga";

const ContactEdit = () => {
  const { id } = useParams<{ id: string }>();
  const contact = useSelector((state: RootState) =>
    state.contact.data.find((item) => item.id === +id)
  );

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const mailRef = useRef<HTMLInputElement>(null);
  const memoRef = useRef<HTMLTextAreaElement>(null);

  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const handleSave = () => {
    if (contact) {
      const item = { ...contact };
      item.id = +id;
      item.name = nameRef.current ? nameRef.current.value : "";
      item.phone = phoneRef.current ? phoneRef.current.value : "";
      item.email = mailRef.current ? mailRef.current.value : "";
      item.memo = memoRef.current ? memoRef.current.value : "";

      history.push("/contacts");
      // dispatch(modifyContactMemo(item));
      dispatch(requestModifyContact(item));
    }
  };

  return (
    <div style={{ width: "40vw" }} className="d-flex mx-auto flex-column my-3">
      <h2 className="text-center">Contact Edit</h2>
      <form>
        <table className="table ">
          <tbody>
            <tr>
              <th>이름</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={contact?.name}
                  ref={nameRef}
                />
              </td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={contact?.phone}
                  ref={phoneRef}
                />
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={contact?.email}
                  ref={mailRef}
                />
              </td>
            </tr>
            <tr>
              <th style={{ width: "80px" }}>메모</th>
              <td style={{ width: "450px" }}>
                <textarea
                  className="form-control"
                  style={{ height: "40vh" }}
                  defaultValue={contact?.memo}
                  ref={memoRef}
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
            history.push("/contacts");
          }}
        >
          <i className="bi bi-grid-3x3-gap me-1"></i>
          목록
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            handleSave();
          }}
        >
          <i className="bi bi-check" />
          저장
        </button>
      </div>
    </div>
  );
};

export default ContactEdit;