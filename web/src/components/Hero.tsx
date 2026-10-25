import { GreetingRotator } from "./GreetingRotator";
import { HeroLight } from "./HeroLight";
import { Offscreen } from "./Offscreen";
import { TypedReflection } from "./TypedReflection";
import s from "./Hero.module.css";

export function Hero() {
  return (
    <Offscreen as="section" className={s.hero} id="dawn">
      <HeroLight className={s.orb} />
      <div className={`wrap ${s.hgrid}`}>
        <div className={s.hcopy}>
          <span className={`lab ${s.kicker}`}>A new consumer AI company · Hyderabad</span>
          <h1 className={s.h1}>
            <span className={s.w}>A</span> <span className={s.w}>little</span> <span className={s.w}><em>light,</em></span>
            <br />
            <span className={s.w}>every</span> <span className={s.w}>day.</span>
          </h1>
          <p className={`lede ${s.lede}`}>We&apos;re building consumer apps at the intersection of AI, content and devotion. For the world.</p>
          <GreetingRotator />
          <div className={s.ctas}>
            <a className="btn btn-glow" href="#circle">Join the first circle</a>
            <a className="btn btn-soft" href="#moment">See a morning</a>
          </div>
        </div>
        <div className={`card ${s.today}`}>
          <TypedReflection />
          <span className={s.ill}>Illustration · sample reflection written for this page</span>
        </div>
      </div>
    </Offscreen>
  );
}
