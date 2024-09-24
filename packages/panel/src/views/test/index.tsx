// import SignInForm from "components/forms/SignIn";
import { BrandError } from "components/brand/errors";
import Card from "components/card";
import TestForm from "components/forms/Test";
import UppyTestView from "components/uppy";
import UppyProvider from "providers/uppy";
import { NavLink, Route, Routes } from "react-router-dom";

const mes =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae consequatur hic earum exercitationem, quasi dolor qui saepe debitis unde placeat iusto illum animi, consectetur id facere at, praesentium officia magnam.";

export function MyTest() {
  return (
    <Card className="mx-4 h-full p-4">
      <BrandError name="خطایی رخ داد" code={800} message={mes} stack={mes} />
    </Card>
  );
}

export default function TestView() {
  return (
    <UppyProvider>
      <div className="grid h-[100vh] w-full grid-rows-[80px_auto_1px] gap-4">
        <div className="sticky top-0 z-10 flex w-full justify-center gap-2 bg-white py-2 shadow-lg">
          <NavLink className="box-border border p-5" to="/admin">
            back
          </NavLink>
          <NavLink className="box-border border p-5" to="/test">
            Test
          </NavLink>
          <NavLink className="border p-5" to="/test/form">
            Form
          </NavLink>
          <NavLink className="border p-5" to="/test/uppy">
            Uppy
          </NavLink>
        </div>
        <Routes>
          <Route path="" Component={MyTest} />
          <Route path="form" Component={TestForm} />
          <Route path="uppy" Component={UppyTestView} />
          <Route path="*" element={"TestForm"} />
        </Routes>
        <div></div>
      </div>
    </UppyProvider>
  );
}
