const brands = [
    { name: "BMW", img: "img/BMW.png" },
    { name: "Ducati", img: "img/Ducati.png" }, 
    { name: "Honda", img:"img/Honda.png" }, 
    { name: "Suzuki", img:"img/Suzuki.png" },
    { name: "Kawasaki", img:"img/Kawasaki.png" }
  ];

const category = "Motor Bikes"

const attributes = ["Aventura","Liberdade","Impulsividade","Descoberta","Escapar","Dinâmico","Ousadia","Busca por fortes emoções","Orgulho","Perfeição","Sofisticação","Status","Poderoso","Forte","exclusividade","superior","Controle","Eficiência","Precisão","Simplicidade","Prático","Expertise","Funcional","Valor","Segurança","Proximidade","Convivência","Paz de espírito","Se sentir em casa","Conforto","Pertencimento","Confiável","Devoção","Confiança","Alegria","Me mimar","Despreocupação","Prazer","Alívio","Me dar o luxo","Relaxamento","Felicidade","Satisfação","Entusiasmo","Inspiração","Diversão","Expressão","Exploração","Curiosidade","Trend","Criatividade","Velocidade","Surpresa","Esportes","Lançamentos","Novelas","Reality Shows","Programação ao vivo","Família","Me identifico"];

const pretest_attributes = [
  "Quente", 
  "Frio", 
  "Perigoso",
  "Refrescante", 
  "Fofo",
  "Macio"
];


const pretest_images = [
  {name: "Cat", img: "pretest_img/pretest_cat.png", correct: ["Fofo", "Macio"]},
  {name: "Fire", img:"pretest_img/pretest_fire.png", correct:["Perigoso", "Quente"]}, 
  {name: "Icecube", img: "pretest_img/pretest_icecube.png", correct:["Frio", "Refrescante"]}
]

const pretest_attributes_multiple = ["Quente", "Frio", "Perigoso", "Refrescante", "Fofo", "Macio", "Viagem", "Empolgação", "Preciso", "Tempo", "Profundo", "Molhado"]

const pretest_images_multiple = [
  {name: "Cat", img: "pretest_img/pretest_cat.png", correct: ["Fofo", "Macio"]},
  {name: "Fire", img:"pretest_img/pretest_fire.png", correct:["Perigoso", "Quente"]}, 
  {name: "Icecube", img: "pretest_img/pretest_icecube.png", correct:["Frio", "Refrescante"]}, 
  {name: "Driving", img: "pretest_img/pretest_driving.png", correct:["Viagem", "Empolgação"]}, 
  {name: "Ocean", img: "pretest_img/pretest_ocean.png", correct:["Profundo", "Molhado"]},
  {name: "Clock", img: "pretest_img/pretest_clock.png", correct:["Preciso", "Tempo"]}
]


const survey_name = "Motor Bikes"