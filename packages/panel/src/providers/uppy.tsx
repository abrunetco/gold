import { Uppy } from "@uppy/core";
import Webcam from "@uppy/webcam";
import XHR from "@uppy/xhr-upload";
import client from "api/client";
import { createContext, PropsWithChildren } from "react";

import Persian from "@uppy/locales/lib/fa_IR";
import { Media } from "@gold/api";
import ImageEditor from "@uppy/image-editor";
// import ImageEditor from "@uppy/image-editor/lib/ImageEditor";

export type UppyMeta = {
  isProtected?: boolean;
};

const uppy = new Uppy<UppyMeta, Media>({ locale: Persian })
  .use(Webcam)
  .use(ImageEditor)
  .use(XHR, {
    endpoint: "/api/media",
    shouldRetry: () => false,
    async onBeforeRequest(xhr) {
      const accessToken = await client.authentication.getAccessToken();
      if (!accessToken) throw new Error("not authenticated");

      xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
    },
  });

export const UppyContext = createContext<Uppy<UppyMeta, Media>>(
  undefined as Uppy<UppyMeta, Media>,
);

export default function UppyProvider({ children }: PropsWithChildren) {
  return <UppyContext.Provider value={uppy}>{children}</UppyContext.Provider>;
}
