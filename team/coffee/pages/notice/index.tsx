import { nanoid } from "@reduxjs/toolkit";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";

const Notice = () => {
  const notice = useSelector((state: RootState) => state.notice);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!getSessionId()) {
      dispatch(
        addAlert({
          id: nanoid(),
          variant: "danger",
          message: 
        })
      )
    }
  })
  const handlePageChanged = (page: number) => {
    console.log("--page: " + page);
    // setCurrentPage(page); 
    dispatch(
      requestFetchPagingNotices({
        page,
        size: notice.pageSize,
      })
    );
  };

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
              <th scope="row">{}</th>
              <td>{}</td>
              <td>{}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="btn btn-primary text-nowrap"
        onClick={() => {}}
      >
        입력
      </button>
    </div>
  );
};

export default Notice;
