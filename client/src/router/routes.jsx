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
    { path: "evaluation/:id", element: <TherapistEvaluation /> },
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

export const routes = [...publicRoutes, privateRoutes, stepsRoutes, therapistRoutes, { path: "*", element: <NotFoundPage /> }];
