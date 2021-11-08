import type { NextPage } from 'next'
import { ReactChild, ReactFragment, ReactPortal } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Router, useRouter} from 'next/router'

interface noticeItemState {
  postNumber: number;
  mainTitle: string;
  postingDate: string;  
}

const notice = () => {
  const notice = useSelector((state: RootState) => state.contact);
  const router = useRouter();

const Home: NextPage = () => {
  return (
    <div>
      <table className="table table-striped" style={{width: "800px"}}>
  <thead>
    <tr>
      <th style={{ width: "10%" }}scope="col">no.</th>
      <th style={{ width: "65%" }}scope="col">제목</th>
      <th style={{ width: "25%" }}scope="col">날짜</th>
    </tr>
  </thead>
  <tbody>
            {notice.data.map((item: { id: string; postNumber: number | ReactChild | ReactFragment | ReactPortal | null | undefined; mainTitle: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; postingDate: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; createdTime: any; }, index: number) => (
              <tr
                key={`contact-tr-${index}`}
                onClick={() => {
                  useRouter(`/notice/noticedetail/${item.id}`);
                }}
                style={{ cursor: "pointer" }}
              >
                <th scope="row">{notice.data.length - index}</th>
                <td>{item.postNumber}</td>
                <td>{item.mainTitle}</td>
                <td>{item.postingDate}</td>
                <td>{getTimeString(item.createdTime)}</td>
              </tr>
            ))}
  </tbody>
</table>
    </div>
  )
              }
            }

function getTimeString(createdTime: any): import("react").ReactNode {
  throw new Error('Function not implemented.');
}
function useHistory() {
  throw new Error('Function not implemented.');
}

