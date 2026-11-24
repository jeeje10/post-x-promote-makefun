// post-x-promote-make-your-own-bounty-01 entry (Node 22, standard library only).
// The entry is the X post itself: a quote of make.fun's make-your-own-bounty
// post, with a photo of its own, make.fun / @makefunai and the play code in
// its text. This program only hands the post's address to the grader: it
// copies POST.json from the repository root to /output/POST.json, where the
// gate reads it. The house reads the post's replies, reposts and quotes
// from X itself; nothing this program writes about the post is scored.
//
// Run outside the grader's container:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Guard: refuse to ship a POST.json that does not parse or does not name
// an X status URL, so a bad file fails loudly instead of entering invalid.
const post = JSON.parse(readFileSync(join(botDir, "POST.json"), "utf8"));
if (typeof post?.url !== "string" || !/^https:\/\/(x\.com|twitter\.com)\/[^/]+\/status\/\d+$/.test(post.url)) {
  throw new Error("POST.json does not name an X post URL");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(join(botDir, "POST.json"), join(outDir, "POST.json"));
