import { VennPicker } from "./VennPicker";
import s from "./Idea.module.css";

export function Idea() {
  return (
    <section className="sec" id="idea">
      <VennPicker
        heading={
          <>
            <span className="lab">Where we&apos;re building</span>
            <h2 className={`h2 ${s.h2}`}>AI <em>×</em> content <em>×</em> devotion.</h2>
          </>
        }
        quote={
          <div className={`card ${s.quote}`}>
            <p>
              “I have spent quite some time exploring consumer tech ideas around education, hope and devotion. Currently doubling down
              on the intersection of AI x content x devotion.”
            </p>
            <span className="lab">Aarihant Aaryan · Co-founder</span>
          </div>
        }
      />
    </section>
  );
}
