// Exact source identities from the owner-supplied concert-manifest.json.
// Public R2 links; originals are never bundled into Git.
export const R2_BASE_URL = "https://pub-34d142b2772a4ad5b65e811325f580fd.r2.dev";
export type SourceClip = {id:string; key:string; filename:string};
export const sources: SourceClip[] = [
  {
    "id": "concert-01",
    "key": "uploads/20261019_131612_photo_1792408171_1_0A0D82.mov",
    "filename": "20261019_131612_photo_1792408171_1_0A0D82.mov"
  },
  {
    "id": "concert-02",
    "key": "uploads/20261021_101517_photo_1792570283_0_50D52B.mov",
    "filename": "20261021_101517_photo_1792570283_0_50D52B.mov"
  },
  {
    "id": "concert-03",
    "key": "uploads/20261021_101732_photo_1792570285_1_505CEE.mov",
    "filename": "20261021_101732_photo_1792570285_1_505CEE.mov"
  },
  {
    "id": "concert-04",
    "key": "uploads/20261021_101757_photo_1792570296_2_007051.mov",
    "filename": "20261021_101757_photo_1792570296_2_007051.mov"
  },
  {
    "id": "concert-05",
    "key": "uploads/20261021_102457_photo_1792570335_3_3B177F.mov",
    "filename": "20261021_102457_photo_1792570335_3_3B177F.mov"
  },
  {
    "id": "concert-06",
    "key": "uploads/20261021_104830_photo_1792570428_4_794EEF.mov",
    "filename": "20261021_104830_photo_1792570428_4_794EEF.mov"
  },
  {
    "id": "concert-07",
    "key": "uploads/20261021_113458_photo_1792570428_5_BD211D.mp4",
    "filename": "20261021_113458_photo_1792570428_5_BD211D.mp4"
  },
  {
    "id": "concert-08",
    "key": "uploads/20261021_115410_photo_1792570470_7_FC8EA8.mov",
    "filename": "20261021_115410_photo_1792570470_7_FC8EA8.mov"
  },
  {
    "id": "concert-09",
    "key": "uploads/20261021_121602_photo_1792570511_8_BFCCB2.mov",
    "filename": "20261021_121602_photo_1792570511_8_BFCCB2.mov"
  },
  {
    "id": "concert-10",
    "key": "uploads/20261021_123024_photo_1792570511_9_EE62F8.mp4",
    "filename": "20261021_123024_photo_1792570511_9_EE62F8.mp4"
  },
  {
    "id": "concert-11",
    "key": "uploads/20261021_123500_photo_1792570511_10_E1B6E6.mp4",
    "filename": "20261021_123500_photo_1792570511_10_E1B6E6.mp4"
  },
  {
    "id": "concert-12",
    "key": "uploads/20261021_123933_photo_1792570511_11_158A75.mp4",
    "filename": "20261021_123933_photo_1792570511_11_158A75.mp4"
  },
  {
    "id": "concert-13",
    "key": "uploads/20261021_124554_photo_1792570511_12_37C3C7.mp4",
    "filename": "20261021_124554_photo_1792570511_12_37C3C7.mp4"
  },
  {
    "id": "concert-14",
    "key": "uploads/20261021_125005_photo_1792570512_13_B9D2A3.mp4",
    "filename": "20261021_125005_photo_1792570512_13_B9D2A3.mp4"
  },
  {
    "id": "concert-15",
    "key": "uploads/20261021_125031_photo_1792570512_14_560720.mp4",
    "filename": "20261021_125031_photo_1792570512_14_560720.mp4"
  },
  {
    "id": "concert-16",
    "key": "uploads/20261021_125146_photo_1792570512_15_162050.mp4",
    "filename": "20261021_125146_photo_1792570512_15_162050.mp4"
  },
  {
    "id": "concert-17",
    "key": "uploads/20261021_125355_photo_1792570512_16_2B0B52.mp4",
    "filename": "20261021_125355_photo_1792570512_16_2B0B52.mp4"
  },
  {
    "id": "concert-18",
    "key": "uploads/20261021_125600_photo_1792570512_17_895CF1.mp4",
    "filename": "20261021_125600_photo_1792570512_17_895CF1.mp4"
  },
  {
    "id": "concert-19",
    "key": "uploads/20261021_125737_photo_1792570512_18_DCE691.mp4",
    "filename": "20261021_125737_photo_1792570512_18_DCE691.mp4"
  },
  {
    "id": "concert-20",
    "key": "uploads/20261021_125806_photo_1792570512_19_5ED44A.mov",
    "filename": "20261021_125806_photo_1792570512_19_5ED44A.mov"
  },
  {
    "id": "concert-21",
    "key": "uploads/20261021_125814_photo_1792570512_20_4A7439.mov",
    "filename": "20261021_125814_photo_1792570512_20_4A7439.mov"
  },
  {
    "id": "concert-22",
    "key": "uploads/20261021_125921_photo_1792570512_21_1558AF.mov",
    "filename": "20261021_125921_photo_1792570512_21_1558AF.mov"
  },
  {
    "id": "concert-23",
    "key": "uploads/20261021_125922_photo_1792570512_22_A54A96.mp4",
    "filename": "20261021_125922_photo_1792570512_22_A54A96.mp4"
  },
  {
    "id": "concert-24",
    "key": "uploads/20261021_130237_photo_1792570512_23_606E74.mp4",
    "filename": "20261021_130237_photo_1792570512_23_606E74.mp4"
  },
  {
    "id": "concert-25",
    "key": "uploads/20261021_130934_photo_1792580968_0_D84E14.mp4",
    "filename": "20261021_130934_photo_1792580968_0_D84E14.mp4"
  }
];
export const connectionTestSource = sources.find(s => s.id === "concert-02")!;
export function mediaUrl(key:string):string {return R2_BASE_URL+"/"+key.split("/").map(encodeURIComponent).join("/");}
