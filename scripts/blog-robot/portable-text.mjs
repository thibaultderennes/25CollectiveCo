// Minimal Markdown → Sanity Portable Text for the blog's `post.body` schema:
// styles normal/h2/h3/blockquote, bullet and numbered lists, marks strong/em/code, link annotations.
import { randomUUID } from "node:crypto";

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

/** Inline Markdown → {children, markDefs}. Handles **bold**, *em* / _em_, `code`, [text](url), nesting of bold/em in links. */
export function inline(text) {
  const children = [], markDefs = [];
  const re = /(\*\*([^*]+)\*\*|__([^_]+)__|\*([^*\s][^*]*)\*|_([^_\s][^_]*)_|`([^`]+)`|\[([^\]]+)\]\((https?:[^)\s]+)\))/g;
  const push = (t, marks = []) => { if (t) children.push({ _type: "span", _key: key(), text: t, marks }); };
  let last = 0, m;
  while ((m = re.exec(text))) {
    push(text.slice(last, m.index));
    if (m[2] || m[3]) push(m[2] || m[3], ["strong"]);
    else if (m[4] || m[5]) push(m[4] || m[5], ["em"]);
    else if (m[6]) push(m[6], ["code"]);
    else if (m[7]) {
      const k = key();
      markDefs.push({ _type: "link", _key: k, href: m[8] });
      const inner = inline(m[7]);
      for (const c of inner.children) children.push({ ...c, marks: [...c.marks, k] });
    }
    last = re.lastIndex;
  }
  push(text.slice(last));
  if (!children.length) push(" ");
  return { children, markDefs };
}

const block = (text, style = "normal", list) => ({ _type: "block", _key: key(), style, ...inline(text), ...(list ? { listItem: list, level: 1 } : {}) });

export function mdToPortableText(md) {
  const out = [];
  let para = [];
  const flush = () => { if (para.length) { out.push(block(para.join(" "))); para = []; } };
  for (const raw of String(md).replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trimEnd();
    let m;
    if (!line.trim()) { flush(); continue; }
    if ((m = line.match(/^#{1,2}\s+(.*)$/))) { flush(); out.push(block(m[1], "h2")); continue; }
    if ((m = line.match(/^#{3,6}\s+(.*)$/))) { flush(); out.push(block(m[1], "h3")); continue; }
    if ((m = line.match(/^>\s?(.*)$/))) { flush(); out.push(block(m[1], "blockquote")); continue; }
    if ((m = line.match(/^\s*[-*+]\s+(.*)$/))) { flush(); out.push(block(m[1], "normal", "bullet")); continue; }
    if ((m = line.match(/^\s*\d+[.)]\s+(.*)$/))) { flush(); out.push(block(m[1], "normal", "number")); continue; }
    if (/^(-{3,}|\*{3,})$/.test(line.trim())) { flush(); continue; }
    para.push(line.trim());
  }
  flush();
  // consecutive blockquote lines → one quote
  return out.reduce((acc, b) => {
    const prev = acc[acc.length - 1];
    if (prev && prev.style === "blockquote" && b.style === "blockquote" && !b.listItem) {
      prev.children.push({ _type: "span", _key: key(), text: " ", marks: [] }, ...b.children); prev.markDefs.push(...b.markDefs);
    } else acc.push(b);
    return acc;
  }, []);
}
