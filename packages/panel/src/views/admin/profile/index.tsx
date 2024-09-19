import UserCard from "./components/UserCard";
import Upload from "./components/Upload";
import { useAuth } from "hooks/auth";
import ProfileForm from "./components/ProfileForm";
import KycCard from "./components/KycCard";
import KycDcouments from "./components/KycDcouments";

const ProfileView = () => {
  const auth = useAuth();
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 flex flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-7 flex flex-col gap-5 lg:grid lg:grid-cols-7">
          <div className="col-span-4">
            <UserCard data={auth.user} />
          </div>

          <div className="col-span-3">
            <KycCard />
          </div>

          <div className="col-span-7">
            <ProfileForm />
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
};

export default ProfileView;
