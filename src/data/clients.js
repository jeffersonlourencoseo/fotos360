/**
 * Para adicionar um novo cliente, basta replicar o padrão abaixo.
 * As fotos devem estar em /public/panoramas/[id]/ e as miniaturas
 * otimizadas em /public/panoramas/[id]/thumbs/ (mesmo nome, .webp e .jpg).
 */
export const clients = [
  {
    id: "maneros",
    name: "Manero's",
    category: "Restaurante",
    thumbnail: "/panoramas/maneros/thumbs/01",
    photos: [
      "/panoramas/maneros/01.jpg",
      "/panoramas/maneros/02.jpg",
      "/panoramas/maneros/03.jpg",
      "/panoramas/maneros/04.jpg",
      "/panoramas/maneros/05.jpg",
    ],
  },
  {
    id: "delicia-do-iraja",
    name: "Delícia do Irajá",
    category: "Restaurante",
    thumbnail: "/panoramas/delicia-do-iraja/thumbs/01",
    photos: [
      "/panoramas/delicia-do-iraja/01.jpg",
      "/panoramas/delicia-do-iraja/02.jpg",
      "/panoramas/delicia-do-iraja/03.jpg",
      "/panoramas/delicia-do-iraja/04.jpg",
    ],
  },
  {
    id: "los-hermanos",
    name: "Barbearia Los Hermanos",
    category: "Barbearia",
    thumbnail: "/panoramas/los-hermanos/thumbs/01",
    photos: [
      "/panoramas/los-hermanos/01.jpg",
      "/panoramas/los-hermanos/02.jpg",
      "/panoramas/los-hermanos/03.jpg",
      "/panoramas/los-hermanos/04.jpg",
    ],
  },
  {
    id: "barbearia-patrick-menezes",
    name: "Barbearia Patrick Menezes",
    category: "Barbearia",
    thumbnail: "/panoramas/barbearia-patrick-menezes/thumbs/01",
    photos: [
      "/panoramas/barbearia-patrick-menezes/01.jpg",
      "/panoramas/barbearia-patrick-menezes/02.jpg",
      "/panoramas/barbearia-patrick-menezes/03.jpg",
      "/panoramas/barbearia-patrick-menezes/04.jpg",
    ],
  },
];
