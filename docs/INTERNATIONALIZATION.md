# Internacionalização e evolução funcional do portfólio

## Escopo e preservação visual

Alterações aplicadas em `C:\Users\Mateus\Documents\GitHub\Portfolio`.
Foram preservados a paleta, as fontes locais, os tamanhos e a hierarquia dos
títulos, as seções, os cards, os fundos, a composição do hero e suas animações.
A alteração visual necessária é o seletor PT/EN no cabeçalho existente, com áreas
de toque e ajustes de espaço para os dois idiomas. O menu móvel continua nativo,
e o cabeçalho continua saindo da tela ao rolar.

Os textos agora apresentam com clareza o foco em front-end, os serviços coerentes
com o portfólio e a NocturnShop como produto SaaS autoral. A região de contato
existente oferece e-mail direto com assunto traduzido e LinkedIn. Nenhum formulário,
cliente, receita, depoimento, certificação ou resultado novo foi inventado.

## Implementação dos idiomas

- Dois dicionários centrais: `locales/pt-BR.json` e `locales/en.json`, com 322 chaves cada.
- Os 45 projetos têm título e descrição nos dois idiomas; as URLs originais foram mantidas.
- Categorias, tags descritivas, filtros, paginação, estados vazios, textos alternativos,
  rótulos de acessibilidade, contatos e metadados são traduzidos.
- Nomes próprios, marcas, instituições e tecnologias mantêm seus nomes. O diploma
  continua sendo o documento autêntico em português, com a cópia de exibição já existente.
- `js/locale-bootstrap.js` resolve a entrada padrão antes de o corpo ser exibido.
- `js/i18n.js` troca o conteúdo, os atributos e o endereço com a History API; carrega
  o outro dicionário apenas quando necessário e o reutiliza da memória.
- O dicionário inicial acompanha o HTML do idioma solicitado. Não há hidratação,
  dependência de framework nem uma etapa inicial mostrando o idioma errado.
- Pedidos de troca simultâneos respeitam a última escolha. Falhas de rede ou traduções
  incompletas mantêm o idioma que já está funcionando e mostram uma mensagem traduzida.
- `html[lang]`, o seletor ativo, os links de seção, o e-mail e os metadados acompanham a escolha.

## Brasileiros e visitantes internacionais

Na entrada `/Portfolio/`, a prioridade é:

1. Escolha manual salva em `localStorage`, sob a chave `portfolio.language`.
2. Idioma principal do navegador: `pt`, `pt-BR` e outras variantes de português usam PT-BR.
3. Inglês para todos os demais idiomas, inclusive idiomas não suportados.

Links explícitos `/Portfolio/pt/` e `/Portfolio/en/` mantêm seu idioma, mesmo se
uma escolha diferente estiver salva. Isso permite compartilhar uma versão específica.
Campanhas e seções, como `?utm_source=community#projetos`, são preservadas.
Se o armazenamento estiver bloqueado, a troca funciona na visita atual, sem persistência garantida.

Essa identificação adapta o idioma preferido; não determina se alguém é brasileiro
ou estrangeiro. Um brasileiro com navegador em inglês pode receber inglês e trocar
para PT. Não há consulta de IP, GPS ou serviço externo de localização.

## Onde editar e gerar as páginas

Edite os JSONs de tradução mantendo as mesmas chaves e os mesmos parâmetros,
por exemplo `{title}`, `{start}`, `{end}`, `{total}` e `{page}`. Os textos foram
separados da apresentação e dos metadados compartilhados de cada projeto.

Para mudar links ou tecnologias, edite `data/projects.json`. Para alterar a estrutura,
edite `templates/index.html`. As páginas não são mantidas manualmente em duplicidade:
um único gerador produz os três HTMLs estáticos a partir do mesmo template.

```powershell
npm run build
npm test
npm run dev
```

O build usa apenas a biblioteca padrão do Python. Não é necessário instalar pacotes npm.
As miniaturas mantêm o processo anterior `python tools/optimize-images.py`, que requer Pillow.

## SEO internacional

- URLs estáticas com refresh direto: `/Portfolio/pt/` e `/Portfolio/en/`.
- Título, descrição, Open Graph e Twitter Cards específicos por idioma.
- Canonical de cada versão e alternates `pt-BR`, `en` e `x-default` recíprocos.
- `sitemap.xml` com as duas versões e a entrada padrão.
- `robots.txt` gerado e diretivas `index,follow` nos HTMLs públicos.
- Dados estruturados `Person`, `WebSite`, `WebPage`, `ItemList` e `WebApplication`
  com informações verificáveis, incluindo a NocturnShop e os 45 projetos.
- Imagem de compartilhamento PNG de 1200 × 630 em `assets/social/portfolio.png`,
  usando a identidade visual existente; seu arquivo de preparação não é indexável.
- Títulos, descrições e links dos 45 projetos estão presentes no HTML inicial;
  a interação continua usando paginação responsiva de 6 ou 12 itens.
- Base relativa de assets e links preparada para o caminho `/Portfolio/`.

Limite de hospedagem: mecanismos de busca consultam o `robots.txt` na raiz do domínio,
`https://nocturnnn.github.io/robots.txt`. O arquivo deste repositório estará em
`/Portfolio/robots.txt`; ele não substitui o arquivo da raiz do domínio. Canonicals,
hreflang, sitemap e diretivas meta funcionam sem essa alteração em outro repositório.
A descoberta do sitemap pode ser complementada no Search Console após publicar.

Os projetos externos e suas aplicações próprias não foram traduzidos nem receberam
mudanças de SEO; o trabalho de tradução cobre sua apresentação neste portfólio.
Não há garantia de posicionamento em busca ou de indexação de páginas de terceiros.

## Acessibilidade e performance

- Seletor com navegação por teclado, indicação do idioma atual, nomes acessíveis
  traduzidos e áreas de toque móveis de pelo menos 44 px.
- Foram mantidos o link de pular para o conteúdo, o retorno ao topo, os estados
  de foco, o menu nativo e o diálogo acessível do diploma.
- Nomes acessíveis específicos para os links de cada projeto.
- Pesquisa ignora acentos e mantém resultados entre idiomas já carregados.
- Busca, filtros e página atual são preservados ao trocar o idioma.
- Imagens responsivas, fonte local, carregamento adiado e suspensão das animações
  fora da tela foram preservados. Nenhum efeito foi removido para elevar pontuações.
- A preferência por movimento reduzido e o fluxo normal em telas baixas permanecem.
- Não há pontuações Lighthouse ou Core Web Vitals inventadas: métricas de produção
  devem ser medidas depois de publicar e com dados reais de carregamento/uso.

## Validação executada

- Build completo de `/`, `/pt/` e `/en/`.
- 31 testes automatizados: 21 de roteamento/troca de idioma e 10 de build/conteúdo/SEO.
- Cobertura de detecção PT/EN e idiomas não suportados, persistência, URLs explícitas,
  prefixo GitHub Pages, armazenamento bloqueado, parâmetros e fragmentos preservados.
- Cobertura de cache, troca sem reload, prioridade da última escolha, erro de rede,
  rejeição de traduções incompletas, paridade de chaves e parâmetros.
- Verificação dos IDs, links internos, assets, títulos, canonicals, hreflang, dados
  estruturados e presença dos 45 projetos antes do JavaScript.
- Verificação dos 45 links originais: os externos responderam HTTP 200; os oito
  caminhos locais existem e suas versões publicadas responderam HTTP 200.
- NocturnShop, GitHub e o portfólio público atual responderam HTTP 200.
- LinkedIn respondeu HTTP 999: a validação automática foi inconclusiva e o link foi mantido.
- Evidência dos links em `docs/link-validation.json`, reproduzível por
  `python tools/check-links.py`.
- Conferência no navegador em português e inglês, desktop e mobile, incluindo
  troca com filtro ativo e segunda página, links localizados e preferência salva.
- Capturas antes/depois foram mantidas como evidência local de comparação visual.

## Publicação e pendências

O repositório público atual foi consultado, mas esta versão bilíngue ainda precisa
ser enviada pelo fluxo habitual de commit e push do usuário. Não foi feito push
automático, nem alterada a configuração de hospedagem.

Depois de `npm run build` e `npm test`, inclua no commit os arquivos-fonte e os
HTMLs gerados, além dos assets e `.nojekyll`. Publique na mesma branch/pasta já usada
pelo GitHub Pages. Depois confira os dois endereços, a troca de idioma, a imagem de
compartilhamento e o sitemap no domínio público.

Referência da plataforma: [documentação oficial do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).
