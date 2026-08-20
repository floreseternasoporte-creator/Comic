import test from "node:test";
import assert from "node:assert/strict";
import { getCropBox, movePageItem, nextCropMode, normalizeRotation } from "../page-editor.mjs";

test("normaliza la rotación de páginas y alterna los modos de recorte", () => {
  assert.equal(normalizeRotation(-90), 270);
  assert.equal(normalizeRotation(450), 90);
  assert.equal(nextCropMode("original"), "portrait");
  assert.equal(nextCropMode("portrait"), "square");
  assert.equal(nextCropMode("square"), "original");
});

test("reordena páginas sin modificar la lista original", () => {
  const pages = [{ id: 1 }, { id: 2 }, { id: 3 }];
  assert.deepEqual(movePageItem(pages, 1, -1), [{ id: 2 }, { id: 1 }, { id: 3 }]);
  assert.deepEqual(pages, [{ id: 1 }, { id: 2 }, { id: 3 }]);
});

test("calcula recortes centrales para formato vertical y cuadrado", () => {
  assert.deepEqual(getCropBox(1200, 1000, "square"), { x: 100, y: 0, width: 1000, height: 1000 });
  assert.deepEqual(getCropBox(1200, 1000, "portrait"), { x: 266.6666666666667, y: 0, width: 666.6666666666666, height: 1000 });
});
