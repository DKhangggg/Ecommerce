import React from "react";

const Card: React.FC = () => {
  return (
    <div className="relative w-[240px] h-[154px] text-white">
      <div className="absolute inset-0 rounded-lg shadow-lg bg-[#171717] overflow-hidden">
        {/* chip */}
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <svg
            width={30}
            height={30}
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="20" fill="#ccc" />
          </svg>
        </div>

        {/* logo (right) */}
        <div style={{ position: "absolute", top: 24, right: 16 }}>
          <svg
            width={36}
            height={36}
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ff9800"
              d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
            />
            <path
              fill="#d50000"
              d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
            />
            <path
              fill="#ff3d00"
              d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
            />
          </svg>
        </div>

        {/* card number */}
        <p className="absolute left-4 bottom-20 font-bold text-sm">
          9759 2484 5269 6576
        </p>

        {/* valid thru and date */}
        <div className="absolute left-4 bottom-12 text-xs">
          <div className="font-bold">VALID THRU</div>
          <div className="font-bold">12/24</div>
        </div>

        {/* name */}
        <p className="absolute left-4 bottom-4 font-bold text-sm">
          BRUCE WAYNE
        </p>
      </div>
    </div>
  );
};

export default Card;
