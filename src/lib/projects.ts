// Gallery order: newest work first by date; undated projects count as oldest; ties keep `order`.
interface Dated {
  data: { date?: Date; order: number };
}

export function newestFirst(a: Dated, b: Dated): number {
  const da = a.data.date?.getTime() ?? -Infinity;
  const db = b.data.date?.getTime() ?? -Infinity;
  if (da !== db) return db - da;
  return a.data.order - b.data.order;
}
