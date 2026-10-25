import { CircleJoin } from "./CircleJoin";

export function Circle() {
  return (
    <section className="sec" id="circle">
      <CircleJoin
        heading={
          <div className="rv" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span className="lab">Early access</span>
            <h2 className="h2">Join the <em>first circle.</em></h2>
            <p className="lede">We&apos;re building now, quietly. Leave your email and you&apos;ll be among the first to try it.</p>
          </div>
        }
      />
    </section>
  );
}
