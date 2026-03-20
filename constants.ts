
export const APP_THEME = {
  primary: "emerald-600",
  secondary: "lime-500",
  accent: "amber-500",
  background: "slate-50"
};

export interface DiseaseDetail {
  name: string;
  desc: string;
  prevention: string;
}

export interface CropDataset {
  crop: string;
  diseases: DiseaseDetail[];
}

export const PLANT_VILLAGE_DATA: CropDataset[] = [
  {
    crop: "Apple",
    diseases: [
      { name: "Scab", desc: "Caused by Venturia inaequalis. Appears as olive-green spots on leaves and fruit.", prevention: "Remove fallen leaves, apply fungicides during bud break." },
      { name: "Black Rot", desc: "Fungal infection causing purple-bordered spots on leaves (frogeye leaf spot).", prevention: "Prune out dead wood, remove mummified fruit." },
      { name: "Cedar Apple Rust", desc: "Bright orange-yellow spots on leaves caused by Gymnosporangium juniperi-virginianae.", prevention: "Remove nearby juniper trees, use resistant varieties." },
      { name: "Healthy", desc: "Leaves are vibrant green with no signs of fungal or bacterial infection.", prevention: "Regular monitoring and balanced fertilization." }
    ]
  },
  {
    crop: "Cherry",
    diseases: [
      { name: "Powdery Mildew", desc: "White powdery fungal growth on leaves and shoots.", prevention: "Improve air circulation, apply sulfur or potassium bicarbonate." },
      { name: "Healthy", desc: "Clean foliage with no visible mildew or spotting.", prevention: "Pruning for airflow." }
    ]
  },
  {
    crop: "Corn",
    diseases: [
      { name: "Cercospora Leaf Spot", desc: "Also known as Gray Leaf Spot. Small, rectangular lesions between leaf veins.", prevention: "Crop rotation, tillage to bury infected debris." },
      { name: "Common Rust", desc: "Raised, reddish-brown pustules on both leaf surfaces.", prevention: "Plant resistant hybrids, early planting." },
      { name: "Northern Leaf Blight", desc: "Large, cigar-shaped lesions that turn gray-green or tan.", prevention: "Resistant hybrids, crop rotation with non-host crops." },
      { name: "Healthy", desc: "Long, green leaves without streaks or pustules.", prevention: "Proper nitrogen management." }
    ]
  },
  {
    crop: "Grape",
    diseases: [
      { name: "Black Rot", desc: "Circular reddish-brown spots on leaves and shriveled fruit.", prevention: "Sanitation, removal of old clusters, fungicides." },
      { name: "Esca (Black Measles)", desc: "Tiger-stripe leaf discoloration and small spots on fruit skin.", prevention: "Pruning wound protection, avoiding over-irrigation." },
      { name: "Leaf Blight", desc: "Irregular reddish-brown lesions that eventually cause leaf drop.", prevention: "Improved drainage and weed control." },
      { name: "Healthy", desc: "Lush green leaves with clear veins and no spotting.", prevention: "Proper trellis management." }
    ]
  },
  {
    crop: "Orange",
    diseases: [
      { name: "Haunglongbing (Citrus Greening)", desc: "Mottled yellow leaves and bitter, misshapen fruit.", prevention: "Control Asian citrus psyllids, remove infected trees." }
    ]
  },
  {
    crop: "Peach",
    diseases: [
      { name: "Bacterial Spot", desc: "Small water-soaked spots that turn purple-black and fall out.", prevention: "Plant resistant varieties, avoid high-nitrogen fertilizers." },
      { name: "Healthy", desc: "Smooth, vibrant green leaves.", prevention: "Balanced soil nutrients." }
    ]
  },
  {
    crop: "Pepper",
    diseases: [
      { name: "Bacterial Spot", desc: "Small, dark, raised spots on leaf undersides.", prevention: "Use pathogen-free seeds, avoid overhead watering." },
      { name: "Healthy", desc: "Uniformly green foliage without spots or wilting.", prevention: "Consistent watering schedules." }
    ]
  },
  {
    crop: "Potato",
    diseases: [
      { name: "Early Blight", desc: "Target-shaped dark spots on older leaves first.", prevention: "Maintain plant vigor, avoid overhead irrigation." },
      { name: "Late Blight", desc: "Dark, water-soaked patches that can destroy crops in days.", prevention: "Use certified seed tubers, monitor for cool/moist weather." },
      { name: "Healthy", desc: "Leaves are robust and free of rot or lesions.", prevention: "Hill potatoes to protect tubers." }
    ]
  },
  {
    crop: "Strawberry",
    diseases: [
      { name: "Leaf Scorch", desc: "Small purplish spots that enlarge into large reddish-brown patches.", prevention: "Avoid overcrowding, renovate beds annually." },
      { name: "Healthy", desc: "Bright green leaves with no drying at the edges.", prevention: "Mulching with straw." }
    ]
  },
  {
    crop: "Tomato",
    diseases: [
      { name: "Bacterial Spot", desc: "Small, black, greasy spots on leaves and fruit stems.", prevention: "Copper-based sprays, rotate crops every 3 years." },
      { name: "Early Blight", desc: "Concentric rings on leaves starting from the bottom of the plant.", prevention: "Mulching, pruning lower leaves to prevent soil splash." },
      { name: "Late Blight", desc: "Large, dark gray-green spots with white fungal growth on undersides.", prevention: "Destroy infected plants immediately, use resistant varieties." },
      { name: "Leaf Mold", desc: "Yellow spots on top, olive-green velvet-like growth underneath.", prevention: "Improve greenhouse ventilation." },
      { name: "Septoria Leaf Spot", desc: "Circular spots with gray centers and dark borders.", prevention: "Remove weeds like nightshade, keep foliage dry." },
      { name: "Spider Mites", desc: "Yellow stippling and fine webbing on leaves.", prevention: "Increase humidity, use insecticidal soap." },
      { name: "Target Spot", desc: "Brown lesions with a 'target' appearance of concentric rings.", prevention: "Airflow management, preventative fungicides." },
      { name: "Yellow Leaf Curl Virus", desc: "Upward curling and yellowing of leaf margins.", prevention: "Control whiteflies, use silver-colored mulch." },
      { name: "Mosaic Virus", desc: "Mottled light and dark green patterns on leaves.", prevention: "Avoid handling plants after using tobacco, use resistant varieties." },
      { name: "Healthy", desc: "Dense, dark green foliage without spots or curling.", prevention: "Good soil health and pest monitoring." }
    ]
  }
];
