import React from "react";

export default function Board({ letters, colors }) {
  return (
    <>
      {Array.from({ length: 6 }).map((_, r) => (
        <div key={r} className={`game_row row${r}`}>
          {/* نفس HTML عندك: letter4 ... letter0 */}
          {[4, 3, 2, 1, 0].map((colFromRight) => {
            const i = 4 - colFromRight; // 0..4 (منطقنا)
            const value = letters?.[r]?.[i] || "";
            const bg = colors?.[r]?.[i] || null;

            return (
              <input
                key={colFromRight}
                id={`row${r}_letter${colFromRight}`}
                type="text"
                maxLength={1}
                autoComplete="off"
                disabled
                value={value}
                style={{ backgroundColor: bg || "#ffffff" }}
                readOnly
              />
            );
          })}
        </div>
      ))}
    </>
  );
}
