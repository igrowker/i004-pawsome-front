import { useEffect } from "react";

export function Spinner() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes flameText {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-64">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primaryLight"></div>
        <div
          className="absolute top-1/3 left-2 transform -translate-x-1/2 -translate-y-1/2 text-primaryDark text-xs"
          style={{
            animation: "flameText 2s ease-in-out infinite",
            willChange: "transform",
          }}
        >
          Pawsome
        </div>
      </div>
    </div>
  );
}
