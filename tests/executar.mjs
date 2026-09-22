// Opcional: mesma suíte do navegador, sem pacotes npm. Node 18 ou superior.
import "../src/fila.js";
import "./casos.js";
const resultados = globalThis.executarTestesFila();
for (const r of resultados) console.log(`${r.passou ? "PASSOU" : "FALHOU"} | ${r.nome}${r.erro ? ` | ${r.erro}` : ""}`);
const aprovados = resultados.filter((r) => r.passou).length;
console.log(`${aprovados} aprovados · ${resultados.length-aprovados} falhas · ${resultados.length} testes`);
process.exitCode = aprovados === resultados.length ? 0 : 1;
