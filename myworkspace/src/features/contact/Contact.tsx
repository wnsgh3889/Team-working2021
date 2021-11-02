import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { AppDispatch, RootState } from "../../store";
import { requestFetchContacts } from "./ContactSaga";


const Contact = () => {
  const contact = useSelector((state: RootState) => state.contact);
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!contact.isFetched) {
      dispatch(requestFetchContacts());
    }
  }, [dispatch, contact.isFetched]);

  return (
    <div style={{ width: "800px" }} className="mx-auto">
      <h2 className="text-center">Contect</h2>
      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn-primary"
          onClick={() => {
            history.push("/contacts/contactMemoCreate");
          }}
        >
          <i className="bi bi-plus" />
          추가
        </button>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th style={{ width: "5%" }} scope="col">
              #
            </th>
            <th style={{ width: "15%" }} scope="col">
              이름
            </th>
            <th style={{ width: "30%" }} scope="col">
              전화번호
            </th>
            <th style={{ width: "30%" }} scope="col">
              이메일
            </th>
            <th style={{ width: "20%" }} scope="col">
              작성일시
            </th>
          </tr>
        </thead>
        <tbody>
          {contact.data.map((item) => (
            <tr
              key={item.id}
              onClick={() => {
                history.push(`/contacts/detail/${item.id}`);
              }}
              style={{ cursor: "pointer" }}
            >
              <th scope="row">{item.id}</th>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.createdTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default Contact;