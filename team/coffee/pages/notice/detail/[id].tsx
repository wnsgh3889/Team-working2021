import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../provider";

const NoticeDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const id = router.query.id as string;
  console.log(id);
  let photoItem = useSelector((state: RootState) =>
    state.photo.data.find((item: { id: number }) => item.id === +id)
  );
};
