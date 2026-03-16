import ResponsiveImage from "@/components/responsive-image"
import ProcessSteps from "@/components/process-steps"

export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Subtle background texture */}
      <div className="absolute inset-0">
        <ResponsiveImage
          baseName="process-hero"
          dir="/images"
          preset="hero"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.06]"
          sizes="(max-width: 1920px) 100vw, 1920px"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/40 via-transparent to-background/40" />
        <div
          className="absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-primary/6 to-transparent"
          style={{ animation: "process-sweep 12s ease-in-out infinite" }}
        />
        <style>{`@keyframes process-sweep{0%,100%{transform:translateX(-100%)}50%{transform:translateX(400%)}}`}</style>
      </div>

      <ProcessSteps />
    </section>
  )
}
