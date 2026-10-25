import s from "./Statement.module.css";

export function Statement() {
  return (
    <section className={s.state}>
      <div className="wrap">
        <p>
          <span>Most of what fills our screens</span>
          <span>is made to keep us busy.</span>
          <span><em>Devotion is the opposite.</em></span>
          <span>It asks us to slow down,</span>
          <span>return, and remember.</span>
        </p>
      </div>
    </section>
  );
}
