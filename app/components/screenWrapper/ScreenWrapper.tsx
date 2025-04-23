import { useEffect, useState } from "react";

export function ScreenWrapper({ children }: { children: React.ReactNode }) {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    window.addEventListener("orientationchange", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
      window.removeEventListener("orientationchange", updateHeight);
    };
  }, []);

  return (
    <div
      className="screen"
      style={{ height: height ? `${height}px` : "100dvh" }}
    >
      {children}
    </div>
  );
}
