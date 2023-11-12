import MainLayout from "./MainLayout";
import withProtectedRoute from "./withProtectedRoute";

const ProtectedMainLayout = withProtectedRoute(MainLayout)

export {
  ProtectedMainLayout
}