import type { TileIcon } from "./site-header.data";

interface IconProps {
  className?: string;
}

/* Remix-style 24px glyphs the source renders as CSS masks; here they are
   inline SVGs painted with currentColor so colour transitions still work. */

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M 5.728 4.455 L 10.183 0 L 11.455 1.273 L 5.728 7 L 0 1.273 L 1.273 0 Z"
        transform="translate(6.274 8.498)"
        fill="currentColor"
      />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M 11.36 4.976 L 6.384 9.952 L 4.4 9.952 L 8.56 5.776 L 0 5.776 L 0 4.16 L 8.576 4.16 L 4.416 0 L 6.4 0 Z"
        transform="translate(6.3 7)"
        fill="currentColor"
      />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M 4 8 L 20 8 M 4 16 L 20 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M 18 6 L 6 18 M 6 6 L 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarGlyph() {
  return (
    <path
      d="M 13.5 1.8 L 17.1 1.8 C 17.339 1.8 17.568 1.895 17.736 2.064 C 17.905 2.232 18 2.461 18 2.7 L 18 17.1 C 18 17.339 17.905 17.568 17.736 17.736 C 17.568 17.905 17.339 18 17.1 18 L 0.9 18 C 0.661 18 0.432 17.905 0.264 17.736 C 0.095 17.568 0 17.339 0 17.1 L 0 2.7 C 0 2.461 0.095 2.232 0.264 2.064 C 0.432 1.895 0.661 1.8 0.9 1.8 L 4.5 1.8 L 4.5 0 L 6.3 0 L 6.3 1.8 L 11.7 1.8 L 11.7 0 L 13.5 0 Z M 1.8 7.2 L 1.8 16.2 L 16.2 16.2 L 16.2 7.2 Z M 3.6 9 L 5.4 9 L 5.4 10.8 L 3.6 10.8 Z M 3.6 12.6 L 5.4 12.6 L 5.4 14.4 L 3.6 14.4 Z M 7.2 9 L 14.4 9 L 14.4 10.8 L 7.2 10.8 Z M 7.2 12.6 L 11.7 12.6 L 11.7 14.4 L 7.2 14.4 Z"
      transform="translate(3 3)"
      fill="currentColor"
    />
  );
}

function ChatGlyph() {
  return (
    <path
      d="M 3.849 11.232 L 0 14.256 L 0 0.864 C 0 0.635 0.091 0.415 0.253 0.253 C 0.415 0.091 0.635 0 0.864 0 L 13.824 0 C 14.053 0 14.273 0.091 14.435 0.253 C 14.597 0.415 14.688 0.635 14.688 0.864 L 14.688 11.232 Z M 3.251 9.504 L 12.96 9.504 L 12.96 1.728 L 1.728 1.728 L 1.728 10.701 Z M 6.048 12.96 L 14.893 12.96 L 16.416 14.157 L 16.416 5.184 L 17.28 5.184 C 17.509 5.184 17.729 5.275 17.891 5.437 C 18.053 5.599 18.144 5.819 18.144 6.048 L 18.144 17.712 L 14.295 14.688 L 6.912 14.688 C 6.683 14.688 6.463 14.597 6.301 14.435 C 6.139 14.273 6.048 14.053 6.048 13.824 Z"
      transform="translate(2.339 3.233)"
      fill="currentColor"
    />
  );
}

function BarChartGlyph() {
  return (
    <path
      d="M 0.9 0 L 17.1 0 C 17.339 0 17.568 0.095 17.736 0.264 C 17.905 0.432 18 0.661 18 0.9 L 18 15.3 C 18 15.539 17.905 15.768 17.736 15.936 C 17.568 16.105 17.339 16.2 17.1 16.2 L 0.9 16.2 C 0.661 16.2 0.432 16.105 0.264 15.936 C 0.095 15.768 0 15.539 0 15.3 L 0 0.9 C 0 0.661 0.095 0.432 0.264 0.264 C 0.432 0.095 0.661 0 0.9 0 Z M 1.8 1.8 L 1.8 14.4 L 16.2 14.4 L 16.2 1.8 Z M 4.5 9 L 6.3 9 L 6.3 12.6 L 4.5 12.6 Z M 8.1 3.6 L 9.9 3.6 L 9.9 12.6 L 8.1 12.6 Z M 11.7 6.3 L 13.5 6.3 L 13.5 12.6 L 11.7 12.6 Z"
      transform="translate(3 3.898)"
      fill="currentColor"
    />
  );
}

function LineChartGlyph() {
  return (
    <path
      d="M 1.728 0 L 1.728 13.824 L 15.552 13.824 L 15.552 15.552 L 0 15.552 L 0 0 Z M 14.941 2.845 L 16.163 4.067 L 11.232 8.998 L 8.64 6.407 L 4.931 10.115 L 3.709 8.893 L 8.64 3.962 L 11.232 6.553 L 14.941 2.845 Z"
      transform="translate(3.972 4.223)"
      fill="currentColor"
    />
  );
}

/* The Credit Score tile ships a multicolour gauge image that keeps its own
   colours when the tile is hovered. */
function CreditGlyph() {
  return (
    <g transform="translate(3 4.48)">
      <path
        d="M 0.307 11.329 C -0.702 7.563 0.829 3.575 4.099 1.452 C 7.369 -0.672 11.634 -0.448 14.664 2.006 C 17.694 4.459 18.799 8.585 17.402 12.225 L 14.041 10.935 C 14.88 8.751 14.217 6.274 12.399 4.801 C 10.581 3.329 8.021 3.194 6.058 4.469 C 4.096 5.744 3.178 8.137 3.784 10.397 Z"
        fill="rgb(225, 239, 254)"
      />
      <path
        d="M 0.103 2.483 C 0.034 2.412 -0.003 2.316 0 2.217 C 0.004 2.118 0.048 2.024 0.122 1.959 C 1.196 1.023 2.476 0.355 3.857 0.01 C 3.954 -0.013 4.056 0.004 4.139 0.058 C 4.223 0.112 4.28 0.198 4.299 0.295 L 4.873 3.086 C 4.912 3.29 4.786 3.489 4.585 3.542 C 3.859 3.744 3.184 4.096 2.602 4.575 C 2.445 4.71 2.21 4.699 2.064 4.552 Z"
        transform="translate(3 0.375)"
        fill="rgb(255, 138, 76)"
      />
      <path
        d="M 0.004 0.449 C -0.01 0.351 0.016 0.251 0.078 0.173 C 0.139 0.095 0.229 0.046 0.328 0.036 C 1.718 -0.089 3.119 0.111 4.419 0.62 C 4.611 0.695 4.697 0.918 4.614 1.108 L 3.463 3.714 C 3.376 3.902 3.158 3.992 2.964 3.918 C 2.271 3.669 1.534 3.563 0.799 3.609 C 0.593 3.625 0.408 3.479 0.377 3.274 L 0.003 0.448 Z"
        transform="translate(7.874 0)"
        fill="rgb(227, 160, 8)"
      />
      <path
        d="M 1.437 0.189 C 1.484 0.102 1.565 0.039 1.66 0.013 C 1.756 -0.013 1.858 0.001 1.943 0.052 C 3.099 0.763 4.08 1.726 4.812 2.869 C 4.865 2.953 4.881 3.055 4.857 3.151 C 4.832 3.247 4.77 3.329 4.683 3.378 L 2.221 4.813 C 2.04 4.914 1.812 4.858 1.698 4.685 C 1.296 4.095 0.782 3.59 0.185 3.2 C 0.009 3.089 -0.051 2.861 0.047 2.678 Z"
        transform="translate(11.624 1.5)"
        fill="rgb(6, 148, 162)"
      />
      <path
        d="M 3.594 0.038 C 3.683 -0.006 3.786 -0.012 3.879 0.022 C 3.972 0.055 4.048 0.126 4.088 0.216 C 5.416 3.307 4.909 6.879 2.775 9.479 C 2.712 9.555 2.62 9.601 2.522 9.608 C 2.423 9.615 2.326 9.581 2.253 9.514 L 0.127 7.616 C -0.025 7.475 -0.043 7.24 0.087 7.078 C 1.258 5.568 1.543 3.552 0.838 1.776 C 0.758 1.585 0.84 1.364 1.025 1.271 Z"
        transform="translate(13.124 5.25)"
        fill="rgb(14, 159, 110)"
      />
      <path
        d="M 2.63 11.698 C 2.558 11.766 2.461 11.801 2.362 11.795 C 2.263 11.79 2.17 11.744 2.106 11.668 C -0.692 8.334 -0.703 3.475 2.08 0.129 C 2.144 0.053 2.236 0.007 2.335 0.001 C 2.434 -0.005 2.531 0.03 2.604 0.097 L 4.717 2.009 C 4.871 2.148 4.882 2.384 4.753 2.547 C 3.209 4.512 3.216 7.28 4.768 9.238 C 4.9 9.399 4.885 9.634 4.735 9.777 Z"
        transform="translate(0 3)"
        fill="rgb(240, 82, 82)"
      />
      <path
        d="M 3.637 1.875 C 3.484 1.442 3.084 1.145 2.625 1.125 L 1.125 1.125 C 0.504 1.125 0 1.629 0 2.25 C 0 2.871 0.504 3.375 1.125 3.375 L 2.625 3.375 C 3.246 3.375 3.75 3.878 3.75 4.5 C 3.75 5.121 3.246 5.625 2.625 5.625 L 1.125 5.625 C 0.666 5.605 0.265 5.308 0.112 4.875 M 1.875 0 L 1.875 1.125 M 1.875 5.625 L 1.875 6.75"
        transform="translate(7.125 6.375)"
        fill="none"
        stroke="rgb(107, 114, 128)"
        strokeWidth="0.84"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

const GLYPHS: Record<TileIcon, () => React.JSX.Element> = {
  calendar: CalendarGlyph,
  chat: ChatGlyph,
  barChart: BarChartGlyph,
  lineChart: LineChartGlyph,
  credit: CreditGlyph,
};

export function TileGlyph({ icon, className }: IconProps & { icon: TileIcon }) {
  const Glyph = GLYPHS[icon];
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <Glyph />
    </svg>
  );
}
