import { MomentsTabs } from "./MomentsTabs";

export function Moments() {
  return (
    <section className="sec" id="moment">
      <div className="wrap">
        <div className="shead rv">
          <span className="lab">A moment, every morning</span>
          <h2 className="h2">Seven mornings, <em>seven small lights.</em></h2>
          <p className="lede">Content you return to, not content you scroll past. Pick a day to see the kind of moment we mean.</p>
        </div>
        <MomentsTabs />
      </div>
    </section>
  );
}
