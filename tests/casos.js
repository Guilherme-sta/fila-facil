/* Contrato comum do Lab 02. Não editar para fazer uma solução passar. */
(() => {
  "use strict";
  const casos = [];
  const teste = (nome, executar) => casos.push({ nome, executar });
  function igual(real, esperado) {
    if (JSON.stringify(real) !== JSON.stringify(esperado)) {
      throw new Error(`Esperado ${JSON.stringify(esperado)}; recebido ${JSON.stringify(real)}`);
    }
  }
  const F = () => globalThis.FilaFacil;
  const novo = () => F().criarEstado();
  const emitir = (e, n) => { for (let i = 0; i < n; i++) F().emitirSenha(e); };

  teste("RF-01 · estado inicial completo", () => igual(novo(), {proximaSenha:1, aguardando:[], atual:null, totalChamadas:0}));
  teste("RF-07 · estados iniciais independentes", () => {const a=novo(),b=novo();a.aguardando.push(99);igual(b.aguardando,[]);});
  teste("RF-06 · ausência de senha", () => igual(F().formatarSenha(null),"—"));
  teste("RF-06 · senha com três dígitos", () => igual(F().formatarSenha(1),"N001"));
  teste("RF-06 · senha com dois algarismos", () => igual(F().formatarSenha(42),"N042"));
  teste("RF-06 · não truncar após 999", () => igual(F().formatarSenha(1000),"N1000"));
  teste("RF-02 · primeira emissão retorna 1", () => igual(F().emitirSenha(novo()),1));
  teste("RF-02 · emissão atualiza a fila", () => {const e=novo();emitir(e,3);igual(e.aguardando,[1,2,3]);});
  teste("RF-02 · emissão avança a numeração", () => {const e=novo();emitir(e,4);igual(e.proximaSenha,5);});
  teste("RF-02 · emitir preserva atendimento e contador", () => {const e=novo();e.atual=8;e.totalChamadas=8;F().emitirSenha(e);igual([e.atual,e.totalChamadas],[8,8]);});
  teste("RF-02 · numeração continua após chamada", () => {const e=novo();emitir(e,2);F().chamarProxima(e);igual(F().emitirSenha(e),3);});
  teste("RF-03 · chamada retorna a primeira senha", () => {const e=novo();emitir(e,3);igual(F().chamarProxima(e),1);});
  teste("RF-03 · remove somente a primeira da espera", () => {const e=novo();emitir(e,3);F().chamarProxima(e);igual(e.aguardando,[2,3]);});
  teste("RF-03 · atual acompanha a última chamada", () => {const e=novo();emitir(e,3);F().chamarProxima(e);F().chamarProxima(e);igual(e.atual,2);});
  teste("RF-03 · conta somente chamadas efetivas", () => {const e=novo();emitir(e,2);F().chamarProxima(e);F().chamarProxima(e);F().chamarProxima(e);igual(e.totalChamadas,2);});
  teste("RF-03 · chamar não avança proximaSenha", () => {const e=novo();emitir(e,2);F().chamarProxima(e);igual(e.proximaSenha,3);});
  teste("RF-04 · chamar fila inicialmente vazia retorna null", () => igual(F().chamarProxima(novo()),null));
  teste("RF-04 · fila vazia preserva todos os campos", () => {const e=novo();e.atual=7;e.totalChamadas=7;e.proximaSenha=8;const antes=JSON.stringify(e);igual(F().chamarProxima(e),null);igual(JSON.stringify(e),antes);});
  teste("RF-03 · FIFO com emissão entre chamadas", () => {const e=novo();emitir(e,3);const saidas=[F().chamarProxima(e)];emitir(e,2);for(let i=0;i<4;i++)saidas.push(F().chamarProxima(e));igual(saidas,[1,2,3,4,5]);});
  teste("RF-05 · reinício restaura o mesmo objeto", () => {const e=novo();e.proximaSenha=5;e.aguardando=[3,4];e.atual=2;e.totalChamadas=2;F().reiniciarFila(e);igual(e,novo());});
  teste("RF-05 · primeira emissão após reinício", () => {const e=novo();emitir(e,3);F().reiniciarFila(e);igual(F().emitirSenha(e),1);});
  teste("RF-05 · reiniciar duas vezes é válido", () => {const e=novo();F().reiniciarFila(e);F().reiniciarFila(e);igual(e,novo());});
  teste("RF-07 · operar uma fila não modifica outra", () => {const a=novo(),b=novo();emitir(a,3);emitir(b,1);F().chamarProxima(a);F().reiniciarFila(a);igual(b,{proximaSenha:2,aguardando:[1],atual:null,totalChamadas:0});});
  teste("RF-02/03 · mil emissões e chamadas sem duplicação", () => {const e=novo();emitir(e,1000);for(let n=1;n<=1000;n++)igual(F().chamarProxima(e),n);igual(e,{proximaSenha:1001,aguardando:[],atual:1000,totalChamadas:1000});});

  globalThis.executarTestesFila = () => casos.map(({nome, executar}) => {
    try { executar(); return {nome, passou:true}; }
    catch (erro) { return {nome, passou:false, erro:String(erro.message ?? erro)}; }
  });
})();
