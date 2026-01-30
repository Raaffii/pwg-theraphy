import { ProtectedRoute } from "../components/ProtectedRoute";
import { NotFoundPage } from "../components/ErrorPage";
import { PublicRoute } from "@/components/PublicRoute";
import LoginPage from "@/pages/LoginPage";
import Layout from "@/components/Layout";
import StepsLayout from "@/components/StepsLayout";
import DashboardPage from "@/pages/DashboardPage";
import ProfilePage from "@/pages/ProfilePage";
import CustomerRegistrationForm from "@/pages/form/personalData/CustomerRegistrationForm";
import CustomerConsentForm from "@/pages/form/consents/CustomerConsentForm";
import CustomerEvaluationForm from "@/pages/form/CustomerEvaluationForm";
import CustomerFeedbackForm from "@/pages/form/CustomerFeedbackForm";
import CustomerReview from "@/pages/form/CustomerReviewForm";
import CustomerSteps from "@/pages/CustomerSteps";
import SignupPage from "@/pages/SignupPage";
import TherapistDashboard from "@/pages/therapist/therapistDashboard/TherapistDashboard";
import Logout from "@/pages/auth/Logout";
import ConsentsList from "@/pages/therapist/ConsentsList";
import TherapistEvaluation from "@/pages/therapist/therapistEvaluation/TherapistEvaluation";
import EvaluationForm from "@/pages/form/evaluation/EvaluationForm";
import Pos from "@/pages/Pos/Pos";
import Invoice from "@/pages/Pos/Invoice";
import Receipt from "@/pages/Pos/Receipt";
import PrintReceipt from "@/pages/Pos/PrintReceipt";
import TransactionHistory from "@/pages/transactionhistory/TransactionHistory";
import PrintReceipt2 from "@/pages/Pos/PrintReceipt2";
import ProductsPage from "@/pages/productsPage";

const privateRoutes = {
  path: "/",
  element: (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <DashboardPage /> },
    { path: "dashboard", element: <CustomerSteps /> },
    { path: "profile", element: <ProfilePage /> },
  ],
};

const stepsRoutes = {
  path: "/steps",
  element: (
    <ProtectedRoute allowedRoles={["Customer"]}>
      <StepsLayout />
    </ProtectedRoute>
  ),
  children: [
    { path: "personal-data", element: <CustomerRegistrationForm /> },
    { path: "consent", element: <CustomerConsentForm /> },
    { path: "evaluation", element: <CustomerEvaluationForm /> },
    { path: "review", element: <CustomerReview /> },
    { path: "feedback", element: <CustomerFeedbackForm /> },
    { path: "evaluation/dev", element: <EvaluationForm /> },
  ],
};

const therapistRoutes = {
  path: "/therapist",
  element: (
    <ProtectedRoute allowedRoles={["Therapist"]}>
      <Layout />
    </ProtectedRoute>
  ),
  children: [
    { path: "", element: <TherapistDashboard /> },
    { path: "consentslist", element: <ConsentsList /> },
    { path: "product", element: <ProductsPage /> },
    { path: "pos/:id", element: <Pos /> },
    { path: "pos/", element: <Pos /> },
    { path: "invoice", element: <Invoice /> },
    { path: "receipt", element: <Receipt /> },
    { path: "printreceipt", element: <PrintReceipt /> },
    { path: "printreceipt2", element: <PrintReceipt2 /> },
    { path: "evaluation/:id", element: <TherapistEvaluation /> },
    { path: "transaction/:id", element: <TransactionHistory /> },
  ],
};

const publicRoutes = [
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignupPage />
      </PublicRoute>
    ),
  },
  {
    path: "/logout",
    element: (
      <PublicRoute>
        <Logout />
      </PublicRoute>
    ),
  },
];

export const routes = [
  ...publicRoutes,
  privateRoutes,
  stepsRoutes,
  therapistRoutes,
  { path: "*", element: <NotFoundPage /> },
];
