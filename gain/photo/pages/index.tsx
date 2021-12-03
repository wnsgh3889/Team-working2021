import Layout from "../components/layout";

import { useRouter } from "next/router";

import Image from "next/image";
import axios from "axios";

interface PublicPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface IndexProp {
  photos: PublicPhoto[];
}

const Index = ({ photos }: IndexProp) => {
  const router = useRouter();

  return (
    <Layout>
      <section>
        <p>Public Photos</p>
        <div className="d-flex flex-wrap">
          {}
          {photos.map((item, index) => (
            <div
              key={`photo-item-${index}`}
              className="card"
              style={{
                width: "calc((100% - 3rem) / 4)",
                marginLeft: index % 4 === 0 ? "0" : "1rem",
                marginTop: index > 3 ? "1rem" : "0",
              }}
            >
              {}
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  router.push(`/public-photos/${item.id}`);
                }}
              >
                <Image
                  src={item.thumbnailUrl}
                  className="card-img-top"
                  alt={item.title}
                  layout="responsive"
                  objectFit="cover"
                  width={220}
                  height={150}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                </div>
              </div>
              {}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await axios.get<PublicPhoto[]>(
    "https://jsonplaceholder.typicode.com/photos?_start=0&_limit=50"
  );
  const photos = res.data;

  return { props: { photos } };
}

export default Index;
