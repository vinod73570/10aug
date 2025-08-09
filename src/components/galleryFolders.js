import videoLinks from './videos.json'; // private videos
import photoLinks from './photos.json'; // new photos JSON from Cloudinary

const galleryFolders = [
  {
    name: "Romantic",
    type: "public",
    media: [
      ...photoLinks.map((url, index) => ({
        type: "image",
        src: url,
        alt: `Romantic Photo ${index + 1}`
      }))
    ]
  },
  {
    name: "Videos",
    type: "public",
    media: [
      {
        type: "video",
        src: "https://res.cloudinary.com/dr4ompqm4/video/upload/Bthg1519_osr7hb.mp4"
      },
      {
        type: "video",
        src: "https://res.cloudinary.com/dr4ompqm4/video/upload/Bthg1519_osr7hb.mp4"
      }
    ]
  },
  {
    name: "Private",
    type: "private",
    password: "foreverus2025",
    media: videoLinks.map(link => ({
      type: "video",
      src: link
    }))
  }
];

export default galleryFolders;
