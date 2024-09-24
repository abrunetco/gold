import { useUppyState, DashboardModal } from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/webcam/dist/style.min.css";
import "@uppy/image-editor/dist/style.min.css";
import { UppyOptions, useUppy } from "hooks/uppy";
import { Media, mediaPath } from "@gold/api";
import { useCallback, useState } from "react";

const data: Media[] = [
  {
    encoding: "7bit",
    mimetype: "image/webp",
    destination: "/files/1727096647846-3a503900",
    filename: "canvas_by_roytanck.webp",
    path: "/files/1727096647846-3a503900/canvas_by_roytanck.webp",
    size: 4926,
    meta: {
      user: "sss",
      relativePath: "null",
    },
    refs: [],
    uid: "1727096647846-3a503900-canvas_by_roytanck.jpg",
    createdAt: 1727096647862,
    createdBy: "e139584c",
    height: 576,
    ratio: 1.7777777777777777,
    unboarded: "done",
    updatedAt: 1727096648042,
    width: 1024,
    _typename: "media",
    readonly: false,
  },
];

export default function UppyTestView() {
  const [props] = useState<UppyOptions>({
    meta: { isProtected: true },
    // autoProceed: true,
    restrictions: {
      maxNumberOfFiles: 1,
      minNumberOfFiles: 1,
      maxFileSize: 2 * 1024 * 1024,
      maxTotalFileSize: 2 * 1024 * 1024,
    },
    // store,
  });
  const uppy = useUppy(props);
  const medias = useUppyState(uppy, (state) =>
    Object.values(state.files)
      .map((file) => file?.response?.body)
      .filter((file): file is Media => file?._typename === mediaPath)
      .map((media) => media.uid),
  );
  const doneButtonHandler = useCallback(() => {
    console.log("doneButtonHandler", medias);
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <DashboardModal
          open
          uppy={uppy}
          showRemoveButtonAfterComplete
          doneButtonHandler={doneButtonHandler}
          proudlyDisplayPoweredByUppy={false}
        />
        {/* {data.map((d) => (
          <MediaImg key={d.uid} uid={d.uid} />
        ))} */}
      </div>
    </div>
  );
}
