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
  {
    id: "academia-professor-silva-ribeiro",
    name: "Academia Professor Silva Ribeiro",
    category: "Academia",
    thumbnail: "/panoramas/academia-professor-silva-ribeiro/thumbs/01",
    photos: ["/panoramas/academia-professor-silva-ribeiro/01.jpg"],
  },
  {
    id: "clinica-dr-fernando-silva",
    name: "Clínica Dr. Fernando Silva",
    category: "Clínica Odontológica",
    thumbnail: "/panoramas/clinica-dr-fernando-silva/thumbs/01",
    photos: ["/panoramas/clinica-dr-fernando-silva/01.jpg"],
  },
  {
    id: "clinica-gastros",
    name: "Clínica Gastro's",
    category: "Clínica",
    thumbnail: "/panoramas/clinica-gastros/thumbs/01",
    photos: ["/panoramas/clinica-gastros/01.jpg"],
  },
  {
    id: "clinica-nivea-odonto",
    name: "Clínica Nívea Odonto",
    category: "Clínica Odontológica",
    thumbnail: "/panoramas/clinica-nivea-odonto/thumbs/01",
    photos: ["/panoramas/clinica-nivea-odonto/01.jpg"],
  },
  {
    id: "escola-tia-laura",
    name: "Escola Tia Laura",
    category: "Escola",
    thumbnail: "/panoramas/escola-tia-laura/thumbs/01",
    photos: ["/panoramas/escola-tia-laura/01.jpg"],
  },
];
