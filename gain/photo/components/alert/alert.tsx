import { useEffect, useRef } from "react";

interface AlertProp {
  message: string;
  variant: string;
  onClose?: () => void;
}

const Alert = ({ message, variant, onClose }: AlertProp) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      let count = 1;
      setInterval(() => {
        if (containerRef.current) {
          containerRef.current.style.opacity = `${(20 - count) / 20}`;
          count++;
        }
      }, 50);
    }, 1000);

    setTimeout(() => {
      onClose && onClose();
    }, 2000);
  }, [onClose]);

  return (
    <>
      <div
        ref={containerRef}
        className={`alert alert-${variant} alert-dismissible my-2`}
        role="alert"
      >
        {message}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </>
  );
};

export default Alert;
