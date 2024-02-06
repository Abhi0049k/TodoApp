import { Routes, Route } from "react-router-dom";
import { FC, Suspense, lazy } from "react";
import Loading from "components/Loading";
import { Action } from "shared/types";
import Size from "components/Size";

const Home = lazy(() => import("pages/Home"));
const Authentication = lazy(() => import("pages/Authentication"))
const PageNotFound = lazy(() => import("pages/PageNotFound"))
const ProtectedRoute = lazy(() => import("components/ProtectedRoute"))

const Router: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Suspense fallback={<Size><Loading /></Size>}><ProtectedRoute><Home /></ProtectedRoute></Suspense>} />
            <Route path="/home" element={<Suspense fallback={<Size><Loading /></Size>}><><Home /></></Suspense>} />
            <Route path="/login" element={<Suspense fallback={<Size><Loading /></Size>}><Authentication action={Action.signin} /></Suspense>} />
            <Route path="/register" element={<Suspense fallback={<Size><Loading /></Size>}><Authentication action={Action.signup} /></Suspense>} />
            <Route path="/*" element={<Suspense fallback={<Size><Loading /></Size>}><PageNotFound /></Suspense>} />
        </Routes>
    )
}

export default Router;