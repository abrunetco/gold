import { Media } from "@gold/api";
import client from "api/client";
import { useEffect, useMemo, useRef, useState } from "react";

interface MediaImgProps1 {
  media: Media;
}

interface MediaImgProps2 {
  uid: string;
}

export function MediaImg(props: MediaImgProps1 | MediaImgProps2) {
  const [blobUrl, setBlobUrl] = useState<string | undefined>();
  const [, setLoading] = useState(false);
  const uid = useMemo(() => {
    return "uid" in props ? props.uid : props.media?.uid;
  }, [props]);

  const prevUid = useRef<string>();

  useEffect(() => {
    if (uid === prevUid.current) return;
    prevUid.current = uid;

    const src = "/api/media/" + uid;
    setLoading(true);
    client.authentication
      .getAccessToken()
      .then((accessToken) => {
        const options = {
          headers: {
            Accept: "image/*",
            Authorization: `Bearer ${accessToken}`,
          },
        };
        return fetch(src, options);
      })
      .then((res) => res.blob())
      .then((blob) => {
        setBlobUrl(URL.createObjectURL(blob));
      })
      .finally(() => setLoading(false));
  }, [uid]);

  return blobUrl ? (
    <img src={blobUrl} alt="" />
  ) : (
    <img
      width={100}
      height={100}
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM89xMAApsByVMAyYoAAAAASUVORK5CYII="
      alt=""
    />
  );
}
