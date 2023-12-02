import { useEffect, useRef, useState } from "react";

const CURSOR_SPEED = 0.08;
const HOVER_SCALE = 1.5; // 커서가 커지는 비율

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

export const Cursor = () => {
  const cursorOutline = useRef();
  const [hoverButton, setHoverButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const animate = () => {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;

    outlineX = outlineX + distX * CURSOR_SPEED;
    outlineY = outlineY + distY * CURSOR_SPEED;

    cursorOutline.current.style.left = `${outlineX}px`;
    cursorOutline.current.style.top = `${outlineY}px`;
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const mouseEventsListener = document.addEventListener(
      "mousemove",
      function (event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
      }
    );
    const animateEvent = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove", mouseEventsListener);
      cancelAnimationFrame(animateEvent);
    };
  }, []);

  useEffect(() => {
    const mouseEventListener = document.addEventListener(
      "mouseover",
      function (e) {
        if (
          e.target.tagName.toLowerCase() === "button" ||
          e.target.parentElement.tagName.toLowerCase() === "button" ||
          e.target.tagName.toLowerCase() === "input" ||
          e.target.tagName.toLowerCase() === "textarea"
        ) {
          setIsHovered(true);
        } else {
          setIsHovered(false);
        }
      }
    );
    return () => {
      document.removeEventListener("mouseover", mouseEventListener);
    };
  }, []);

  return (
    <>
      <div
        className={`z-50 fixed -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform`}
        ref={cursorOutline}
        style={{
          width: "32px",
          height: "32px",
          cursor: "none",
          background: `url('data:image/svg+xml,${encodeURIComponent(
            isHovered
              ? '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="purple" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.01 18.18 21.02 12 17.77 5.82 21.02 7 14.01 2 9.27 8.91 8.26 12 2"/></svg>'
              : '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="purple"><polygon points="12 2 15.09 8.26 22 9.27 17 14.01 18.18 21.02 12 17.77 5.82 21.02 7 14.01 2 9.27 8.91 8.26 12 2"/></svg>'
          )}') center no-repeat`,
          transform: `scale(${isHovered ? HOVER_SCALE : 1})`, // 커서 크기 조절
        }}
      ></div>
    </>
  );
};
