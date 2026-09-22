"use strict";
const resultados = globalThis.executarTestesFila();
const aprovados = resultados.filter((r) => r.passou).length;
document.getElementById("resumo").textContent = `${aprovados} aprovados · ${resultados.length-aprovados} falhas · ${resultados.length} testes`;
for (const resultado of resultados) {
  const item = document.createElement("li");
  item.className = resultado.passou ? "aprovado" : "falha";
  item.textContent = `${resultado.passou ? "PASSOU" : "FALHOU"} — ${resultado.nome}`;
  if (!resultado.passou) { const detalhe=document.createElement("small"); detalhe.textContent=resultado.erro;item.append(detalhe); }
  document.getElementById("resultados").append(item);
}
globalThis.resultadoLab02 = {aprovados, falhas:resultados.length-aprovados, total:resultados.length};
