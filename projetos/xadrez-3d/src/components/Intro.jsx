export default function Intro() {
  return (
    <section className="intro">
      {/* CANVAS FIXO */}
      <canvas id="webgl" />

      {/* TEXTO GIGANTE FIXO */}
      <div className="chapter-fixed">XADREZ</div>

      {/* CONTEÚDO EDITORIAL */}
      <div className="content">
        <article className="chapter-block" data-focus="board">
          <span className="chapter">Capítulo I</span>
          <h1>O Xadrez</h1>
          <p className="subtitle">
            Um jogo milenar onde cada decisão ecoa no tempo.
          </p>
          <p className="atmosphere">Silêncio · Estratégia · Paciência</p>

          <div className="essence">
            <span className="micro-title">Essência</span>
            <p>
              Nenhuma peça se move sem propósito.
              <br />
              Nenhuma vitória nasce do acaso.
            </p>
          </div>
        </article>

        <article className="chapter-block" data-focus="pawn">
          <span className="chapter">Capítulo II</span>
          <h2>O Peão</h2>
          <p className="subtitle">A peça mais humilde do tabuleiro.</p>
          <p>
            Avança um passo por vez, limitado em alcance, mas ilimitado em
            significado.
          </p>

          <div className="essence">
            <span className="micro-title">Potencial</span>
            <p>
              O peão representa o início.
              <br />
              A persistência silenciosa.
              <br />A ideia de que até o menor movimento pode redefinir toda a
              partida.
            </p>
          </div>
        </article>

        <article className="chapter-block" data-focus="queen">
          <span className="chapter">Capítulo III</span>
          <h2>A Dama</h2>
          <p className="subtitle">A peça mais poderosa do tabuleiro.</p>
          <p>
            Livre para cruzar linhas, diagonais e espaços, a dama concentra
            força, velocidade e domínio.
          </p>

          <div className="essence">
            <span className="micro-title">Autoridade</span>
            <p>
              Onde a dama pisa, o jogo se curva.
              <br />
              Ela não espera oportunidades.
              <br />
              Ela as cria.
            </p>
          </div>
        </article>

        <article className="chapter-block" data-focus="rook">
          <span className="chapter">Capítulo IV</span>
          <h2>A Torre</h2>
          <p className="subtitle">Estrutura, força e estabilidade.</p>
          <p>
            Movendo-se em linhas retas, a torre domina colunas e fileiras com
            presença imponente.
          </p>

          <div className="essence">
            <span className="micro-title">Domínio</span>
            <p>
              A torre é o pilar do tabuleiro.
              <br />
              Não improvisa.
              <br />
              Avança com convicção.
            </p>
          </div>
        </article>

        <article className="chapter-block" data-focus="bishop">
          <span className="chapter">Capítulo V</span>
          <h2>O Bispo</h2>
          <p className="subtitle">Precisão em movimento.</p>
          <p>
            Sempre em diagonal, o bispo enxerga caminhos invisíveis para quem
            olha apenas à frente.
          </p>

          <div className="essence">
            <span className="micro-title">Visão</span>
            <p>
              O bispo não confronta.
              <br />
              Ele antecipa.
              <br />
              Atua onde poucos percebem.
            </p>
          </div>
        </article>

        <article className="chapter-block" data-focus="knight">
          <span className="chapter">Capítulo VI</span>
          <h2>O Cavalo</h2>
          <p className="subtitle">O imprevisível.</p>
          <p>
            Saltando sobre peças, o cavalo quebra padrões e desafia a lógica
            tradicional.
          </p>

          <div className="essence">
            <span className="micro-title">Ruptura</span>
            <p>
              Onde outros veem limites,
              <br />
              o cavalo vê atalhos.
              <br />
              Ele é caos controlado.
            </p>
          </div>
        </article>

        <article className="chapter-block" data-focus="king">
          <span className="chapter">Capítulo VII</span>
          <h2>O Rei</h2>
          <p className="subtitle">O centro de tudo.</p>
          <p>Lento, limitado em alcance, mas absolutamente essencial.</p>

          <div className="essence">
            <span className="micro-title">Existência</span>
            <p>
              O rei não precisa dominar o tabuleiro.
              <br />
              Basta permanecer de pé.
              <br />
              Tudo gira ao seu redor.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
