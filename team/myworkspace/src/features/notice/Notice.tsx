import { useEffect } from "";
import { useDispatch, useSelector } from "";
import { useHistory } from "";
import { AppDispatch, RootState } from "../../";
import { requestFetchContacts } from "./";


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
      <h2 className="text-center">공지사항</h2>
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
            <th style={{ width: "15%" }} scope="col">
              no.
            </th>
            <th style={{ width: "65%" }} scope="col">
              제목
            </th>
            <th style={{ width: "20%" }} scope="col">
              날짜
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