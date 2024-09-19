interface KycCircleCheck {
  progress?: number;
  accepted?: boolean;
}
export default function KycCircleCheck({ accepted, progress }: KycCircleCheck) {
  const isFull = progress >= 100;
  const safeValue = Math.max(10, Math.min(100, progress));
  const offset = 44 - (safeValue / 100) * -44;
  const hue = (progress / 100) * 128;
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 16 16"
      height="120"
      width="120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14 8 15"
        strokeWidth="0.8"
        fill="none"
        stroke="#ddd"
      />
      <path
        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14 8 15"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        stroke={`hsl(${hue}deg 100% 40.63%)`}
        style={{
          strokeDasharray: 44,
          strokeDashoffset: offset,
          transition: "stroke-dashoffset 1s",
        }}
      />
      <path
        fill={isFull && accepted ? "#28b336" : "#aaa"}
        d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"
        className="transition-all duration-1000"
      />
    </svg>
  );
}
