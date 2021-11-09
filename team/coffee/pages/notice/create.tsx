import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";

const NoticeCreate = () => {
  const getTime = new Date().getTime();
  const noticeData = useSelector((state: RootState) => state.notie.data);
  const isAddCompleted = useSelector(
    (state: RootState) => state.notice.isAddCompleted
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
};

export { NoticeCreate };
