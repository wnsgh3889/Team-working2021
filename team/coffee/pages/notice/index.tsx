import { iteratorSymbol } from "immer/dist/internal";
import { Router } from "next/dist/client/router";
import { NavItem } from "react-bootstrap";

interface NoticeItemstate {
  id: number;
  mainTitle: String;
  createTime: number;
}
const Notice = () => {
  return (
    <div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" style={{ width: "10%" }}>
                no.
              </th>
              <th scope="col" style={{ width: "65%" }}>
                제목
              </th>
              <th scope="col" style={{ width: "25%" }}>
                날짜
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{}</th>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Notice;
