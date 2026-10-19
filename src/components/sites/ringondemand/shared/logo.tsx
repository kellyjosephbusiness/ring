/** RingOnDemand logo: the gradient call bars and "Ring On Demand" wordmark,
 * traced from the brand PNG (docs/research/ringondemand/brand/). "dark" has
 * black lettering for light backgrounds; "light" has white lettering for the
 * dark footer. "On" and the bars keep their gradients in both. */

const SRC = {
  dark: "/sites/ringondemand/brand/logo-black.svg",
  light: "/sites/ringondemand/brand/logo-white.svg",
} as const;

/** viewBox of the traced artwork. */
const WIDTH = 968;
const HEIGHT = 126;

interface LogoProps {
  variant: keyof typeof SRC;
  className?: string;
}

export function Logo({ variant, className }: LogoProps) {
  return (
    <img
      className={className}
      src={SRC[variant]}
      alt="RingOnDemand"
      width={WIDTH}
      height={HEIGHT}
      decoding="async"
    />
  );
}
