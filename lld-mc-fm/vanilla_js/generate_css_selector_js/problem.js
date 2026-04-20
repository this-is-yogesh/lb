/**
 * 
 * Given a root node and target node, generate a CSS selector from the root to the target. Provide an exact selection.
 * 
 * Input:
<div id="root">
  <article>Prepare for interview</article>
  <section>
    on
    <p>
      <span>
        Learnersbucket 
        <button>click me!</button>
        <button id="target">click me!</button>
      </span>
    </p>
  </section>
</div>

Output:
"div[id='root'] > section:nth-child(2) > p:nth-child(1) > span:nth-child(1) > button:nth-child(2)"
 */

