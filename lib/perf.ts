import { performance } from "perf_hooks";

export type PerfSpan = {
  name: string;
  durationMs: number;
};

export class PerfTracker {
  private marks = new Map<string, number>();
  private spans: PerfSpan[] = [];
  private startTime = performance.now();

  start(name: string) {
    this.marks.set(name, performance.now());
  }

  end(name: string) {
    const start = this.marks.get(name);
    if (!start) return;

    const durationMs = performance.now() - start;
    this.spans.push({ name, durationMs });
    this.marks.delete(name);
  }

  summary() {
    return {
      totalMs: performance.now() - this.startTime,
      spans: this.spans,
    };
  }
}
