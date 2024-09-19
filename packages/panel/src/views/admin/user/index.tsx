import KycCard from "../profile/components/KycCard";
import KycDcouments from "../profile/components/KycDcouments";
import Upload from "../profile/components/Upload";
import UserCard from "../profile/components/UserCard";
import { useUserDetailsLoaderData } from "./loader";
import FormCard from "./components/FormCard";

export default function UserDetailsView() {
  const { user } = useUserDetailsLoaderData();

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-7 flex flex-col gap-5 lg:grid lg:grid-cols-7">
          <div className="col-span-4">
            <UserCard data={user} />
          </div>

          <div className="col-span-3">
            <KycCard />
          </div>

          <div className="col-span-7">
            <FormCard uid={user.uid} />
          </div>
        </div>
        {/* all project & ... */}
        <div className="col-span-5 flex flex-col gap-5 lg:grid lg:grid-cols-1">
          <Upload />
          <KycDcouments />
        </div>

        {/* <div className="col-span-5 lg:col-span-12">
          <Notification />
        </div> */}
      </div>
    </div>
  );
}
