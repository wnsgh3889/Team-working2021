import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { requestAddContact } from "./ContactSaga";
import { ContactItem } from "./ContactSlice";

const ContactCreate = () => {
  const getTime = new Date().getTime();
  const contact = useSelector((state: RootState) => state.contact.data);
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const memoRef = useRef<HTMLTextAreaElement>(null);
  const isAddCompleted = useSelector((state : RootState) => state.contact.isAddCompleted);
  console.log(isAddCompleted);
  useEffect(()=>{
    isAddCompleted && history.push("/contacts")
  },[isAddCompleted, history])

 //객체를 만드는 방법 const name = {}
 // interface => 틀 
  const add = () => {
    const data: ContactItem = {
      id: contact.length > 0 ? contact[0].id + 1 : 1,
      name: nameRef.current ? nameRef.current?.value : "",
      phone: phoneRef.current ? phoneRef.current?.value : "",
      email: emailRef.current ? emailRef.current?.value : "",
      memo: memoRef.current ? memoRef.current?.value : "",
      createdTime: getTime.toLocaleString(),
    };
    dispatch(requestAddContact(data)); // redux-saga, dispatch(Action-creator(data))
    
  };

  return (
    <div style={{ width: "50vw" }} className="mx-auto">
      <h2 className="text-center">Contact Create</h2>{" "}
      <form>
        <table className="table">
          <tbody>
            <tr>
              <th>이름</th>
              <td>
                <input className="form-control" type="text" ref={nameRef} />
              </td>
            </tr>
            <tr>
              <th>전화번호</th>
              <td>
                <input className="form-control" type="text" ref={phoneRef} />
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input className="form-control" type="text" ref={emailRef} />
              </td>
            </tr>
            <tr>
              <th>메모</th>
              <td>
                <textarea
                  className="form-control"
                  style={{ height: "40vh" }}
                  ref={memoRef}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div className="d-flex justify-content-between">
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
            add();
          }}
        >
          <i className="bi bi-check" />
          저장
        </button>
      </div>
    </div>
  );
};

export default ContactCreate;