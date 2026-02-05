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
import TherapistDashboard from "@/pages/TherapistDashboard";
import Logout from "@/pages/auth/Logout";
import ConsentsList from "@/components/Therapist/ConsentsList";
import TherapistEvaluation from "@/pages/TherapistEvaluation";
import EvaluationForm from "@/pages/form/evaluation/EvaluationForm";
import PosPage from "@/pages/PosPage";
import Invoice from "@/components/InvoiceReceipt/Invoice";
import Receipt from "@/components/InvoiceReceipt/Receipt";
import PrintReceipt from "@/components/InvoiceReceipt/PrintReceipt";
import TransactionHistory from "@/pages/TransactionHistory";
import PrintReceipt2 from "@/components/InvoiceReceipt/PrintReceipt2";
import ProductsPage from "@/pages/productsPage";
import PatienTreatment from "@/pages/PatientTreatment";

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
    { path: "pos/:id", element: <PosPage /> },
    { path: "pos/", element: <PosPage /> },
    { path: "invoice", element: <Invoice /> },
    { path: "receipt", element: <Receipt /> },
    { path: "printreceipt", element: <PrintReceipt /> },
    { path: "printreceipt2", element: <PrintReceipt2 /> },
    { path: "evaluation/:id", element: <TherapistEvaluation /> },
    { path: "treatment/:id", element: <PatienTreatment /> },
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
