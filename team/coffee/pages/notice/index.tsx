import { useRouter } from "next/dist/client/router";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../provider";

const getTimeString = (unixtime: number) => {
  const day = 24 * 60 * 60 * 1000;

  const dateTime = new Date(unixtime);

  return unixtime - new Date().getTime() >= day
    ? dateTime.toLocaleDateString()
    : dateTime.toLocaleTimeString();
};

const notice = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const add = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (e) {
      if (e.code !== "Enter") return;
    }
  };
};
interface NoticeItemstate {
  id: number;
  mainTitle: String;
  createTime: number;
  text: String;
}

const createTime = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};

const Notice = () => {
  return (
    <div style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center">Notice</h2>
      <div className="d-flex justify-content-end mb-2">
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
              <th scope="row">2</th>
              <td>이벤트 관련 공지사항</td>
              <td>2021.11.11</td>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>별별다방 관련 공지사항</td>
              <td>2021.11.11</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="btn btn-primary text-nowrap"
        onClick={() => {
          add();
        }}
      >
        입력
      </button>
    </div>
  );
};

export default Notice;

function add() {
  throw new Error("Function not implemented.");
}
