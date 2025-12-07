import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { logger } from "@/lib/logger";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    logger.error("404 Error: User attempted to access non-existent route:", location.pathname);

    // Smart redirect: if the path looks like a single slug (e.g., /john-doe), try the card route
    const trimmed = location.pathname.replace(/^\/+|\/+$/g, "");
    const isSingleSegment = trimmed.length > 0 && !trimmed.includes("/");
    const reserved = new Set(["", "styles", "request", "preview", "card"]);

    if (isSingleSegment && !reserved.has(trimmed)) {
      // Redirect to legacy route which is guaranteed to work
      navigate(`/${trimmed}`, { replace: true });

      // Fallback hard redirect in case SPA navigation is blocked by hosting configuration
      setTimeout(() => {
        const current = window.location.pathname.replace(/^\/+|\/+$/g, "");
        if (current === trimmed) {
          window.location.replace(`/${trimmed}`);
        }
      }, 50);
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <Link to="/" className="text-blue-500 underline hover:text-blue-700">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
